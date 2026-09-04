# Implementation Flow

Bounded flow for implementing a software change inside the Software Development workflow.

## Intent examples

- “Let's code this.”
- “Implement this change.”
- “Build this feature.”

## Shape

The concrete sequence is strategy-dependent. A TDD strategy may begin with tests; a prototype-first strategy may begin with a thin implementation. Typical participating responsibilities may include design, implementation, testing and review.

Conceptually:

`implementation requested -> strategy/context check -> implementation work -> verification -> review -> implementation completed`

Roles and commands are selected by the workflow/runtime according to authorization and the active strategy.