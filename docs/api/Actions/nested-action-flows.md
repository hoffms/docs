---
id: nested-action-flows
sidebar_position: 4
title: Nested Action Flows
---

# Nested Action Flows (`ActionFlow`)

`ActionFlow` allows you to create interactive, multi-step experiences, guiding the user through a process that can include different action types, decisions, and conditional logic.

## `ActionFlow` Interface

```typescript
// src/interface/actions/flowAction.ts
export interface ActionFlow {
  type: 'flow'; // Action type identifier
  label: string; // Main label for the flow (e.g., "Advanced Swap")
  initialActionId: string; // ID of the first action to execute in the flow
  actions: NestedAction[]; // Array containing all actions that make up the flow
}
```

- `type`: Always `'flow'`.
- `label`: General label for the flow.
- `initialActionId`: The `id` of the `NestedAction` within the `actions` array that will start the flow.
- `actions`: An array containing all the individual actions that are part of the flow.

## Nested Actions (`NestedAction`)

Each step within an `ActionFlow` is a `NestedAction`. There are several types:

```typescript
// src/interface/actions/flowAction.ts

// Base for all nested actions
export interface NestedActionBase {
  id: string; // Unique identifier WITHIN the flow
  label: string; // Label for this specific step
  nextActions?: NextActionDefinition[]; // Defines which action(s) follow
}

// Blockchain Action within a flow
export interface NestedBlockchainAction
  extends Omit<BlockchainActionMetadata, 'label' | 'description'>,
    NestedActionBase {
  type: 'blockchain';
}

// Transfer Action within a flow
export interface NestedTransferAction extends Omit<TransferAction, 'label'>, NestedActionBase {
  type: 'transfer';
}

// HTTP Action within a flow
export interface NestedHttpAction extends Omit<HttpAction, 'label'>, NestedActionBase {
  type: 'http';
}

// Decision Action (user chooses a path)
export interface DecisionAction extends NestedActionBase {
  type: 'decision';
  title: string;
  description?: string;
  options: {
    label: string;
    value: string; // Value associated with the chosen option
    nextActionId: string; // ID of the next action for this option
  }[];
}

// Completion Action (end of a flow path)
export interface CompletionAction extends NestedActionBase {
  type: 'completion';
  message: string;
  status: 'success' | 'error' | 'info';
  // Does not have nextActions
}

// Union type for any nested action
export type NestedAction =
  | NestedBlockchainAction
  | NestedTransferAction
  | NestedHttpAction
  | CompletionAction
  | DecisionAction;
```

**Key Properties of `NestedActionBase`:**

- `id`: A **unique** identifier for this action _within the flow_. Used for navigation (`initialActionId`, `nextActionId`).
- `label`: Specific label for this step of the flow.
- `nextActions`: An array defining which action(s) should execute next after this one completes successfully.

## Navigation and Conditions (`nextActions`)

The `nextActions` property controls the flow.

```typescript
// src/interface/actions/flowAction.ts
export interface NextActionDefinition {
  actionId: string; // ID of the next action to execute
  conditions?: ActionCondition[]; // Optional conditions (all must be met)
}

export interface ActionCondition {
  field: string; // Field in the context to evaluate (e.g., 'lastResult.status', 'userInput.amount')
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains'; // Comparison operator
  value: any; // Value to compare against
}
```

- If a `NestedAction` (except `CompletionAction`) has a `nextActions` array:
  - If there's only one `NextActionDefinition` without `conditions`, navigate to that `actionId` upon success.
  - If there are multiple `NextActionDefinition`s, evaluate the `conditions` of each one in order. The first one whose conditions are met determines the next `actionId`.
  - If no conditions are met (and there's no condition-less definition at the end), the flow might end or be considered in an invalid state (depends on the executor implementation).
- `