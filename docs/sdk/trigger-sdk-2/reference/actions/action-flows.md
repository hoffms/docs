---
id: action-flows
sidebar_position: 5
title: Action Flows
---

# Action Flows

> 🚧 **Under Construction**
>
> This documentation is currently being written. Action Flows allow you to create multi-step processes with conditional logic and user decisions.

Action Flows enable you to create complex, multi-step processes that can include conditional logic and user decisions. They're perfect for scenarios like token swaps, NFT minting, or any process that requires multiple steps.

## Example

```typescript
import { ActionFlow } from '@sherrylinks/sdk';

const swapFlow: ActionFlow = {
  type: 'flow',
  label: 'Token Swap Flow',
  initialActionId: 'approve-tokens',
  actions: [
    {
      id: 'approve-tokens',
      type: 'blockchain',
      label: 'Approve Tokens',
      address: '0xTokenAddress',
      abi: erc20Abi,
      functionName: 'approve',
      chains: { source: 'avalanche' },
      params: [
        /* ... */
      ],
      nextActions: [{ actionId: 'execute-swap' }],
    },
    {
      id: 'execute-swap',
      type: 'blockchain',
      label: 'Execute Swap',
      address: '0xDEXAddress',
      abi: dexAbi,
      functionName: 'swap',
      chains: { source: 'avalanche' },
      params: [
        /* ... */
      ],
      nextActions: [{ actionId: 'swap-complete' }],
    },
    {
      id: 'swap-complete',
      type: 'completion',
      label: 'Swap Complete',
      message: 'Your swap was successful!',
      status: 'success',
    },
  ],
};
```

Coming soon:
- Complete interface documentation
- Flow design patterns
- Conditional logic
- State management
- User interaction handling
- Best practices for complex flows 