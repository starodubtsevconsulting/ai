# Note Taking Workflow

## Purpose

Maintain an evolving user-owned note system: capture information with low friction, preserve original meaning, organize/connect it according to a selected strategy, make it retrievable, and periodically turn accumulated notes into useful knowledge or action.

## Strategic layer

The Workflow Strategist owns `WORKFLOW_STRATEGIC` continuity about the note system: selected method, capture rules, organization/linking conventions, review practices, recurring classification problems, retrieval lessons and changes to the system.

The notes themselves are user-owned authoritative artifacts and are not the Strategist's conversational memory.

The Strategist determines HOW the note system should operate. WHY note-taking deserves attention, WHEN review/maintenance should compete with other activities, and broader human goals belong to the Global Governor.

## Strategies

Different note-taking systems can produce substantially different flows. Example strategies live under [`strategies/`](strategies/):

- [`zettelkasten.md`](strategies/zettelkasten.md)
- [`para.md`](strategies/para.md)
- [`cornell.md`](strategies/cornell.md)
- [`custom-capture.md`](strategies/custom-capture.md)

The Strategist may select, combine or adapt them rather than forcing every note through one universal taxonomy.

## Candidate execution roles

Possible ephemeral `SESSION` roles include Capture Assistant, Classifier, Linker, Summarizer, Reviewer and Retrieval Assistant.

## Events and adaptive flow

Meaningful events may include note captured, source attached, note classified, connection discovered, review due, note promoted/distilled, task/project implication found, retrieval requested or archive decision.

The selected strategy determines how these events connect. For example, Zettelkasten emphasizes atomic notes and links, PARA emphasizes actionability/context, and a custom capture strategy may prioritize frictionless intake before later processing.

## Prompt routing / use cases

| Example prompt / intent | Route type | Route target | Result / notes |
| --- | --- | --- | --- |
|  |  |  |  |

## Connected commands

Commands are defined in the [AI Commands repository](https://github.com/starodubtsevconsulting/ai/tree/main/ai-commands).

| Command | Reference | Used by / purpose |
| --- | --- | --- |
| None yet | — | Commands will be connected as the workflow is implemented. |

## Artifact versus AI memory

This distinction is mandatory:

- notes/files are durable user artifacts and source material;
- `WORKFLOW_STRATEGIC` memory stores how the note-taking system itself should operate and what it has learned;
- execution agents use `SESSION` memory only.

AI indexes, embeddings or extracted metadata may improve retrieval but must not silently replace or mutate authoritative notes.

## Runtime boundary

The workflow is independent of a particular notes application, filesystem, database, model or harness. Runtime/profile configuration supplies storage locations, note applications, indexing/search tools and private conventions.