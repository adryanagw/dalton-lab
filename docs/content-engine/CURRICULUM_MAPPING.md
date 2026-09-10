# CURRICULUM_MAPPING.md

## Purpose

This document defines how Claude should read a raw curriculum from Notion and transform it into a structured, canonical curriculum map before generating educational content.

This is an **ingestion and curriculum-architecture layer**.

It does NOT generate the full educational material.

The workflow is:

```text
NOTION CURRICULUM
      ↓
CURRICULUM INGESTION
      ↓
RAW CURRICULUM SNAPSHOT
      ↓
NORMALIZATION
      ↓
CURRICULUM MAP
      ↓
CONTENT MANIFEST
      ↓
USER REVIEW / APPROVAL
      ↓
CONTENT GENERATION
```

The goal is to prevent the AI from repeatedly interpreting the same curriculum differently when generating hundreds of topics.

---

# 1. Source of Truth

The user's Notion curriculum is the initial source of truth.

The expected Notion table contains at least:

| Column | Meaning |
|---|---|
| Chapter name | Chapter/unit name supplied by the curriculum |
| Class / Level | Grade level, expected values such as 10, 11, 12 |
| All topic covered | Topics that must be covered within that chapter |

The Notion table may contain additional columns. Claude should preserve and inspect them rather than ignoring them.

## Critical rule

**Never silently rewrite, delete, merge, split, or invent curriculum requirements.**

Claude may normalize the structure, but every interpretation that changes the source curriculum must be traceable.

Use these concepts separately:

1. **Source Curriculum** — exactly what exists in Notion.
2. **Normalized Curriculum** — a clearer structural representation of the source.
3. **Proposed Changes** — AI suggestions such as splitting an overly broad topic or merging duplicates.
4. **Approved Curriculum Map** — the structure approved by the user.

The user remains the final authority.

---

# 2. What Claude Must Do

When asked to map the curriculum, Claude should:

1. Read the Notion curriculum.
2. Inspect all relevant columns.
3. Preserve the raw curriculum.
4. Identify the subject when available.
5. Group content by class/level.
6. Identify chapters.
7. Parse the topics contained in each chapter.
8. Normalize inconsistent naming.
9. Detect duplicates and near-duplicates.
10. Detect topics that are too broad.
11. Propose useful subtopics where appropriate.
12. Identify prerequisites and topic dependencies.
13. Classify importance.
14. Classify difficulty.
15. Recommend an appropriate learning representation.
16. Create stable IDs.
17. Produce a curriculum map.
18. Produce a content manifest.
19. Produce an audit trail showing how the source was transformed.
20. Stop for user approval before generating the actual educational content.

---

# 3. Do NOT Generate Content During Mapping

This phase should NOT produce:

- full explanations
- long textbook sections
- complete worked examples
- large question banks
- finished PDF content
- production-ready interactive components

It may produce short descriptions needed to explain the mapping, but the objective is structural planning.

Example:

```text
Newton's Laws
→ Core concept: relationship between force and acceleration
→ Difficulty: Intermediate
→ Interactive: Recommended
→ Deep dive: Recommended
```

This is acceptable.

A full lesson about Newton's Laws belongs to the content-generation phase.

---

# 4. Step 1 — Read the Notion Database

When the user says to map the curriculum, first inspect the connected Notion source.

Do not assume the database is perfectly structured.

Look for:

- database/table name
- available columns
- row count
- subject
- class/level
- chapter
- topic lists
- descriptions
- tags
- existing ordering
- duplicate rows
- empty fields

If the Notion source is ambiguous or incomplete, flag the issue.

Do not fabricate missing curriculum information.

---

# 5. Step 2 — Create a Raw Curriculum Snapshot

Before normalization, create a representation of what was actually found.

Example:

```yaml
source:
  platform: notion
  database: "High School Curriculum"

rows:
  - source_row_id: "notion-row-001"
    chapter_name: "Kinematics"
    class_level: 10
    topics:
      - "Position"
      - "Displacement"
      - "Velocity"
      - "Acceleration"
```

The raw snapshot should preserve the source wording.

This makes later auditing possible.

---

# 6. Step 3 — Normalize the Hierarchy

The preferred hierarchy is:

```text
Subject
└── Class / Level
    └── Chapter
        └── Topic
            └── Subtopic
                └── Concept
                    └── Example
                    └── Practice
```

Not every level must contain all lower levels.

For example:

```text
Physics
└── Class 10
    └── Mechanics
        └── Kinematics
            ├── Position
            ├── Distance and displacement
            ├── Speed and velocity
            └── Acceleration
```

The Notion structure does not need to match this hierarchy perfectly.

Claude's job is to map the source into this hierarchy while preserving traceability.

---

# 7. Chapter vs Topic vs Subtopic

Use the following rules.

## Chapter

A major learning unit that can reasonably contain several related topics.

Examples:

- Mechanics
- Thermodynamics
- Chemical Bonding
- Genetics
- Algebra
- Calculus

## Topic

A coherent concept or learning unit that deserves its own lesson/page.

Examples:

- Newton's Laws
- Quadratic Functions
- Stoichiometry
- Cell Division

## Subtopic

A meaningful component of a topic.

Examples:

```text
Newton's Laws
├── First Law
├── Second Law
├── Third Law
├── Free-body diagrams
└── Applications
```

Do NOT create excessive fragmentation.

Bad:

```text
Newton's Second Law
├── Force
├── Mass
├── Acceleration
├── F
├── m
├── a
```

These are usually concepts inside one topic, not separate lessons.

---

# 8. Broad Topic Detection

Claude should identify topics that are too broad to function well as a single educational page.

For example:

```text
"Mechanics"
```

may be too broad.

A proposal could be:

```text
Mechanics
├── Kinematics
├── Newton's Laws
├── Work and Energy
├── Momentum
└── Circular Motion
```

However, this must be marked as a proposal.

Example:

```yaml
proposal:
  type: split_topic
  source_topic: "Mechanics"
  proposed_topics:
    - "Kinematics"
    - "Newton's Laws"
    - "Work and Energy"
    - "Momentum"
  status: "needs_approval"
```

Never silently replace the source topic.

---

# 9. Duplicate Detection

Detect:

### Exact duplicates

Example:

```text
Quadratic Equations
Quadratic Equations
```

### Naming duplicates

Example:

```text
Newton Law
Newton's Laws
Newton's Law
```

### Semantic duplicates

Example:

```text
Linear Equation
Equations of a Straight Line
```

Claude should not automatically merge them.

Instead:

```yaml
duplicate_candidate:
  source_topics:
    - "Newton Law"
    - "Newton's Laws"
  recommendation: "merge"
  reason: "Likely the same curriculum concept"
  status: "needs_approval"
```

---

# 10. Naming Normalization

Normalize terminology for consistency.

Example:

```text
Source:
"newton law"

Normalized:
"Newton's Laws"
```

But preserve:

```text
source_topic: "newton law"
normalized_topic: "Newton's Laws"
```

Do not lose the original wording.

Use standard scientific/mathematical terminology where the intended meaning is unambiguous.

If meaning is uncertain, flag it instead of guessing.

---

# 11. Class / Level Validation

Expected values may include:

```text
10
11
12
```

Also recognize reasonable variants:

```text
Grade 10
Class 10
Kelas 10
X
10th Grade
```

Normalize them to:

```yaml
class_level: 10
```

Preserve the original:

```yaml
source_class_level: "X"
```

Flag:

- missing class
- invalid class
- inconsistent class assignment
- topic appearing unexpectedly across levels
- possible prerequisite violations

Do not move a topic between classes without proposing the change.

---

# 12. Subject Detection

If the Notion table explicitly contains a subject field, use it.

Expected subjects may include:

```text
Physics
Chemistry
Biology
Mathematics
```

If subject is not explicitly present, infer it only when the table/database context makes it unambiguous.

If the subject cannot be determined confidently, ask the user or mark:

```yaml
subject_status: "ambiguous"
```

Never invent a subject.

---

# 13. Topic Dependencies

Create a prerequisite graph.

Example:

```text
Algebra
  ↓
Functions
  ↓
Quadratic Functions
  ↓
Quadratic Equations
```

For physics:

```text
Vectors
  ↓
Kinematics
  ↓
Newton's Laws
  ↓
Work and Energy
```

For chemistry:

```text
Atomic Structure
  ↓
Periodic Table
  ↓
Chemical Bonding
  ↓
Molecular Structure
```

Prerequisites should represent genuine learning dependencies, not merely topics that are related.

Use:

```yaml
prerequisites:
  - "physics-10-mechanics-vectors"
```

If uncertain, mark the dependency as a recommendation rather than a fact.

---

# 14. Importance Classification

Every topic should receive one of:

```text
Essential
Important
Supporting
Enrichment
```

## Essential

Core knowledge required for later learning or major curriculum outcomes.

## Important

Frequently useful or significant knowledge, but not necessarily foundational.

## Supporting

Helpful concepts that support understanding.

## Enrichment

Optional/deeper material beyond the essential learning path.

Importance is an AI recommendation and may be reviewed by the user.

---

# 15. Difficulty Classification

Use:

```text
Foundation
Basic
Intermediate
Advanced
Exam-level
```

Difficulty should reflect the conceptual and problem-solving difficulty for the intended class.

Do not equate:

```text
long explanation = advanced
```

A topic may be conceptually simple but require extensive explanation.

---

# 16. Learning Representation Recommendation

For every topic, recommend how it should be presented.

Possible formats:

```text
web_summary
interactive
diagram
animation
step_by_step
worked_example
table
timeline
simulation
practice
deep_dive
pdf
```

Use pedagogical value, not novelty, to decide.

## Use interactive content when:

- variables change
- cause-and-effect relationships are important
- graphs can move dynamically
- students benefit from experimentation
- spatial relationships matter
- simulation improves understanding

Examples:

```text
Physics:
- projectile motion
- wave behavior
- force and acceleration

Math:
- function transformations
- graphing
- probability simulations

Chemistry:
- molecular geometry
- particle models
- concentration changes
```

## Use reading when:

- reasoning is sequential
- derivation is important
- conceptual nuance matters
- the material is too dense for interaction
- students need sustained explanation

## Use diagrams when:

- structure is the main idea
- spatial relationships matter
- processes are easier to visualize

## Use step-by-step explanations when:

- solving equations
- balancing reactions
- calculating quantities
- applying algorithms

## Use PDF when:

- students need printable notes
- revision sheets are useful
- long-form chapter notes are valuable
- formulas need a compact reference
- exam review benefits from offline reading

Important:

**PDF is not the default destination for advanced topics.**

Advanced topics can still live on the website as long-form content.

---

# 17. Presentation Planning Schema

Each topic should receive a recommendation similar to:

```yaml
content_plan:
  summary: true
  main_explanation: true
  visual: true
  interactive: false
  worked_example: true
  practice: true
  deep_dive: true
  pdf: true
```

These are recommendations, not implementation requirements.

---

# 18. Interactive Complexity

For interactive recommendations, score:

```text
pedagogical_value: 1-5
implementation_complexity: 1-5
```

Example:

```yaml
interactive_recommendation:
  component: "Interactive Graph"
  pedagogical_value: 5
  implementation_complexity: 2
  recommendation: "high_priority"
```

Prioritize:

```text
High pedagogical value
+
Low/medium implementation complexity
```

Avoid building complicated interactions that add little learning value.

---

# 19. Stable IDs

Every normalized curriculum item should receive a stable ID.

Recommended format:

```text
<subject>-<class>-<chapter>-<topic>
```

Example:

```text
physics-10-mechanics-kinematics
physics-10-mechanics-newtons-laws
chemistry-11-chemical-bonding-molecular-geometry
biology-12-genetics-mendelian-inheritance
mathematics-10-algebra-quadratic-functions
```

IDs should:

- be lowercase
- use hyphens
- be deterministic
- remain stable after content generation
- not depend on row position

If the name changes, preserve the ID whenever the underlying concept remains the same.

---

# 20. Curriculum Map Schema

The normalized curriculum should conceptually follow:

```yaml
subject:
  name: "Physics"

classes:
  - level: 10

    chapters:
      - id: "physics-10-mechanics"
        name: "Mechanics"

        topics:
          - id: "physics-10-mechanics-kinematics"
            name: "Kinematics"
            source_topic: "Kinematics"

            subtopics:
              - "Position and displacement"
              - "Speed and velocity"
              - "Acceleration"

            prerequisites:
              - "physics-10-mechanics-vectors"

            difficulty: "Basic"
            importance: "Essential"

            presentation:
              web_summary: true
              interactive: true
              diagram: true
              worked_example: true
              practice: true
              deep_dive: true
              pdf: true

            status: "approved"
```

---

# 21. Content Manifest

After the curriculum map is created, create a content manifest.

The manifest is the bridge between curriculum architecture and content generation.

Example:

```yaml
- id: "physics-10-mechanics-newtons-laws"

  subject: "Physics"
  class_level: 10
  chapter: "Mechanics"
  topic: "Newton's Laws"

  source:
    source_topic: "Newton's Laws"
    source_row_id: "notion-row-123"

  prerequisites:
    - "physics-10-mechanics-vectors"

  difficulty: "Intermediate"
  importance: "Essential"

  learning_objectives:
    - "Explain Newton's three laws"
    - "Identify forces acting on an object"
    - "Apply Newton's second law to simple problems"

  content_plan:
    summary: true
    main_explanation: true
    visual: true
    interactive: true
    worked_example: true
    misconceptions: true
    practice: true
    deep_dive: true
    pdf: true

  interactive:
    recommended_component: "Free-body diagram / force simulation"
    pedagogical_value: 5
    implementation_complexity: 3

  status: "needs_approval"
```

The learning objectives here are planning-level objectives, not the full lesson.

---

# 22. Audit Trail

Every structural change must be traceable.

Use a table such as:

| Source | Normalized | Change Type | Reason | Status |
|---|---|---|---|---|
| Newton Law | Newton's Laws | Naming normalization | Standard terminology | Auto |
| Mechanics | Mechanics → Kinematics + Newton's Laws + ... | Split proposal | Source topic too broad | Needs approval |
| Quadratic Equation | Quadratic Equations | Naming normalization | Grammar/terminology | Auto |

Possible change types:

```text
naming_normalization
topic_split
topic_merge
duplicate_detection
class_normalization
subject_inference
prerequisite_inference
importance_classification
difficulty_classification
presentation_recommendation
```

Never hide substantive changes.

---

# 23. Confidence Levels

When making interpretations, assign confidence:

```text
high
medium
low
```

Example:

```yaml
subject_inference:
  value: "Physics"
  confidence: "high"
```

If confidence is low and the decision materially affects the curriculum, ask the user rather than proceeding silently.

---

# 24. Validation Checks

Before presenting the mapping, run these checks.

## Structural

- Are all Notion rows represented?
- Does every topic have a parent chapter?
- Does every chapter have a class?
- Are IDs unique?
- Are empty topics detected?

## Curriculum integrity

- Were any source topics deleted?
- Were any topics silently merged?
- Were any topics silently split?
- Were any topics invented?
- Were any class levels changed?

## Duplicate checks

- Exact duplicates
- Naming duplicates
- Semantic duplicates

## Dependency checks

- Circular dependencies
- Missing prerequisites
- Topic taught before prerequisite
- Suspicious class-level placement

## Content planning

- Does every topic have a difficulty?
- Does every topic have an importance classification?
- Does every topic have a presentation recommendation?
- Are interactive recommendations pedagogically justified?

---

# 25. Output Format for Curriculum Mapping

When mapping is complete, Claude should produce:

## A. Executive Summary

Example:

```text
Curriculum contains:

Physics:
- Class 10: 8 chapters, 47 topics
- Class 11: 7 chapters, 42 topics
- Class 12: 6 chapters, 39 topics

Chemistry:
...

Biology:
...

Mathematics:
...
```

## B. Curriculum Tree

Show:

```text
Physics
├── Class 10
│   ├── Mechanics
│   │   ├── Kinematics
│   │   ├── Newton's Laws
│   │   └── Work and Energy
│   └── ...
```

## C. Proposed Changes

Show only changes requiring attention.

## D. Curriculum Map

Show the normalized structure.

## E. Content Manifest

Show what should eventually be generated.

## F. Audit Report

Show source-to-normalized transformations.

## G. Questions / Ambiguities

Only ask questions that materially affect the architecture.

---

# 26. Approval Workflow

Do NOT immediately generate all educational content after mapping.

Use:

```text
NOTION
  ↓
MAPPING
  ↓
REVIEW
  ↓
APPROVAL
  ↓
CONTENT GENERATION
```

The user should be able to approve:

### Option A — Approve all

```text
Approve mapping
```

### Option B — Approve selected changes

```text
Approve:
- naming normalization
- class normalization

Reject:
- proposed topic split
```

### Option C — Request revision

```text
Revise the mapping:
- merge X and Y
- split Z
- move topic A to chapter B
```

Only after approval should the mapping become the canonical curriculum map.

---

# 27. Recommended Project Files

The architecture should remain separated:

```text
CLAUDE.md
    ↓
Permanent project principles

CURRICULUM_MAPPING.md
    ↓
Notion → canonical curriculum map

CONTENT_GENERATION.md
    ↓
Canonical curriculum → educational content
```

Responsibilities:

### CLAUDE.md

Defines:

- project goals
- AI role
- content philosophy
- canonical content principles
- UI/content separation
- quality standards

### CURRICULUM_MAPPING.md

Defines:

- Notion ingestion
- curriculum parsing
- normalization
- hierarchy
- dependencies
- mapping
- manifest
- audit trail
- approval

### CONTENT_GENERATION.md

Defines:

- lesson generation
- explanations
- examples
- practice
- interactive specifications
- deep dives
- PDF planning
- quality control

Do not duplicate large sections across these files.

---

# 28. Claude Commands

Claude should understand these commands.

## "Map curriculum"

Action:

1. Read the Notion curriculum.
2. Create the raw snapshot.
3. Normalize the hierarchy.
4. Detect issues.
5. Generate the curriculum map.
6. Generate the content manifest.
7. Generate the audit report.
8. STOP before content generation.

## "Review mapping"

Action:

Review:

- missing topics
- duplicates
- questionable splits
- questionable merges
- prerequisites
- class assignments
- difficulty
- importance
- presentation recommendations

Do not generate lessons.

## "Approve mapping"

Action:

1. Mark approved structural decisions.
2. Freeze the approved curriculum map.
3. Treat it as the canonical source for content generation.

## "Generate chapter: [chapter]"

Action:

1. Read the approved curriculum map.
2. Read CONTENT_GENERATION.md.
3. Generate only the requested chapter.
4. Follow the manifest.
5. Run quality checks.
6. Do not modify the curriculum structure unless explicitly asked.

## "Generate topic: [topic]"

Action:

Generate only that topic using the approved manifest.

## "Regenerate topic: [topic]"

Action:

Regenerate content while preserving:

- topic ID
- curriculum placement
- learning objectives unless explicitly changed
- prerequisite relationships

---

# 29. Batch Strategy

Do not generate the entire curriculum blindly in one pass.

Recommended process:

```text
1. Map entire curriculum
2. Review entire map
3. Approve structure
4. Select one representative chapter
5. Generate that chapter
6. Review quality
7. Refine generation rules if necessary
8. Generate remaining chapters in batches
9. Run global consistency checks
```

A good first chapter should contain:

- simple concepts
- moderately difficult concepts
- at least one useful interactive opportunity
- worked examples
- practice questions
- at least one deeper concept

This creates a "gold-standard chapter" for the rest of the curriculum.

---

# 30. Important AI Behavior

Claude should act as:

- curriculum architect
- subject matter expert
- instructional designer
- content editor
- learning-experience designer
- assessment designer
- quality controller

But Claude must distinguish between:

```text
FACT
INFERENCE
RECOMMENDATION
```

For example:

```text
FACT:
The Notion curriculum contains "Newton Law".

INFERENCE:
This likely refers to Newton's Laws.

RECOMMENDATION:
Normalize the name to "Newton's Laws".
```

This distinction is essential.

---

# 31. Do Not Over-Engineer the Curriculum

The mapping process should improve structure, not create unnecessary complexity.

Avoid:

- hundreds of tiny subtopics
- unnecessary topic splitting
- excessive prerequisite graphs
- unique UI components for every topic
- making every topic interactive
- converting every advanced topic into PDF
- rewriting the curriculum based on AI preference

The objective is a maintainable learning system.

---

# 32. Final Principle

The complete architecture should follow:

```text
NOTION CURRICULUM
       ↓
RAW SOURCE
       ↓
NORMALIZED CURRICULUM
       ↓
APPROVED CURRICULUM MAP
       ↓
CONTENT MANIFEST
       ↓
CANONICAL EDUCATIONAL CONTENT
       ↓
 ┌──────────────┬──────────────┬──────────────┐
 │              │              │              │
WEB LESSON   INTERACTIVE     PDF          PRACTICE
```

The curriculum should be mapped **once** and then reused by every downstream system.

The AI should never need to reinterpret the original Notion curriculum independently every time it generates content.

The canonical curriculum map is the bridge between the user's curriculum and the educational product.
