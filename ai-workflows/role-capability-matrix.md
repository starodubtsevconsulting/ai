# Workflow role capability matrix template

The adjacent [role-capability-matrix.csv](role-capability-matrix.csv),
[role-capability-ownership.csv](role-capability-ownership.csv), and
[role-communication-matrix.csv](role-communication-matrix.csv) are empty reusable schemas. They grant no capability.

Each agent-enabled workflow copies all three schemas into its workflow-local agent directory. It fills the role matrix
with exact initialized roles and extends the ownership and communication headers with those role IDs before adding rows.
Every role contract links its readable top capability declaration to all three filled workflow-local matrices.

The readable declaration summarizes the effective boundary; the filled CSV files are the mechanical routing authority.
A missing link, empty workflow-local matrix, undeclared role, or declaration/matrix disagreement fails closed.

## Role-relationship communication compatibility

The following table is an authoritative compatibility ceiling, not a concrete communication grant. A workflow must
separately authorize the exact Agents, direction, capability, and packet type. `PERMITTED_IF_WORKFLOW_BOUND` means only
that a workflow may grant the narrower route. `RETURN_ONLY` carries evidence, a question, blocker, or terminal result to
the exact return identity and grants no reverse assignment authority. Missing relationships grant nothing.

| Sender relationship | Recipient relationship | Common compatibility | Maximum communication kind |
| --- | --- | --- | --- |
| Supervising Worker | Assigned Worker | PERMITTED_IF_WORKFLOW_BOUND | Bounded assignment or same-scope correction packet. |
| Assigned Worker | Supervising Worker | RETURN_ONLY | Evidence, clarification question, blocker, or terminal disposition. |
| Assigned Worker | Execution Worker | PERMITTED_IF_WORKFLOW_BOUND | Bounded implementation-mechanics packet. |
| Execution Worker | Packet return coordinator | RETURN_ONLY | Mechanical evidence, blocker, or terminal disposition. |
| Worker | Manager | PERMITTED_IF_WORKFLOW_BOUND | Workflow-authorized ticket, capability, staffing, or lifecycle request. |
| Manager | Exact requesting Worker | RETURN_ONLY | Requested ticket, capability, staffing, or lifecycle result. |
| Governed Agent | Judge | PROHIBITED | None. |
| Judge | Governed Agent | PROHIBITED | None. |
| Governed Agent | Admin | PROHIBITED | None. |
| Admin | Governed Agent | INITIALIZATION_ONLY | Exact human-directed initialization or lifecycle binding only. |

A workflow may narrow or prohibit a compatible row but must not broaden `RETURN_ONLY`, `INITIALIZATION_ONLY`, or
`PROHIBITED`. It must not convert a relationship into a universal Role-class route. Conflicts fail as
`BLOCKED_ROLE_COMMUNICATION_COMPATIBILITY`.
