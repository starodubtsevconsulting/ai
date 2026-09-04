# Domain-Driven Design (DDD)

## Purpose

Organize software design around a deep and continuously refined understanding of the business/domain rather than allowing technical structure alone to define the system.

## Core approach

- develop a shared/ubiquitous language with domain concepts expressed consistently in discussion, models and code;
- identify meaningful domain boundaries and bounded contexts;
- model important domain behavior explicitly;
- keep context boundaries and relationships visible;
- refine the model as domain understanding changes;
- distinguish core domain concerns from supporting/generic concerns when useful.

## Effect on flows

DDD can shape investigation, design and [`implementation`](../flows/implementation.md) by requiring domain language/boundaries to be understood before or during code changes. Review should check whether implementation preserves the intended domain model rather than only technical correctness.

Conceptually:

`domain understanding -> language/boundaries/model -> implementation -> evidence/feedback -> refined domain understanding`

DDD can coexist with TDD and SDD; these strategies address different dimensions of software development.