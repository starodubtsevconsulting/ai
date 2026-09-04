# Spec-Driven Development (SDD)

## Purpose

Make an explicit specification the authoritative starting point for a software change so intent and expected behavior are defined before implementation drifts into accidental design.

## Core approach

- every meaningful change starts by creating or updating its specification;
- clarify intent, boundaries, behavior, constraints and acceptance expectations in the spec;
- review/resolve ambiguity at the specification level before relying on implementation to answer it;
- derive design, implementation and tests from the specification;
- when requirements change, update the specification first and then bring implementation/evidence back into alignment;
- preserve traceability between intent, implementation and verification.

## Effect on flows

SDD changes entry into [`implementation`](../flows/implementation.md): implementation should not proceed until the relevant specification is sufficiently defined for the requested scope. Testing/review should evaluate the implementation against that specification.

Conceptually:

`intent/change -> specification -> review/clarify -> design/implementation -> verification against spec -> update spec when intent changes`

SDD may be combined with DDD and TDD. For example, domain understanding can shape the specification, while tests can provide executable evidence that the implementation satisfies it.