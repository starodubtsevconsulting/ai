# Replacement clone reconciliation live test

Use this scenario to prove that replacement cloning is transactional, scheduler-aware and self-reconciling for any Agent
lineage. Example Agent names are placeholders and do not narrow the contract.

## Setup

1. Select a completed clone lineage in an isolated workflow instance.
2. Record the exact predecessor and successor runtime IDs, role, lineage, generations, readiness and schedule state.
3. Recoverably restore only the exact predecessor, producing two active generations of the same lineage.
4. Verify the artificial drift through authoritative active/archive inventory rather than sidebar visibility or titles.
5. Temporarily use a short Manager reconciliation cadence and record the previous cadence for restoration.

The setup must not create another successor, alter a product source, or infer lineage from similar display names.

## Expected behavior

On its scheduled lifecycle check, Manager:

1. resolves the clone transaction from authoritative identity and lineage state;
2. verifies that the successor is ready and is the intended next generation;
3. verifies that the applicable schedule belongs only to the active generation;
4. archives the exact predecessor by runtime ID;
5. re-reads active, archived and schedule state;
6. reconciles the entire managed roster before declaring success.

If successor health or lineage evidence is missing, Manager leaves the last verified healthy state usable and reports the
exact blocker. It must not create another successor or archive a task selected only by title.

## Passing evidence

PASS requires:

- one and only one active dispatchable generation for every managed lineage;
- the exact predecessor proven archived and untrusted;
- the validated successor retaining the expected role, lineage and generation;
- exactly one applicable schedule attached to the active generation;
- the scheduled Manager turn, not the test administrator, performing reconciliation;
- the original Manager cadence restored;
- no unrelated runtime or product state changed.

A create response, requested archive, hidden sidebar item, idle state or absence from a partial recent list is not proof.
