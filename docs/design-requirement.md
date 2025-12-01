# Portfolio Website Requirements

## 1. Overview

You are a passionate software developer who is curious about computers, software engineering, design, and the creative process of building things. Your daily life and workflow as an enthusiast developer should be reflected across the portfolio. The design should showcase your identity: someone who learns, builds, shares, experiments, and approaches problems with curiosity.

This document defines the requirements for building your portfolio website in a way that helps AI-powered IDEs understand the structure, intention, and rules of the system. This ensures that any changes applied through AI tooling will respect the vision of the design.

The portfolio must be expressive, story-driven, technically flexible, and deeply personalized.

## 2. Core Design Philosophy

* **Software Developer–Themed Aesthetic**: The theme is not only about computers or hardware. It should express the *daily feels, tools, environment, and rituals* of a passionate software developer.

  * Elements can reflect: editors (VSCode/IntelliJ abstractions), terminals, logs, pipelines, cloud diagrams, branching graphs (Git), tasks, sticky notes, architecture blocks, flowcharts, debugging traces.
  * You can still incorporate computer hardware visuals (chips, processors, LEDs, wires, memory bubbles), but do not limit the design to hardware only.

* **Avoid Static Visuals**: Prioritize animated, generative, interactive, or reactive elements.

* **Modern & Premium**: Feel similar to high-end, spacious, polished design systems like Apple, Linear, Vercel, or Stripe.

* **Minimal & Spacious**:

  * Clean layout, lots of breathing room.
  * Support **both dark and light modes**.
  * Minimalistic color usage, but with meaning.

* **Unconventional but Readable**: Present sections uniquely but clearly.

* **Story-Driven Scroll**: The website scroll should narrate your progression as a developer: learning → building → refining → sharing.

## 3. Animations. Animations

* Use animations inspired by terminals and digital systems:

  * Typewriter / terminal printing
  * Data streams / packet animations
  * Subtle glow and LED flickers
  * Wire connection animations between sections
  * Computer boot-up sequences for section transitions
* Animations should be impactful but not overwhelming.
* i basically dont like cards, shadow animations, as its very regular and not unique.

---

## 4. Color Palette

* Minimal and controlled.
* Likely combinations:

  * Black / deep charcoal
  * Neon accents (green, blue, yellow)
  * Subtle gradients resembling display panels
* Should reinforce the computer-theme identity.

---

## 5. Page Sections & Theming

Each section is driven directly from the JSON file and themed around the daily workflow of a passionate developer.

### 5.1 Hero / Introduction

* Represents your core identity: *Learn • Build • Share*.
* Could look like:

  * A boot sequence
  * A terminal greeting
  * A floating editor window typing your name
  * A data stream forming your identity

### 5.2 About

* Pulled from the JSON `about` array (Learn, Build, Share).

### 5.3 Education

* Can be styled like:

  * Memory blocks
  * Data clusters
  * Timeline nodes that expand on interaction

### 5.4 Experience

* Represent each job as a process in a pipeline.
* Animated wires or flows show the continuity of your career.
* Each item expands into details using data from `experience`.

### 5.5 Projects

* Each project represented as a micro-chip, card, or editor tile.
* Hover reveals technologies, links, descriptions.
* Pulled fully from `projects` JSON.

### 5.6 Knowledge (Domain Expertise)

* Each domain (e.g., Payment Gateway, SWIFT Messaging) represented as a **module card**.
* “Key skills” appear as tags around the module.
* Shows deeper expertise beyond projects.

### 5.7 Tech Stack

* Each item represented as:

  * Icons-as-diagrams (not literal icons)
  * Toolboxes
  * Stack layers
* Grouped by type (framework, language, cloud, database, tool).

### 5.8 Certifications

* Styled as credential chips or security badges.

### 5.9 Hobbies

* Designed playfully using lightweight visuals.
* "Reading" and "Capture Photos" can be represented as abstract icons or animated elements.

### 5.10 Contact

* Should feel like a console prompt or a chat interface.
* Social links animate in as if executed via commands.

### 5.11 Resume

* A simple elegant button—like a download chip.

## 6. Data Structure (Single JSON Source). Data Structure (Single JSON Source)

All website content must come from **one JSON file**.

* Adding or modifying fields in JSON should automatically update the UI.
* Use a modern framework or library that supports reactive rendering (e.g., React, Next.js, Astro, Svelte, etc.).
* Can use **shadcn/ui** and other modern components.

Example JSON structure (high-level):

```json
{
  "hero": { "title": "...", "subtitle": "...", "about": "..." },
  "education": [ ... ],
  "experience": [ ... ],
  "skills": { "languages": [...], "frameworks": [...], ... },
  "projects": [ ... ],
  "contact": { "email": "...", "links": { ... } }
}
```

---

## 7. Technical Notes

* Use a modern framework (e.g., React, Next.js, SvelteKit, Astro).
* Animations can use libraries such as:

  * Framer Motion
  * Three.js (optional for subtle 3D effects)
  * GSAP (for controlled sequences)
* Components must be modular and AI-edit-friendly.
* Typography should include terminal-style fonts.

---

## 8. Additional Principles

* Maintain storytelling across the scroll.
* Keep the experience fun, interactive, and memorable.
* Despite heavy inspirations, keep the interface minimal and calm.
* Every element should have meaning and visual intentionality.

---

## 9. Summary

The portfolio should be a fusion of:

* Modern aesthetics
* Computer-themed creativity
* Minimal premium design
* Storytelling
* Smart animations
* JSON-driven dynamic architecture

This requirements document should guide future development, iteration, and AI-driven enhancements while maintaining the intended artistic and functional direction.
