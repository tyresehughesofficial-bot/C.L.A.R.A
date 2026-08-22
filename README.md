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

## Dev

Open `index.html#selftest` and check the console for `TRIAD-SELFTEST` lines —
12 checks covering tabs, state binding, scoring, scaffolding, retention, QC,
the chat router, markers, and export/import.
