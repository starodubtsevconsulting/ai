# Workflow physical-scope live test

Use this scenario to prove that direct and proxied Agent execution receive and enforce the same profile/workflow-resolved
physical access scope.

## Setup

1. Create an isolated workflow instance with at least one allowed project root.
2. Record sanitized canonical roots and their configured read/write modes.
3. Start one direct Agent session and, when supported, one proxy-backed session using the same concrete Role.
4. Choose a harmless readable artifact inside scope and an explicit nonexistent or harmless path outside every allowed root.

Never use credentials, personal files or sensitive external paths as rejection fixtures.

## Expected behavior

For both execution paths:

- the inside-scope request succeeds subject to its configured access mode;
- the outside-scope request is rejected before filesystem work;
- the primary project determines the initial working directory without erasing other configured allowed roots;
- restarting or reconnecting the bridge does not broaden or lose the initialized scope;
- a scope rejection remains distinguishable from bridge, handshake and target-runtime failure;
- the rejection contains a sanitized, actionable boundary reason.

The proxied path must pass the resolved scope to the target during session initialization and independently validate an
explicit path before delegation. Prompt-only instructions are not sufficient enforcement.

## Passing evidence

PASS requires correlated receipts showing equivalent allowed and rejected outcomes for every exercised execution path,
with no access attempt outside configured roots and no disclosure of machine-specific paths beyond sanitized test evidence.
