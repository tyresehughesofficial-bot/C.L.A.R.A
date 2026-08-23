// CLARA AI backend — a thin, honest bridge between the CLARA app and the
// Anthropic API. It does exactly three things: serves the app, reports its
// health, and forwards one prompt shape to Claude with the model pinned and
// the API key kept server-side. All prompt building and response parsing
// lives in the app (PromptKit) so the same intelligence layer works against
// any transport.
//
// Run:  ANTHROPIC_API_KEY=sk-ant-...  node server/server.js
//       then open http://localhost:8787
// Credentials also resolve from an `ant auth login` profile automatically.

const http = require("http");
const fs = require("fs");
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");

const MODEL = process.env.CLARA_MODEL || "claude-opus-5";
const PORT = parseInt(process.env.PORT || "8787", 10);
const APP_ROOT = path.join(__dirname, "..");
const MAX_BODY = 1024 * 1024; // 1 MB
const MAX_PROMPT_CHARS = 400000;

const client = new Anthropic();

async function runClara(body) {
  const { system, user, task } = body || {};
  if (typeof system !== "string" || typeof user !== "string" || !system.trim() || !user.trim()) {
    return { status: 400, json: { ok: false, error: "bad_request", detail: "Fields 'system' and 'user' (non-empty strings) are required." } };
  }
  if (system.length + user.length > MAX_PROMPT_CHARS) {
    return { status: 413, json: { ok: false, error: "too_large", detail: "Prompt exceeds the size limit." } };
  }
  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      // Server-side refusal fallbacks, on by default: if the model's safety
      // layer declines, the API re-runs the request on a fallback model
      // inside the same call instead of returning nothing.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      // The stable CLARA persona/brand block is cacheable across calls;
      // volatile project state arrives in the user message.
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: user }],
    });
    if (response.stop_reason === "refusal") {
      const detail = (response.stop_details && response.stop_details.explanation) || "The model declined this request.";
      return { status: 200, json: { ok: false, error: "refusal", detail } };
    }
    const text = response.content.filter(b => b.type === "text").map(b => b.text).join("\n");
    return {
      status: 200,
      json: {
        ok: true,
        task: typeof task === "string" ? task : null,
        text,
        model: response.model,
        stop_reason: response.stop_reason,
        usage: {
          input: response.usage.input_tokens,
          output: response.usage.output_tokens,
          cache_read: response.usage.cache_read_input_tokens || 0,
        },
      },
    };
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      return { status: 401, json: { ok: false, error: "auth", detail: "No valid Anthropic credentials. Set ANTHROPIC_API_KEY (or run `ant auth login`), then restart the server." } };
    }
    if (err instanceof Anthropic.RateLimitError) {
      return { status: 429, json: { ok: false, error: "rate_limit", detail: "Rate limited by the Anthropic API — try again shortly." } };
    }
    if (err instanceof Anthropic.BadRequestError) {
      return { status: 400, json: { ok: false, error: "bad_request", detail: err.message } };
    }
    if (err instanceof Anthropic.APIError) {
      return { status: err.status || 502, json: { ok: false, error: "api_error", detail: err.message } };
    }
    return { status: 502, json: { ok: false, error: "network", detail: String((err && err.message) || err) } };
  }
}

function sendJSON(res, status, obj) {
  const data = JSON.stringify(obj);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(data);
}

function serveApp(res) {
  fs.readFile(path.join(APP_ROOT, "index.html"), (err, data) => {
    if (err) { res.writeHead(500); res.end("index.html not found"); return; }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = (req.url || "/").split("?")[0];
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }
  if (req.method === "GET" && (url === "/" || url === "/index.html")) return serveApp(res);
  if (req.method === "GET" && url === "/api/health") {
    return sendJSON(res, 200, { ok: true, service: "clara-backend", model: MODEL, phase: 2 });
  }
  if (req.method === "POST" && url === "/api/clara") {
    let size = 0;
    const chunks = [];
    req.on("data", c => {
      size += c.length;
      if (size > MAX_BODY) { sendJSON(res, 413, { ok: false, error: "too_large" }); req.destroy(); return; }
      chunks.push(c);
    });
    req.on("end", async () => {
      if (size > MAX_BODY) return;
      let body;
      try { body = JSON.parse(Buffer.concat(chunks).toString("utf-8")); }
      catch (e) { return sendJSON(res, 400, { ok: false, error: "bad_json" }); }
      const out = await runClara(body);
      sendJSON(res, out.status, out.json);
    });
    return;
  }
  sendJSON(res, 404, { ok: false, error: "not_found" });
});

server.listen(PORT, () => {
  console.log(`CLARA backend on http://localhost:${PORT}  (model: ${MODEL})`);
  console.log("Open that URL to run CLARA with AI connected.");
});
