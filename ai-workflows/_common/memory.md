# Memory Model

Memory follows strategic scope. Roles do not all need the same persistence, breadth, or retrieval policy.

## Memory classes

### GLOBAL_STRATEGIC

Used by the Global Governor.

Rich, evidence-preserving, long-lived memory. Preserve enough original evidence to allow later reinterpretation rather than reducing everything immediately to extracted facts.

Suggested progression:

`raw evidence/events -> observations -> facts -> decisions + rationale -> outcomes -> learned principles`

Properties:
- effectively permanent external memory while relevant;
- broad cross-workflow scope;
- includes relevant human context, goals, assets, commitments and strategy history;
- strong semantic/temporal retrieval;
- conservative compression and forgetting;
- model context is only a retrieved/compiled working projection, never the complete memory.

### WORKFLOW_STRATEGIC

Used by Workflow Strategists.

Compact, distilled, workflow/domain-scoped durable memory. Optimize for inexpensive retrieval of what the workflow has learned.

Typical contents:
- facts and standards;
- decisions and rationale;
- outcomes and evidence;
- failed approaches;
- domain observations;
- learned principles.

Properties:
- persistent while the workflow/domain exists;
- narrow scope;
- more aggressive extraction, compilation and deduplication than GLOBAL_STRATEGIC;
- no private human model;
- produces compact projections for execution agents.

### SESSION

Used by execution roles such as Designer, Coder, Reviewer and Command Runner.

Ephemeral working context only. The agent has no permanent personal memory. It receives the task, workflow rules and relevant projections, performs the work, returns results/evidence, and may then disappear. Durable lessons flow upward into WORKFLOW_STRATEGIC memory rather than becoming the execution agent's identity.

## Implementation boundary

These are semantic requirements, not storage-product dependencies. A runtime may implement them using one or several memory systems.

Candidate implementations/patterns include Mem0, MemPalace, holographic/harness memory approaches, vector/semantic retrieval, structured stores, and durable source archives. The memory implementation must remain replaceable without changing role identity or workflow contracts.

The Global Governor should favor implementations capable of preserving rich historical evidence alongside derived memory. Workflow Strategists may favor more aggressively distilled fact/decision memory. SESSION memory normally requires no durable memory backend.