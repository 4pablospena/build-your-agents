---
title: "Welcome: living documentation, agents, and this site"
description: "Opening post: why this project exists, what we actually built for anyone who lands here, and how it connects OpenClaw, Resizes, and personal experiments."
date: "2026-05-12"
tags: ["documentation", "agents", "openclaw", "nuxt", "architecture"]
cover: "/images/posts/openclawBYA.png"
draft: false
author: "Pablo Suárez Peña"
authorIntro: "I build and refine AI agents with OpenClaw—professionally at Resizes, and on personal projects where I can take more risk. This site is where I publish what I learn as I go: partly to clarify my own thinking, partly in case these notes help someone facing a similar problem—or invite feedback that saves us all a few wrong turns."
---

This blog is **living, personal documentation**. It is not a closed manual or a finished methodology. I am using it to record **how my understanding evolves** as I **design, ship, and improve agents**—including with **OpenClaw**—in both **professional work at Resizes** and **independent exploration**.

If I capture decisions while they are still fresh, I do more than tidy my own mental model. I leave a trace that may help **someone who hits the same wall later**, or attract **a correction, a link, or a conversation** that would otherwise take weeks of trial and error to reach. The blog is where that narrative can breathe—more patiently than in a cramped README or a fleeting social thread.

## What this project is

On the surface, **build/your/agents** is a **Nuxt 3** site that presents a **seven-file architecture** for modular, personal AI agents. The files are intentional labels: **Soul**, **Identity**, **Agents**, **User**, **Memory**, **Heartbeat**, and **Tools**. Each plays a clear role—from tone and boundaries to memory, cadence, and permitted tooling.

The templates are **not empty placeholders**. At a glance:

- **Soul** — who the agent is: voice, values, capabilities, and **hard limits** (what must never happen).
- **Identity** — where it lives: metadata, routing, model configuration, multi-agent and session settings.
- **Agents** — how it operates: workflows, **decision rules**, memory rules, escalation, and communication patterns—the file that _reads_ the others in a defined order.
- **User** — who it serves: your preferences, projects, contacts, priorities, and explicit “do not do” lines.
- **Tools** — what it may invoke: skills, MCPs, built-ins, selection order, and error handling (the “static map” of capability).
- **Memory** — what persists as **evergreen knowledge**: confirmed facts, usually one line per fact, **superseded** rather than silently deleted when something changes.
- **Heartbeat** — how it acts on its own time: scheduled tasks, reviews, alerts, and rules for **what must never run without your confirmation**.

On the site, those files are also grouped into **four tiers** (core identity, orchestration, operational inputs, state and memory). That layer answers “what do I trust first?” and “what sits on top of what” before you open a single `.md`.

The site does not stop at the landing page. A **Documentation** section (`/docs`) is the working centre for anyone who wants to **read, copy, or adapt** the seven files: each layer is laid out with context, preview toggles, and links to the raw Markdown you can drop into your own agent setup. The **blog** (where you are now) is for longer essays, field notes, and the occasional personal aside—so the “spec” stays crisp while the story can stretch.

Visually, the project commits to a **bold, brutalist palette**: strong type (Archivo Black, Fraunces, Space Mono), heavy borders, hard shadows, and saturated colour that avoids generic “startup neutral.” That is not ornamentation alone. Documentation you live in for hours should feel **authored**—so visitors sense a human behind the decisions, not only a theme.

## How this fits OpenClaw, Resizes, and personal use

The ecosystem around **capable agents**—tool use, memory, reasoning loops—is moving quickly. At **Resizes**, refinements to rules, context windows, and guardrails directly affect **quality, cost, and trust**. In **personal** projects, the same questions return—but with more freedom to experiment and a wider margin for failure.

This site and the seven-file split are my hedge against two extremes: an **opaque monolith** of instructions, and **implicit knowledge** that lives only in model context. When something works or breaks, I want a **stable pointer**—a Soul file for voice, Memory for consolidated facts, Tools for what the agent may touch. The blog adds **narrative**: why one trade-off beat another, which assumption failed, and which simplification paid off.

## What we built—and what it gives you as a reader

Below is a fuller picture of **what exists in this repository today**, told from the perspective of someone opening the site for the first time. The goal is context: what you are looking at, and how the pieces relate.

### The landing story

The home page is deliberately **sequenced**, not a single wall of text. It opens with a clear **who this is for**—so you can decide in seconds whether the seven-file idea matches how you work. From there, an **architecture map** shows how Soul, Identity, Agents, User, Memory, Heartbeat, and Tools sit in relation to one another, without pretending the diagram is the whole truth. A **files grid** introduces each file on its own card: what it is for, what “good” looks like, and how it connects to the rest. Further down, a **session loop** section frames how I think about starting and closing a working session with an agent, and a **quick start** strips the path down to a handful of concrete steps.

Each block is implemented as its own Vue component, not because frameworks demand it, but because **the same modularity I want in agent design** is easier to maintain when the site mirrors it. If you only need a fragment of the idea, you can still orient yourself without reading the entire vertical page in one pass.

### Documentation you can lift into your workflow

The **`/docs`** route is where the seven starter files move from concept to **something you can actually use**. The content is grounded in the same Markdown sources that ship as **downloadable templates**: you are not reading a paraphrase that drifted from the files—you are seeing the spec that can live in your repo or in your agent’s context.

Those canonical files start in `templates/` and are **mirrored into `public/templates/`** during the build, so every `.md` you see documented has a **stable URL** you can share, fetch, or save. A **reading map** bundled with the templates helps someone new answer “what do I read first?” without guessing order. For me, that separation matters: documentation should be **portable and diffable**, not trapped inside a CMS or a proprietary editor.

### This blog: context on top of the spec

Longer writing lives here—**first-person, dated, tagged**, and searchable from the blog index. Where the landing sells the shape of the system and `/docs` carries the files themselves, these posts carry **intent, mistakes, and follow-ups**. You might come for the templates and stay for a note on memory patterns; or you might read a post first and only then open Soul.md. Either direction is valid.

Posts are written in **Markdown with structured metadata** (title, summary, date, tags, optional cover image). Some pieces may carry a short **author note** at the top when a personal framing helps; others stay neutral. Drafts can exist while I am still thinking out loud, without appearing in the public index until they are ready—so what you see listed is deliberately **published**, not accidental scratch work.

### Scripts, assets, and the small things that make sharing work

Behind the scenes, **build scripts** keep the template set in sync with the public copy and **generate a raster social image** from the site’s vector artwork, so when a link is shared it still looks like _this_ project—not a blank or generic preview. None of that changes how you read the pages, but it is part of what makes the repository **shippable as a real site**, not only a folder of notes.

## What comes next

Later posts will go deeper: memory patterns, tool boundaries, OpenClaw session notes, lessons from Resizes, and experiments that did not pan out. If anything here helps you—or you believe a premise is wrong—I would welcome a message or a public thread where that conversation belongs. **Living documentation works best with a little dialogue around it.**

---

Thank you for **opening the site, reading this far, and taking an interest in what I have built**. Consider this first post an open door: a work in progress, a point of view under revision, and an invitation to continue the conversation.

**I will see you in the next one.**
