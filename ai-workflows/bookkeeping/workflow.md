# Bookkeeping Workflow

Reusable bookkeeping workflow and concrete example of a structured administrative/business activity.

## Composition

Bookkeeping selects reusable roles from `../_common/roles/` and specializes them for bookkeeping work. A workflow-level Strategist may own persistent Bookkeeping domain continuity. Execution roles remain ephemeral by default and receive only task-relevant projections of durable workflow memory.

## Local source-of-truth folders

Bookkeeping source documents should remain simple, local, inspectable files. The workflow can organize them primarily by year, direction/category, quarter, and optionally company/entity.

Example:

```text
bookkeeping-data/
  2026/
    in/
      q1/
        company-a/
          invoice-001.pdf
        company-b/
          receipt-001.pdf
      q2/
      q3/
      q4/
    out/
      q1/
        invoices/
          invoice-client-a-001.pdf
      q2/
      q3/
      q4/
    taxes/
      q1/
      q2/
      q3/
      q4/
```

The exact taxonomy is configurable. Examples include `in/` for incoming invoices/receipts/documents, `out/` for issued invoices or other outgoing bookkeeping documents, and `taxes/` for tax-related source material. Entity/company subfolders such as `company-a/` and `company-b/` may be introduced where useful.

Quarter names should be normalized consistently as `q1`, `q2`, `q3`, `q4` even when imported sources use variants such as `Q1` or `Q2`.

PDFs and other original documents remain authoritative artifacts. AI memory/indexes may extract facts, classify documents and make retrieval easier, but they must not replace or silently mutate the original source files.

## Workflow use of the folders

The bookkeeping workflow may watch/index these folders, classify newly added documents, detect missing/duplicate material, extract bounded financial facts, reconcile evidence, and prepare reports or work packets. Derived metadata should retain provenance back to the exact source file.

The Workflow Strategist's `WORKFLOW_STRATEGIC` memory stores durable bookkeeping decisions, classification rules, learned exceptions and outcomes rather than duplicating the complete document archive into conversational memory.

## Prompt routing / use cases

| Example prompt / intent | Route type | Route target | Result / notes |
| --- | --- | --- | --- |
|  |  |  |  |

## Connected commands

Commands are defined in the [AI Commands repository](https://github.com/starodubtsevconsulting/ai/tree/main/ai-commands).

| Command | Reference | Used by / purpose |
| --- | --- | --- |
| None yet | — | Commands will be connected as the workflow is implemented. |

## Boundary with accounting

Bookkeeping focuses on operational financial records: invoices, receipts, categorization, reconciliation, source-document organization and completeness. Higher-level accounting interpretation, financial statements, tax treatment, compliance and analysis may be represented by separate workflows that consume bookkeeping outputs.

## Runtime independence

The workflow does not bind itself to Hermes, OpenAI, a local model, or another harness/provider. Runtime/profile configuration realizes selected roles as concrete agents and supplies the configured local bookkeeping-data root.

## Privacy

Client/profile bindings, credentials, actual private financial documents, absolute local paths and organization-specific configuration do not belong in this public workflow definition. The folder tree above is a portable convention/example, not published financial data.