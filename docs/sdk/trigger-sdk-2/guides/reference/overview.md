---
id: overview
sidebar_position: 1
title: Technical Reference
---

# Technical Reference

This section provides detailed technical documentation for the Sherry SDK. Each component is documented with its TypeScript interfaces, examples, and usage guidelines.

## Core Components

### Metadata
The foundation of every Sherry mini-app. Defines the app's identity, appearance, and available actions.

[View Metadata Documentation](./metadata.md)

### Actions
Different types of interactions that can be performed within a mini-app:

- [Blockchain Actions](./actions/blockchain-actions.md) - Smart contract interactions
- [Transfer Actions](./actions/transfer-actions.md) - Native token transfers
- [HTTP Actions](./actions/http-actions.md) - API calls and server interactions
- [Dynamic Actions](./actions/dynamic-actions.md) - Server-computed actions
- [Action Flows](./actions/action-flows.md) - Multi-step processes

### Parameters
User input configuration for actions:

- [Parameter Types](./parameters/parameter-types.md)
- [Parameter Templates](./parameters/parameter-templates.md)
- [Parameter Validation](./parameters/parameter-validation.md)

### Chains
Blockchain configuration and support:

- [Supported Chains](./chains.md)
- [Chain Context](./chains.md#chaincontext-interface)
- [Cross-Chain Actions](./chains.md#cross-chain-actions)

### Validation
Runtime validation and type checking:

- [Metadata Validation](./validation/metadata-validation.md)
- [Action Validation](./validation/action-validation.md)
- [Parameter Validation](./validation/parameter-validation.md)

## Type Definitions

All TypeScript interfaces and types are exported from the SDK package:

```typescript
import {
  Metadata,
  Action,
  Parameter,
  ChainContext,
  // ... other types
} from '@sherrylinks/sdk';
```

## Best Practices

- [Error Handling](./best-practices/error-handling.md)
- [Security Considerations](./best-practices/security.md)
- [Performance Optimization](./best-practices/performance.md)

## API Reference

For a complete list of exported functions and utilities, see the [API Reference](./api-reference.md).

