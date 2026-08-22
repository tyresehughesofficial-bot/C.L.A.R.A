# C.L.A.R.A — Triad T AI Editor

Universal AI editing interface. `index.html` is the **baseline** — the single-file
center point that all future work builds off of.

## Running it

Open `index.html` in any modern browser. No build step, no dependencies, no server.

## What's in the baseline

A single-page app with five views (tab bar under the top bar):

| View | What it does today |
|---|---|
| **Editor** | Preview canvas with animated per-style backgrounds, transport + trim toolbar, timeline with AI markers, media dropzone, quick actions, and the Triad AI chat panel. |
| **Strategy** | Content strategy form (brand, platform, audience, objective, funnel stage, topic, angle, CTA). Saved in-session to the `TriadAI` data layer. |
| **AI Director** | Brief synthesized locally from Strategy + Hook inputs, plus a presence-based Content Score. |
| **Content Map** | Editable chronological breakdown of the edit. Time ranges push markers onto the Editor timeline. Includes Animation Sequence and Sound Design cue tables (example schema rows). |
| **Hook Analysis** | Hook Engine scoring spoken/text/visual/audio hooks with a local heuristic. |

Eight edit style presets (Velocity, Blueprint, Obsidian, Cipher, Noir, Aurora,
Titanium, Ember), each with its own accent palette, caption treatment, canvas
preview animation, and a detail modal.

## What's real vs. placeholder

The UI badges each section honestly:

- **Local** — real user input, stored in the in-page `TriadAI` object for the session only (no persistence).
- **Local heuristic** — hook scoring is computed from simple text features (length, numbers, question marks, power words), not AI judgment.
- **Mock / example data** — the Animation Sequence and Sound Design tables show the schema a future AI backend would populate.
- **Needs AI Backend** — footage analysis, script writing, and "suggest stronger hook" surface a toast saying so instead of faking results.

The `TriadAI` object in `index.html` is the data layer: its shapes mirror what a
real AI backend response will eventually populate, so backend work can target
those structures directly.
