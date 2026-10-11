---
title: Writing Your Story
description: A quick Ren'Py walkthrough from empty project to first scene.
order: 3
category: Guides
---

# Writing Your Story

This guide walks you from a blank project to a playable first scene in [Ren'Py](https://www.renpy.org/). Skim it, then make it yours.

## Create a project

Install Ren'Py, open the launcher, and choose **Create New Project**. Give it a name and a resolution — the default `1280x720` is a fine start.

## Your first scene

Everything in Ren'Py lives in `.rpy` files. Here's a complete opening scene:

```python
define kat = Character("Kat", color="#d997f0")

label start:
    scene bg window
    with fade

    kat "Okay. Let's figure out what happened here."

    menu:
        "Open the door":
            jump investigate
        "Stay put":
            jump wait

label investigate:
    kat "The handle is warm..."
    return
```

A few things to notice:

1. `define` creates a reusable character.
2. `label` marks a place the story can jump to.
3. `menu` presents choices that branch the narrative.

## Adding images

Drop art into the `images/` folder, then reference it by filename without the extension:

```python
image bg window = "bg/window.png"
image kat happy = "characters/kat_happy.png"
```

## Where to go next

- **Writing.** Draft the whole story before polishing any single scene.
- **Art.** Placeholder art is fine while you draft; replace it later.
- **Testing.** Run the game often. A broken build midway is hard to untangle.

> Finished a rough draft? Go [submit your project](/docs/submitting) and keep polishing — hours still count.
