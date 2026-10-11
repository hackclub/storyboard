---
title: Tracking Your Hours
description: How Hackatime and Lapse measure your coding and art time.
order: 2
category: Guides
---

# Tracking Your Hours

Prizes are earned with **hours**, so accurate tracking matters. Two tools cover the two ways you'll spend your time.

## The two trackers

| You're doing...                            | Track with    | What it records       |
| ------------------------------------------ | ------------- | --------------------- |
| Coding your game (Ren'Py scripts, systems) | **Hackatime** | Time in your editor   |
| Drawing art, writing, planning             | **Lapse**     | Screenshots over time |

Both tools send your hours to Hack Club automatically once they're set up. You don't need to submit timesheets by hand.

## Setting up Hackatime

1. Install the Hackatime browser extension.
2. Sign in and connect the editor you'll use.
3. Start working — Hackatime logs time while you edit.

Hackatime understands many editors out of the box:

- VS Code and VS Codium
- Neovim and Vim
- JetBrains IDEs
- Zed

## Setting up Lapse

Lapse periodically snapshots your screen and turns the snapshots into a timelapse. Install the app, leave it running while you draw or write, and it tallies the session.

> **Tip:** start both trackers _before_ you settle in to work. Time spent before a tracker is running can't be recovered.

## A typical session

```bash
# 1. open your project
cd my-visual-novel

# 2. start Lapse, then your editor
code .

# 3. work, and let the trackers log your hours
renpy.sh .
```

When in doubt, ask in the `#storyboard` Slack channel before assuming something is tracked.
