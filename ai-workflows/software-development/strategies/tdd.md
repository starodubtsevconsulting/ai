# Test-Driven Development (TDD)

## Purpose

Use executable tests to drive implementation in small feedback loops, making expected behavior explicit before or alongside production code.

## Core approach

- express the next required behavior as a failing test;
- implement the smallest coherent change that satisfies it;
- run tests and inspect evidence;
- refactor while preserving behavior;
- repeat in small increments.

A common shorthand is `red -> green -> refactor`, but the strategy is about using tests as a design/feedback mechanism rather than mechanically maximizing test count.

## Effect on flows

TDD most strongly shapes the [`implementation`](../flows/implementation.md) and [`testing`](../flows/testing.md) flows. Implementation may deliberately begin in Testing, loop through Implementation, then return to Testing before review.

Conceptually:

`behavior -> failing test -> implementation -> passing test -> refactor -> next behavior`

The Strategist may adapt test scope and loop size to the context while preserving the core feedback principle.