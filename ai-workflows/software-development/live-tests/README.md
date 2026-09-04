# Software Development live tests

These non-product scenarios validate runtime implementations of the reusable Software Development workflow contracts.
Run them only in an explicitly isolated, disposable workflow instance. They describe observable behavior and evidence;
they do not prescribe a particular application, provider, model, bridge or automation implementation.

## Scenarios

- [`clone-reconciliation.md`](clone-reconciliation.md) — replacement, schedule migration and stale-generation cleanup.
- [`elastic-agent-pool.md`](elastic-agent-pool.md) — horizontal capacity without confusing assignments and generations.
- [`physical-scope.md`](physical-scope.md) — equivalent filesystem boundaries for direct and proxied execution.

Every scenario must leave product files, source-control state, work trackers, deployments, credentials and unrelated Agent
tasks unchanged. Runtime task IDs and other test evidence may be retained in an audit record, but reusable files must not
contain machine-specific paths or private identifiers.
