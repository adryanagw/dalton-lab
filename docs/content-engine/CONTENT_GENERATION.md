# Content Generation Workflow

## Purpose

This document defines the operational workflow for turning a high-school curriculum into production-ready educational content for the website.

Use this together with `CLAUDE.md`.

`CLAUDE.md` defines the permanent principles and behavior.

This document defines **how to execute the content-generation process**.

---

# 1. Source of Truth

The curriculum is the starting point, but it is NOT automatically the complete source of truth for educational content.

The workflow is:

```text
Curriculum
    ↓
Curriculum Map
    ↓
Learning Objectives
    ↓
Content Specification
    ↓
Content Generation
    ↓
Fact / Pedagogy Review
    ↓
Presentation Mapping
    ↓
Implementation
```

Do not skip the intermediate design stages when generating a large amount of content.

---

# 2. Phase 0 — Inspect the Existing Project

Before creating content:

1. Inspect the repository structure.
2. Identify the frontend framework.
3. Identify the content/data architecture.
4. Identify existing reusable components.
5. Identify routing/navigation.
6. Identify styling conventions.
7. Identify whether a CMS or local content files are being used.
8. Identify existing content schemas.
9. Identify existing interactive components.
10. Identify existing PDF generation/export capabilities.

Do not introduce a new architecture if the current architecture already solves the problem adequately.

---

# 3. Phase 1 — Parse the Curriculum

When given a curriculum document or curriculum outline, extract:

```text
Subject
Grade
Chapter
Unit
Topic
Subtopic
Learning requirement
Required competency
```

Preserve the original curriculum hierarchy.

Create a curriculum map such as:

```json
{
  "subject": "Physics",
  "level": "High School",
  "chapters": [
    {
      "id": "mechanics",
      "title": "Mechanics",
      "topics": [
        {
          "id": "kinematics",
          "title": "Kinematics",
          "subtopics": []
        }
      ]
    }
  ]
}
```

Do not generate detailed explanations yet.

---

# 4. Phase 2 — Build the Dependency Graph

Determine what students need to know before learning each topic.

Represent dependencies conceptually as:

```text
Basic Algebra
    ↓
Linear Equations
    ↓
Functions
    ↓
Quadratic Functions
    ↓
Calculus
```

For science:

```text
Atomic Structure
    ↓
Electron Configuration
    ↓
Periodic Trends
    ↓
Chemical Bonding
    ↓
Molecular Geometry
```

Identify:

- Hard prerequisites
- Helpful prerequisites
- Topics that can be learned independently
- Topics that should be introduced earlier

If the curriculum ordering conflicts with pedagogical dependency, flag it.

---

# 5. Phase 3 — Define Learning Objectives

For every topic, create 2–6 meaningful learning objectives.

Use observable verbs:

- Define
- Identify
- Explain
- Compare
- Calculate
- Derive
- Predict
- Interpret
- Analyze
- Apply
- Evaluate

Avoid vague objectives such as:

> "Understand physics."

Prefer:

> "Calculate the acceleration of an object using Newton's second law when the net force and mass are known."

---

# 6. Phase 4 — Classify Topic Importance

Each topic receives:

```text
importance:
  essential
  important
  supporting
  enrichment
```

### Essential

Students should not proceed without understanding it.

### Important

Frequently used or important for exams.

### Supporting

Useful but not central.

### Enrichment

Useful for deeper understanding but not required for the core pathway.

This classification affects content depth and implementation priority.

---

# 7. Phase 5 — Classify Difficulty

Use:

```text
foundation
basic
intermediate
advanced
exam
```

Do not equate "advanced" with "long."

A short concept can be conceptually advanced.

A long calculation can still be basic.

Difficulty should consider:

- Abstraction
- Prerequisite knowledge
- Number of reasoning steps
- Mathematical complexity
- Conceptual difficulty
- Common misconception rate

---

# 8. Phase 6 — Choose the Learning Representation

For each concept, score candidate representations.

Use:

```text
Pedagogical Value:
1–5

Implementation Complexity:
1–5
```

Examples:

| Representation | Best for |
|---|---|
| Text | Definitions and explanations |
| Diagram | Structure and spatial relationships |
| Interactive | Dynamic relationships |
| Simulation | Cause/effect and parameter changes |
| Step-by-step | Procedures and problem solving |
| Graph | Mathematical relationships |
| Table | Comparison/classification |
| Long-form | Derivations and deep reasoning |
| PDF | Printable/offline study |
| Quiz | Retrieval and assessment |
| Flashcard | Memorization/revision |

Prefer high pedagogical value with reasonable implementation complexity.

---

# 9. Phase 7 — Create the Content Specification

Before writing the actual lesson, produce:

```text
Topic:
Subject:
Level:
Chapter:
Difficulty:
Importance:

Learning objectives:

Prerequisites:

Core concepts:

Key definitions:

Important formulas:

Potential diagrams:

Potential interactive components:

Potential deep dives:

Potential PDF content:

Worked examples:

Practice-question types:

Common misconceptions:
```

This specification is the blueprint for the content.

---

# 10. Phase 8 — Generate the Quick Summary

Every important topic should have a concise revision-oriented summary.

Target:

- 3–8 key points
- Important formulas
- Essential terminology
- One-sentence conceptual explanation

The quick summary should be useful even if the student has only 60 seconds to review the topic.

---

# 11. Phase 9 — Generate the Main Explanation

The main explanation should follow:

```text
Concept
↓
Intuition
↓
Formal definition
↓
Representation/formula
↓
Example
↓
Interpretation
```

Do not start with complicated formalism unless the topic requires it.

Introduce terminology immediately before or when it becomes necessary.

---

# 12. Phase 10 — Generate Visual Explanations

Ask:

> "Would a student understand this faster from a diagram than from a paragraph?"

If yes, specify a diagram.

For every diagram recommendation provide:

```text
Purpose:
Elements:
Relationships:
Labels:
Student takeaway:
```

Do not create decorative diagrams.

Every visual should communicate something.

---

# 13. Phase 11 — Generate Interactive Specifications

When an interactive is justified, specify:

```text
Component type:
Learning objective:
Initial state:
Student controls:
Variables:
Outputs:
Visual changes:
Expected discovery:
Success criteria:
Fallback explanation:
```

The fallback explanation is important.

The lesson must remain understandable if the interactive component fails to load.

---

# 14. Phase 12 — Generate Worked Examples

For quantitative concepts:

```text
Example title:

Problem:

Given:

Find:

Concept:

Formula:

Step 1:

Step 2:

Step 3:

Answer:

Interpretation:

Common mistake:
```

Examples should progress in difficulty.

A recommended progression:

```text
Example 1 → direct application
Example 2 → requires interpretation
Example 3 → multi-step
Example 4 → exam-style
```

Not every topic needs four examples.

---

# 15. Phase 13 — Generate Misconceptions

For each major concept, attempt to identify likely incorrect mental models.

Format:

```text
Misconception:
Why it seems reasonable:
Correct understanding:
Quick way to remember/distinguish:
```

Example:

```text
Misconception:
Mass and weight are the same thing.

Why it seems reasonable:
Both are often described as how "heavy" something is.

Correct understanding:
Mass measures inertia and is measured in kg.
Weight is a gravitational force and is measured in N.
```

---

# 16. Phase 14 — Generate Practice

Practice should reflect the learning objectives.

For each question:

```json
{
  "question": "",
  "type": "",
  "difficulty": "",
  "learning_objective": "",
  "answer": "",
  "solution": "",
  "common_mistake": ""
}
```

Recommended question types:

```text
multiple_choice
multiple_select
true_false
numerical
short_answer
matching
ordering
proof
derivation
conceptual
```

Do not generate questions that test information never taught.

---

# 17. Phase 15 — Generate Deep Dive Content

Only create a Deep Dive when it provides additional intellectual value.

Good Deep Dive topics:

- Derivations
- Why a formula works
- Historical development when relevant
- Edge cases
- Limitations of a model
- Connections to other topics
- More advanced applications
- Alternative solution methods

Do not put essential information exclusively inside a Deep Dive.

---

# 18. Phase 16 — Decide What Belongs in PDF

PDF should generally contain a curated collection of:

```text
Chapter summary
+
Definitions
+
Important formulas
+
Diagrams
+
Worked examples
+
Common mistakes
+
Practice questions
```

Do not simply dump the entire website into a PDF.

A good PDF should feel like a deliberately designed study document.

Potential PDF variants:

```text
Quick Revision Sheet
Chapter Notes
Formula Sheet
Exam Review
Complete Study Guide
```

---

# 19. Phase 17 — Content Validation

Before implementation, perform three separate checks.

## A. Factual validation

Check:

- Scientific accuracy
- Mathematical accuracy
- Terminology
- Units
- Formula correctness
- Chemical equations
- Biological mechanisms
- Definitions

## B. Pedagogical validation

Check:

- Prerequisites
- Logical progression
- Cognitive load
- Examples
- Misconceptions
- Learning objectives
- Practice alignment

## C. Presentation validation

Check:

- Is the chosen format appropriate?
- Is the interactive worth building?
- Could a diagram replace a long paragraph?
- Is the content too dense?
- Should something be moved into a Deep Dive?
- Would a PDF provide additional value?

---

# 20. Source and Verification Policy

For factual content:

1. Prefer authoritative sources.
2. Prefer primary or institutional sources for scientific claims.
3. Prefer established textbooks/reference works for foundational theory.
4. Do not invent citations.
5. Clearly flag uncertain or curriculum-dependent claims.

When external research is necessary, preserve the source information with the content rather than relying on memory alone.

For formulas, independently verify derivations where practical.

---

# 21. Content Generation Output

For a complete topic, aim for the following conceptual structure:

```text
Topic Metadata
│
├── Learning Objectives
├── Prerequisites
├── Quick Summary
├── Core Concepts
├── Definitions
├── Visual Explanations
├── Formulas / Rules
├── Worked Examples
├── Common Misconceptions
├── Deep Dive
├── Interactive Specifications
├── Practice Questions
├── Key Takeaways
└── Related Topics
```

Not every node needs to contain content.

---

# 22. Suggested Data Model

Adapt to the existing application architecture, but conceptually use:

```json
{
  "id": "",
  "subject": "",
  "level": "",
  "chapter": "",
  "topic": "",
  "subtopic": "",

  "metadata": {
    "difficulty": "",
    "importance": "",
    "estimated_minutes": 0
  },

  "learning_objectives": [],

  "prerequisites": [],

  "quick_summary": [],

  "sections": [],

  "definitions": [],

  "formulas": [],

  "examples": [],

  "visuals": [],

  "interactive": [],

  "misconceptions": [],

  "deep_dive": [],

  "practice": [],

  "key_takeaways": [],

  "related_topics": []
}
```

The data model should remain presentation-independent.

---

# 23. Batch Generation Strategy

When generating a large curriculum, never generate everything at once.

Use batches:

```text
Batch 1:
Curriculum mapping

Batch 2:
Learning objectives + dependencies

Batch 3:
Content specifications

Batch 4:
Core content

Batch 5:
Examples + misconceptions

Batch 6:
Practice

Batch 7:
Interactive specifications

Batch 8:
Deep dives / PDFs

Batch 9:
Quality control

Batch 10:
Implementation
```

After each major batch, inspect quality before continuing.

This prevents errors from propagating through hundreds of topics.

---

# 24. Content IDs

Every topic should have a stable ID.

Prefer:

```text
physics-mechanics-newtons-laws
chemistry-chemical-bonding-vsepr
biology-cell-structure-mitochondria
math-algebra-quadratic-functions
```

Do not use unstable IDs based solely on array positions.

Stable IDs are important for:

- URLs
- Search
- Analytics
- Bookmarks
- Cross-references
- Practice history
- Future database migration

---

# 25. Cross-References

Whenever a topic depends on or connects to another topic, create an explicit relationship.

Examples:

```json
{
  "related_topics": [
    {
      "id": "physics-forces",
      "relationship": "prerequisite"
    },
    {
      "id": "physics-energy",
      "relationship": "related"
    }
  ]
}
```

Possible relationship types:

```text
prerequisite
builds_on
related
application
extension
contrast
```

---

# 26. AI Review Prompt Pattern

After generating a topic, internally review it using:

```text
ROLE:
You are a rigorous high-school science/math curriculum reviewer.

TASK:
Audit this lesson for correctness, pedagogy, completeness, and presentation.

CHECK:
1. Factual correctness
2. Mathematical/scientific correctness
3. Missing prerequisites
4. Misconceptions
5. Unsupported claims
6. Incorrect formulas
7. Ambiguous language
8. Excessive simplification
9. Poor examples
10. Poor interactive recommendations
11. Missing learning objectives
12. Practice alignment

OUTPUT:
- Critical errors
- Important improvements
- Minor improvements
- Approved elements
```

Do not silently ignore critical errors.

---

# 27. Human Review Checkpoints

The user should review content at high-impact stages:

### Checkpoint 1

Curriculum map.

### Checkpoint 2

Presentation strategy.

### Checkpoint 3

First sample chapter.

### Checkpoint 4

Interactive component strategy.

### Checkpoint 5

Content quality after batch generation.

The first complete chapter should serve as the **gold-standard reference** for later AI generation.

---

# 28. Gold-Standard Chapter

Before mass generation, create one excellent chapter manually/with AI.

Use it to establish:

- Writing style
- Content depth
- Section structure
- Visual density
- Example difficulty
- Question difficulty
- Interactive philosophy
- Terminology
- Tone

Then use the chapter as a reference for subsequent generation.

Do not assume the first AI output is the standard.

---

# 29. Definition of Done

A topic is considered production-ready only when:

```text
[ ] Correct curriculum placement
[ ] Clear learning objectives
[ ] Prerequisites identified
[ ] Appropriate difficulty
[ ] Quick summary
[ ] Accurate core explanation
[ ] Important definitions
[ ] Correct formulas/rules
[ ] At least one example where appropriate
[ ] Misconceptions considered
[ ] Appropriate visuals considered
[ ] Interactive opportunity evaluated
[ ] Deep Dive evaluated
[ ] PDF value evaluated
[ ] Practice questions aligned
[ ] Content quality checked
[ ] Stable ID assigned
[ ] Related topics mapped
```

---

# 30. Default Execution Behavior

When the user says:

> "Generate this chapter."

Do:

```text
1. Inspect existing project.
2. Locate the curriculum entry.
3. Map the chapter.
4. Identify prerequisites.
5. Create learning objectives.
6. Evaluate presentation formats.
7. Show high-impact design decisions if necessary.
8. Generate content.
9. Validate content.
10. Implement using existing components.
11. Test rendering.
12. Report what was created and any decisions that require user input.
```

When the user says:

> "Generate the whole curriculum."

Do NOT immediately generate the entire curriculum.

First:

```text
1. Parse the curriculum.
2. Build the complete topic map.
3. Identify dependencies.
4. Classify difficulty and importance.
5. Identify interactive opportunities.
6. Identify reading/deep-dive opportunities.
7. Identify PDF opportunities.
8. Propose generation batches.
9. Create one gold-standard chapter.
10. Get approval if major architectural/content decisions remain.
11. Then generate in controlled batches.
```

---

# 31. Core Principle

The AI should optimize for:

```text
Educational accuracy
        ↓
Student comprehension
        ↓
Curriculum coverage
        ↓
Effective practice
        ↓
Appropriate interactivity
        ↓
Maintainable implementation
        ↓
Visual polish
```

Never reverse this priority.

A simple explanation that teaches correctly is better than a technically impressive feature that teaches poorly.
