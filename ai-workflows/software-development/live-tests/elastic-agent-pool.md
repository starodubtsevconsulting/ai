# Elastic Agent Pool live test

Use this scenario to prove that horizontal capacity remains distinct from replacement generations.

## Setup

1. Select an Agent whose workflow configuration enables Elastic Agent Pool.
2. Run in an isolated workflow instance with an idle baseline roster.
3. Record the baseline Agent ID, generation, title, configured maximum and minimum-ready policy.
4. Prepare several independent, non-product, zero-write assignments with unique correlation IDs and exact return tokens.

## Expected behavior

- Runtime creates or reuses separate pool members only for safely independent assignments.
- Every member retains the same replacement generation while displaying a distinct `[assignment]` label.
- Assignment labels are not interpreted as lineage or clone numbers.
- A request beyond configured active capacity is rejected without creating another member.
- Completed temporary members are returned to the ready pool or archived according to configured policy.
- The baseline ready capacity is restored after settlement.

## Passing evidence

PASS requires distinct runtime IDs at peak, completed destination-turn receipts for every accepted assignment, a capacity
rejection with no extra creation, and authoritative final inventory matching the configured ready baseline. Prompt text,
planned calls, copied return tokens or display titles alone are not execution evidence.
