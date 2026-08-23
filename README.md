# C.L.A.R.A

**C**ontent **L**earning **A**utomated & **R**efinement **A**ssistant —
the universal AI Content Execution Engine (formerly the Triad T AI Editor;
Triad T Enterprise lives on inside the app as a brand profile).
`index.html` is the whole app —
single file, no build step, no dependencies. Open it in any modern browser.
`ARCHITECTURE.md` is the governing analysis and phase plan.

**Honesty contract:** nothing in this app fakes AI. Every capability is
declared in a central registry as `LOCAL`, `LOCAL HEURISTIC`, `SCHEMA ONLY`,
`NEEDS AI`, or `NEEDS MEDIA TECH`, and the UI badges, gates, and chat replies
all derive from it. When a feature is waiting on a backend, the app says
exactly which one.

## Layout (Phase 1)

Three-panel editor, everything reachable without leaving it:

- **Left — Media | Brand | Strategy | Assets.** Real media upload with
  preview (video/image), brand profiles with full Triad T Enterprise content
  DNA (tone, pillars, prohibited language, CTA library), the content brief
  (platform, objective, funnel, 9-field audience profile, 19 content angles,
  7 story structures, CTA with funnel-fit checking), and the SFX category
  library.
- **Center — preview + transport/trim + dock.** Real playback, seek,
  timeline click-to-scrub, in/out trim points. The dock tabs:
  **Timeline** (13 marker categories, click a marker for its WHY popover;
  content + visual preset rails), **Content Map** (editable, scaffolds from
  the chosen structure, drives markers, coverage meter), **Hooks**
  (5 hook types, 9-dimension scoring with per-dimension reasoning, saved
  candidates), **Animation** (editable sequencer with hierarchy levels and
  motion-language guidance), **Audio** (4-layer model, cue table, SFX
  density/restraint meter), **Markers** (every marker with its reasoning).
- **Right — Triad AI | Director | QC.** Chat with a local command router
  (`help` lists what genuinely works; unmatched requests get routed to the
  owning agent with an honest "waiting on X" reply), the AI Director command
  center (brief, 18-step workflow tracker, the 12 foundational rules, the
  capability truth table), and Content QC (plan-readiness scan /100 with
  strongest elements, risks, required and optional fixes, plus the
  27-dimension scorecard schema — pending dimensions say "AI", never a
  made-up number).

## What genuinely works today (local)

Media preview/playback/trim · project persistence (localStorage) + JSON
export/import · strategy/audience/angle/structure/CTA brief · content map
scaffolding · plan-based retention scan with reasons and suggested actions ·
9-dimension hook heuristic · CTA funnel-fit + placement checks · QC
readiness scan incl. brand prohibited-language check and animation/SFX
restraint rules · timeline markers with explainable popovers · content
(10) + visual (8) preset pairing · chat command router.

## What is architecture-only (by design, per Part 34)

Footage analysis, EDL generation/apply, B-roll intelligence, caption
emphasis, AI hook alternatives, creative QC scoring, rendering, analytics,
learning. Their data models ship now (`Models.*` in `index.html`); the
phases that light them up are in `ARCHITECTURE.md`.

## AI backend (Phase 2)

CLARA's AI features run through a thin local backend that keeps your API key
out of the browser and pins the model (Claude Opus 5, adaptive thinking,
safety fallbacks enabled by default):

```bash
cd server
npm install
ANTHROPIC_API_KEY=sk-ant-...  npm start     # or authenticate once with `ant auth login`
```

Then open **http://localhost:8787** — CLARA loads with the top-bar badge
green (**AI CONNECTED**). That unlocks: AI hook review with 3 stronger
alternatives (Hooks tab), **⚡ Generate With AI** on the Content Map,
**⚡ AI Recommend Angle** in Strategy, and free-form chat that answers with
real creative direction grounded in your brief and brand DNA. The top-bar
badge opens the connection panel (custom URL, test, setup steps).

Honesty note: the claude.ai artifact preview sandbox blocks all network
calls, so AI features work when CLARA runs from this repo — not in the
shared preview. The app states this instead of faking results.

## Footage intelligence (Phase 3)

Load a video, then **Analyze Footage** (Media tab or chat). Two honest stages:

- **Measured, works offline:** Web Audio finds every silence and dead-air
  stretch in the actual audio track (plus clipping/low-level warnings and the
  energy curve drawn under the timeline); frame differencing finds scene
  changes. All of it lands as timeline markers with reasons.
- **AI, with the backend connected:** CLARA samples up to 12 frames and
  genuinely looks at them (Claude vision) alongside your transcript and the
  measured audio — best moments, suggested removals, potential hooks (with
  USE buttons), B-roll opportunities, framing and audio notes.

**Transcripts:** paste any SRT/VTT export (CapCut, Premiere, YouTube
captions) in the Media tab — timing is preserved, and the Content Map can
sync dialogue from it. Built-in speech-to-text is deliberately not faked;
the capability table says exactly that.

**The rough cut is real:** cut ranges (set IN/OUT → ✂ CUT, or "cut the dead
space", or apply EDL removals) are skipped live during playback — toggle
ROUGH CUT in the toolbar, undo any cut. The **EDL tab** holds the AI's full
edit decision list, every entry with its reason and a one-click apply.
Rendering the finished file is Phase 7; until then the app never pretends.

## Motion on the preview (Phase 4)

Animation cues play **live on the preview** at their timecodes — scrub or
play and they enter/exit with real motion, sized by hierarchy level
(L1 dominant · L2 supporting · L3 context label), colored by the active
visual preset, eased by the content style's motion language. Toggle
OVERLAYS in the Animation tab; **⚡ Generate Sequence** has CLARA write the
whole timed sequence (restraint rules enforced in the prompt), with undo.

**Frame control:** the toolbar's ratio picker (9:16 · 1:1 · 4:5 · 16:9 ·
16:10) reshapes the preview frame — it auto-matches your platform choice
(Reels/TikTok/Shorts → 9:16) until you pick manually. FIT toggles
contain/fill, and the scale slider previews punch-ins up to 160%.

## Dev

Open `index.html#selftest` and check the console for `TRIAD-SELFTEST` lines —
12 checks covering tabs, state binding, scoring, scaffolding, retention, QC,
the chat router, markers, and export/import.
