# CLARA — Content Execution Engine Architecture

CLARA = Content Learning Automated & Refinement Assistant (rebranded from
"Triad T AI Editor" by user direction; Triad T Enterprise remains a brand
profile inside the app, not the app's name).

Governing document for evolving the baseline editor (`index.html`) into the
AI Content Execution System. Written against the full 38-part specification.
The prime directives: **no wasted attention**, **every edit has a reason**,
**never fake a capability** — anything not genuinely computed is labeled
`SCHEMA ONLY`, `LOCAL HEURISTIC`, or `NEEDS <technology>`.

---

## A. Current state (pre-Phase-1 baseline, commit `c32d14b` + fix)

Single-file static app, no build step, no dependencies. ~1,475 lines.

**Real and working locally:**
- 3-panel editor shell: media rail (240px) / preview + timeline / AI chat (300px)
- 8 visual presets (Velocity, Blueprint, Obsidian, Cipher, Noir, Aurora,
  Titanium, Ember) with per-preset ambient canvas animation, chip rail,
  info modals, dynamic theming of caption/frame/labels
- Top-level view tabs to 4 secondary full-screen views: Strategy (8-field
  form), AI Director (10-card brief + presence-based score bars), Content Map
  (editable table, 4 seed rows, drives 3-color timeline markers), Hook
  Analysis (4 hook fields, 6-dimension local heuristic)
- `TriadAI` namespace object holding strategy / hookAnalysis / contentMap /
  animationSequence / soundDesign (last two are example rows)
- Honest badge system (`local` / `mock` / `needs-ai`) hardcoded in markup
- Toast system, preset modal

**Mock or absent:**
- Dropzone, transport, trim, split, delete, export → toasts only
- Chat → one canned reply regardless of input
- No persistence of any kind; no brand model; no agent architecture; no
  capability registry; no explainability objects; no real media; mock 22s
  timeline; no retention, QC, CTA, structure, or angle logic

---

## B. Gap analysis (spec part → classification)

Classifications: **EXISTS** · **EXPAND** (exists, needs expansion) ·
**MOCK** (UI only) · **MISSING** · **AI** (requires AI/API backend) ·
**MEDIA** (requires media-processing technology: STT, CV, audio DSP, render)

| # | Capability | Status | Phase-1 action |
|---|---|---|---|
| P1 | Content Strategy engine | EXPAND | 9-field audience profile, target duration, live-persisted brief (local) |
| P2 | Content Angle engine | MISSING | 19-angle library + fit notes local; angle *reasoning* = AI |
| P3 | Hook engine | EXPAND | 5 hook types (adds Editing hook), 9 scoring dimensions with per-dimension reasons, candidate list. Alternative-hook generation = AI |
| P4 | Script structure library | MISSING | 7 structures as data (beats + proportions), extensible; scaffolds Content Map locally |
| P5 | Retention engine | MISSING | Plan-based heuristics local (repetition, static stretches, gaps, jobless rows). Footage-based = AI + MEDIA (STT/CV) |
| P6 | Footage analysis | MOCK | Schema (`footageAnalysis`, `clipAnalysis`) + capability gates. Real analysis = MEDIA (STT + CV + audio DSP) + AI |
| P7 | Edit Decision List | MISSING | Schema + registry entry. Generation = AI; APPLY = MEDIA (render engine) |
| P8 | Cutting & pacing intelligence | MISSING | Pacing targets encoded in content presets; rhythm intelligence = AI + MEDIA |
| P9 | B-roll intelligence | MISSING | Recommendation schema; generation = AI + footage index |
| P10 | Animation sequence engine | EXPAND | Editable sequencer table, full cue model (level, sync, reason, source). AI generation = AI |
| P11 | Animation hierarchy | MISSING | 3-level model + hierarchy field + QC distribution check (local) |
| P12 | Motion design system | MISSING | 4 motion languages as data (Educational, High Energy, Cinematic, Premium Financial) wired to content presets (local) |
| P13 | Sound design engine | EXPAND | 4-layer model (dialogue/music/SFX/ambience), 23-category SFX library, editable cue table. Audio processing = MEDIA |
| P14 | SFX intelligence | MISSING | Density/restraint meter local; placement recommendations = AI |
| P15 | Sound↔animation sync | MISSING | `syncId` linkage in cue models local; visual sync lane = Phase 4/5 |
| P16 | Caption intelligence | MOCK | `captionSequence` schema; emphasis decisions need transcript = MEDIA + AI |
| P17 | CTA engine | EXPAND | CTA type library, funnel-fit matrix, placement-interruption check (local) |
| P18 | Creative agent architecture | MISSING | 8 agent modules with uniform interface + intent registration (local now, API later) |
| P19 | Content QC system | EXPAND | Full 27-dimension schema; local **plan-readiness scan** with honest labeling; creative scoring = AI |
| P20 | AI timeline markers | EXPAND | 13 marker categories, distinct colors, click → recommendation popover with WHY |
| P21 | AI Director view | EXPAND | Moves to right-panel tab; adds structure/motion/sound direction, workflow tracker, rules, capability truth table |
| P22 | Content Map | EXPAND | Adds Dialogue + Job columns, structure scaffold, coverage meter |
| P23 | Content vs visual presets | MISSING | 10 content execution presets local, pairable with the 8 visual presets |
| P24 | Brand intelligence | MISSING | `brandProfile` model + Brand tab (local) |
| P25 | Triad T content DNA | MISSING | Fully populated Triad T Enterprise profile incl. prohibited-language list (checked by QC locally) |
| P26 | Performance analytics | MISSING | `performanceMetrics` schema now; entry/import UI = Phase 8 |
| P27 | Learning system | MISSING | `learningInsights` schema now; requires backend + accumulated data |
| P28 | 18-step workflow | MISSING | Workflow tracker in Director with live done/ready/blocked status (local) |
| P29 | Panel-tab UX restructure | MISSING | Implemented: left Media/Brand/Strategy/Assets · center dock Timeline/Map/Hooks/Animation/Audio/Markers · right Triad AI/Director/QC |
| P30 | Triad AI chat commands | MOCK | Local intent router (QC, hooks, retention, presets, duration, why, help). Natural-language understanding = AI |
| P31 | Explainable AI | MISSING | Unified `recommendation` object with `reason` + `source` on every generated suggestion; WHY affordances (local) |
| P32 | Preset creation system | MISSING | Presets stored as config objects now; builder UI = later phase |
| P33 | 12 foundational rules | MISSING | `TRIAD_RULES` constant, surfaced in Director, enforced by restraint checks in QC |
| P34 | Honest capability separation | EXPAND | Central capability registry drives every badge and every gated action |
| P35–37 | Architecture / data models / execution object | MISSING | Full model layer + single master execution object as app state (local) |
| P38 | Collaborator posture | — | Chat replies explain reasoning or state exactly what backend a request awaits |

---

## C. Recommended architecture

**Packaging decision:** stay single-file through Phase 2. ES modules do not
load over `file://`, and the artifact preview requires a self-contained page.
Discipline comes from hard internal layer boundaries (below). When the AI
backend lands (Phase 3), extract layers into modules with a Vite build; the
boundaries are drawn so extraction is mechanical.

Layers, top of file to bottom, each depending only on layers above it:

1. **Reference libraries** (pure data): visual presets, content presets,
   structures, angles, motion languages, SFX library, marker types, CTA
   fit matrix, QC schema, the 12 rules.
2. **Models** — factory functions for every Part-36 object: `project`,
   `brandProfile`, `contentBrief`/`contentStrategy`, `audienceProfile`,
   `hookAnalysis`, `scriptStructure`, `footageAnalysis`, `clipAnalysis`,
   `editDecisionList`, `timelineMarker`, `animationCue`, `audioCue`,
   `captionSequence`, `ctaStrategy`, `qualityScore`, `performanceMetrics`,
   `learningInsights`, `recommendation`.
3. **Capability registry** — every capability declared once with status
   (`LOCAL`, `LOCAL HEURISTIC`, `SCHEMA ONLY`, `NEEDS AI`, `NEEDS MEDIA
   TECH`, `NEEDS BACKEND`) + what unlocks it. All UI badges and gates
   derive from this registry. Nothing pretends.
4. **Store** — one master **content execution object** (Part 37) as app
   state; `commit()` persists (localStorage, try/catch-guarded) and
   re-renders; JSON export/import.
5. **Agents** (Part 18) — 8 modules (`strategist`, `scriptHook`,
   `creativeDirector`, `editor`, `motion`, `sound`, `qc`, `analyst`) with a
   uniform `{describe, intents, run(task, payload)}` interface. Local
   heuristics live inside their owning agent. **This is the AI seam**: in
   Phase 2+ `run` routes to a backend service instead, UI untouched.
6. **Router** — maps chat input to agent intents; unmatched input returns an
   honest structured "here is which agent handles this and what it needs"
   reply, never a canned pretense.
7. **Media engine** — HTML5 video/image loading, real playback, playhead,
   in/out trim, seek-on-timeline. Split/multi-clip/render are gated
   registry entries (Phase 3/7).
8. **UI renderers** — pure render-from-state per panel/tab; event wiring
   calls Store/Agents; no business logic in renderers.

**Design system:** unchanged — the premium Triad identity (deep blacks, gold
accent, condensed display type, mono labels) is the constant; all new
surfaces reuse the existing component classes.

---

## D. Development phases

| Phase | Scope | Unlocked by |
|---|---|---|
| **1 (this)** | Content intelligence UI + full data architecture: everything marked "local" in the gap table, panel-tab UX, real media preview/trim, persistence, explainable recommendations, chat intent router, honest capability registry | Browser only |
| **2 (shipped)** | Text-intelligence backend online. `server/server.js` (official `@anthropic-ai/sdk`, model pinned to `claude-opus-5`, adaptive thinking, server-side refusal fallbacks on by default, prompt-cached system block, key stays server-side) + in-app `PromptKit` (one prompt layer: stable CLARA persona/brand-DNA system block + volatile state in the user turn) and `AIService` (health-checked HTTP transport, JSON parse + per-task validation, honest gating when offline). Live AI tasks: hook review + 3 alternatives, Content Map generation from the brief, angle recommendation, free-form chat with project context. Connection UI on the top-bar badge; capability truth table flips to AI CONNECTED live. Constraint discovered: the claude.ai artifact preview sandbox blocks network and this account's artifact runtime has no ask-Claude capability — so AI runs only when CLARA is served by the backend (`http://localhost:8787`), and the app says so rather than pretending. | AI backend |
| **3 (shipped)** | Footage becomes real. Local engines (all measured, zero dependencies): Web Audio silence/dead-air/energy/clipping analysis of the actual audio track; canvas frame-differencing scene detection; frame sampling (≤12 downscaled JPEGs). Transcript import (SRT/VTT/plain, timing preserved) with one-click dialogue sync into the Content Map — built-in STT deliberately deferred (no zero-install path; capability says so). AI stage: sampled frames + transcript + measured audio → Claude vision footage analysis (best moments, removals, potential hooks with USE buttons, B-roll, framing/audio notes — all timecoded with reasons, all as markers). EDL generation from the analysis with per-entry Apply: removals become **cut ranges** — the new CutEngine (merge/undo/kept-duration) drives a **rough-cut preview** where playback genuinely skips cut ranges (toggleable), the trim toolbar cuts IN→OUT for real, and "cut the dead space" removes measured silences in one command. MediaEngine hardened for Infinity-duration recorded WebMs. Rendering the cut to a file remains Phase 7 and the UI says so. E2E-verified headless on real generated media (audio, scenes, frames→AI, EDL, cuts, skip playback). | Browser + AI backend |
| **4 (shipped)** | Animation Sequencer alive on the preview: overlay engine renders cues at their timecodes during playback/scrub (plan mode too), with Part-11 hierarchy enforced by layout (L1 center-dominant, L2 supporting, L3 context tag), enter animations mapped from cue text (fade/scale/slide/stamp/snap), easing + duration from the active motion language, colors from the visual preset; OVERLAYS toggle; editing a cue refreshes live. AI `animGenerate` task writes the full timed sequence (restraint rules R3/R5 in the prompt, sound-cue sync suggestions), with backup/undo. Plus frame control (user request): ratio presets 9:16/1:1/4:5/16:9/16:10 with platform auto-suggest, contain/cover fit, punch-in scale to 160% — persisted per project. | Builds on P2/P3 |
| **5** | Sound Design Engine: waveforms, ducking preview, SFX pack integration, sync lane | Audio DSP |
| **6** | AI Quality Control: full 27-dimension creative scoring against footage + plan | AI + P3 |
| **7** | Automated editing/rendering: APPLY AI EDIT PLAN, export | Render engine (server or WebCodecs/ffmpeg.wasm) |
| **8** | Performance analytics entry/import + learning loop over accumulated results | Backend storage + platform APIs |

Change from the suggested sequence: real media preview/trim was pulled
forward into Phase 1 (pure browser capability, and it makes the timeline,
markers and duration real instead of mocked). Hook/strategy/Map/Director
UI also lands in Phase 1 since it needs no backend; Phase 2 becomes the
point where AI replaces the local heuristics behind the same agent seam.
