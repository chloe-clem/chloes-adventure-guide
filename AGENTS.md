# Chloe's Adventure Guide

## Mission

Chloe's Adventure Guide (repository: travel-atlas) is a long-term portfolio project and personal travel guide built with Astro.

Tagline: "Personal recommendations for trips that change how you see the world."

This is **not** a template website.

The goal is to create one of the highest quality personal travel websites on the web.

Every implementation decision should prioritize:

- elegance
- maintainability
- performance
- accessibility
- storytelling
- long-term scalability

The project is expected to grow to dozens of destinations over multiple years.

---

# Team Roles

The project has two primary collaborators.

## ChatGPT

ChatGPT is the project architect.

Responsibilities:

- architecture
- UX decisions
- design direction
- feature planning
- content strategy
- code review
- major technical decisions

Never replace architectural decisions without explicit approval.

---

## Codex

Codex is the implementation engineer.

Responsibilities:

- writing code
- refactoring
- debugging
- creating components
- running commands
- implementing requested features

Before making large edits:

1. inspect existing code
2. understand the architecture
3. preserve existing behavior
4. make the smallest safe change

---

# Core Philosophy

Chloe's Adventure Guide should feel like an experience.

Never build pages that feel like ordinary blogs.

The experience should feel cinematic.

Scrolling should feel intentional.

Animations should feel smooth.

Whitespace is a design element.

---

# Approved Homepage

The approved homepage is the calm editorial design (chosen over bolder alternatives): bright warm-white background, Fraunces serif headlines, Inter body text, and a photo of Chloe as the hero. The earlier Earth/globe intro was retired and should not be restored.

Flow:

Hero (name, tagline, photo of Chloe)

↓

Why I travel

↓

What kind of trip are you after? (five destination categories: Big City, Historical, Nature, Small Town, Beach)

↓

The guide (searchable list of every destination)

Destination and category pages share the same calm design system: global tokens and type in src/styles/global.css, a shared sticky SiteHeader and SiteFooter, and component-scoped styles for everything else.

---

# Navigation Rules

Destination and category pages link back to the homepage's #explore and #atlas-list sections. Old /feelings/* URLs redirect to the matching /explore/* category.

Destination pages include subtle navigation.

Navigation should feel invisible whenever possible.

---

# Destination Philosophy

Destinations should tell stories.

Avoid generic travel-blog layouts.

Each destination should eventually support:

- hero
- overview
- story
- highlights
- recommendations
- practical tips
- galleries
- related destinations

Pages should be reusable.

Never duplicate layout code.

---

# Technical Stack

Framework:

Astro

Deployment:

GitHub Pages

Content:

Astro Content Collections

Language:

TypeScript where appropriate

Styling:

Prefer component-scoped CSS or a consistent global system.

Do not introduce additional frameworks unless requested.

---

# Architecture

Preferred structure

src/

components/

layouts/

pages/

content/

styles/

data/

lib/

Each component should have one clear responsibility.

Avoid giant components.

Avoid duplicated markup.

---

# Coding Standards

Write readable code.

Prefer descriptive variable names.

Comment WHY.

Do not comment WHAT.

Avoid clever code.

Optimize for maintainability.

---

# Git Workflow

Never rewrite history.

Never delete large amounts of code.

Never replace working implementations without approval.

Prefer incremental commits.

---

# Before Editing

Always:

1. inspect existing files
2. explain findings
3. propose a plan
4. implement
5. run checks
6. summarize changes

---

# Design Standards

Animations should feel premium.

Avoid:

- flashy effects
- excessive parallax
- unnecessary motion
- visual clutter

Prioritize:

- smooth transitions
- typography
- spacing
- photography

---

# Future Features

The site will eventually include:

- 30+ destinations
- interactive maps
- search
- filters
- photo galleries
- travel statistics
- recommendation engine
- packing guides
- itineraries

Build reusable systems.

Do not hardcode future content.

---

# Performance

Keep Lighthouse scores high.

Prefer Astro islands.

Lazy-load heavy assets.

Optimize images.

Minimize JavaScript.

---

# Current Priority

Current milestone:

Build the first production-quality version of the site.

Before implementing anything:

Inspect the existing workspace.

Verify the Astro project.

Understand the current architecture.

Then recommend the smallest next step.

Never assume files are missing.

Always verify.