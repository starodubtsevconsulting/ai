# Release Flow

Bounded flow for moving a verified software change toward an authorized release/deployment outcome.

## Intent examples

- “Let's release it.”
- “Prepare this for release.”
- “Deploy the approved change.”

## Shape

`release requested -> verify readiness/authorization -> prepare release -> execute permitted release actions -> verify outcome -> release completed`

Release may invoke connected commands, but workflow intent never bypasses runtime credentials, approvals or environment-specific safety boundaries.