---
id: advanced-flows
sidebar_position: 3
title: Advanced Flows Guide
---

# Advanced Flows Guide

This guide demonstrates how to create complex action flows with conditional logic, dynamic actions, and error handling. You'll build a multi-chain token bridge mini-app that supports multiple chains and tokens.

## What You'll Build

A token bridge mini-app that:
- Supports multiple source and destination chains
- Handles token approvals and transfers
- Provides real-time bridge status updates
- Implements retry logic for failed transactions
- Includes fallback options for high gas prices

## Prerequisites

- Completed the [Basic Mini-App Guide](./basic-mini-app.md)
- Understanding of cross-chain bridges
- Familiarity with gas optimization
- Knowledge of token standards (ERC20, ERC721)

## Step 1: Project Setup

Create a new directory and install dependencies:

```bash
mkdir token-bridge-app
cd token-bridge-app
npm init -y
npm install @sherrylinks/sdk typescript @types/node express @types/express ethers@5.7.2 --save
npm install ts-node nodemon @types/express --save-dev
```

## Step 2: Define Chain Selection Action

Create `src/actions/chain-selection.ts`:

```typescript
import { HttpAction } from '@sherrylinks/sdk';

export const chainSelectionAction: HttpAction = {
  type: 'http',
  label: 'Select Chains',
  description: 'Choose source and destination chains',
  path: 'https://api.example.com/chains',
  params: [
    {
      name: 'sourceChain',
      type: 'select',
      label: 'Source Chain',
      options: [
        { label: 'Avalanche', value: 'avalanche' },
        { label: 'Ethereum', value: 'ethereum' },
        { label: 'Polygon', value: 'polygon' },
      ],
    },
    {
      name: 'destinationChain',
      type: 'select',
      label: 'Destination Chain',
      options: [
        { label: 'Avalanche', value: 'avalanche' },
        { label: 'Ethereum', value: 'ethereum' },
        { label: 'Polygon', value: 'polygon' },
      ],
    },
  ],
  nextActions: [
    {
      actionId: 'token-selection',
      conditions: [
        {
          field: 'params.sourceChain',
          operator: 'neq',
          value: 'params.destinationChain',
        },
      ],
    },
    {
      actionId: 'same-chain-error',
      conditions: [
        {
          field: 'params.sourceChain',
          operator: 'eq',
          value: 'params.destinationChain',
        },
      ],
    },
  ],
};
```

## Step 3: Create Token Selection Action

Create `src/actions/token-selection.ts`:

```typescript
import { DynamicAction } from '@sherrylinks/sdk';

export const tokenSelectionAction: DynamicAction = {
  type: 'dynamic',
  label: 'Select Token',
  description: 'Choose token to bridge',
  dynamicParams: {
    type: 'http',
    path: 'https://api.example.com/tokens',
    params: {
      chain: '${params.sourceChain}',
    },
  },
  nextActions: [
    {
      actionId: 'check-approval',
      conditions: [
        {
          field: 'lastResult.tokenType',
          operator: 'eq',
          value: 'erc20',
        },
      ],
    },
    {
      actionId: 'check-nft-approval',
      conditions: [
        {
          field: 'lastResult.tokenType',
          operator: 'eq',
          value: 'erc721',
        },
      ],
    },
  ],
};
```

## Step 4: Define Approval Check Action

Create `src/actions/approval-check.ts`:

```typescript
import { DecisionAction } from '@sherrylinks/sdk';

export const approvalCheckAction: DecisionAction = {
  type: 'decision',
  label: 'Check Approval',
  description: 'Verify token approval status',
  title: 'Approval Required',
  options: [
    {
      label: 'Approve',
      value: 'approve',
      nextActionId: 'approve-token',
    },
    {
      label: 'Skip',
      value: 'skip',
      nextActionId: 'check-gas',
      conditions: [
        {
          field: 'lastResult.isApproved',
          operator: 'eq',
          value: true,
        },
      ],
    },
  ],
};
```

## Step 5: Create Gas Check Action

Create `src/actions/gas-check.ts`:

```typescript
import { DecisionAction } from '@sherrylinks/sdk';

export const gasCheckAction: DecisionAction = {
  type: 'decision',
  label: 'Check Gas',
  description: 'Review current gas prices',
  title: 'Gas Price Check',
  options: [
    {
      label: 'Proceed',
      value: 'proceed',
      nextActionId: 'execute-bridge',
    },
    {
      label: 'Wait',
      value: 'wait',
      nextActionId: 'gas-wait',
      conditions: [
        {
          field: 'lastResult.gasPrice',
          operator: 'gt',
          value: 'lastResult.suggestedGasPrice',
        },
      ],
    },
    {
      label: 'Use Alternative Bridge',
      value: 'alternative',
      nextActionId: 'alternative-bridge',
      conditions: [
        {
          field: 'lastResult.gasPrice',
          operator: 'gt',
          value: 'lastResult.alternativeGasPrice',
        },
      ],
    },
  ],
};
```

## Step 6: Define Bridge Action

Create `src/actions/execute-bridge.ts`:

```typescript
import { BlockchainAction } from '@sherrylinks/sdk';

export const executeBridgeAction: BlockchainAction = {
  type: 'blockchain',
  label: 'Execute Bridge',
  description: 'Bridge your tokens',
  address: '0xBridgeAddress', // Replace with actual bridge address
  abi: [
    {
      name: 'bridge',
      type: 'function',
      stateMutability: 'payable',
      inputs: [
        { name: 'token', type: 'address' },
        { name: 'amount', type: 'uint256' },
        { name: 'destinationChain', type: 'uint256' },
        { name: 'recipient', type: 'address' },
      ],
      outputs: [{ name: 'bridgeId', type: 'bytes32' }],
    },
  ],
  functionName: 'bridge',
  chains: { source: '${params.sourceChain}' },
  nextActions: [
    {
      actionId: 'monitor-bridge',
      conditions: [
        {
          field: 'lastResult.status',
          operator: 'eq',
          value: 'success',
        },
      ],
    },
    {
      actionId: 'retry-bridge',
      conditions: [
        {
          field: 'lastResult.status',
          operator: 'eq',
          value: 'error',
        },
        {
          field: 'lastResult.retryCount',
          operator: 'lt',
          value: 3,
        },
      ],
    },
    {
      actionId: 'bridge-failed',
      conditions: [
        {
          field: 'lastResult.status',
          operator: 'eq',
          value: 'error',
        },
        {
          field: 'lastResult.retryCount',
          operator: 'gte',
          value: 3,
        },
      ],
    },
  ],
};
```

## Step 7: Create Bridge Monitor Action

Create `src/actions/monitor-bridge.ts`:

```typescript
import { DynamicAction } from '@sherrylinks/sdk';

export const monitorBridgeAction: DynamicAction = {
  type: 'dynamic',
  label: 'Monitor Bridge',
  description: 'Track bridge status',
  dynamicParams: {
    type: 'http',
    path: 'https://api.example.com/bridge-status',
    params: {
      bridgeId: '${lastResult.bridgeId}',
    },
    pollingInterval: 10000, // Poll every 10 seconds
  },
  nextActions: [
    {
      actionId: 'bridge-complete',
      conditions: [
        {
          field: 'lastResult.status',
          operator: 'eq',
          value: 'completed',
        },
      ],
    },
    {
      actionId: 'bridge-pending',
      conditions: [
        {
          field: 'lastResult.status',
          operator: 'eq',
          value: 'pending',
        },
      ],
    },
    {
      actionId: 'bridge-failed',
      conditions: [
        {
          field: 'lastResult.status',
          operator: 'eq',
          value: 'failed',
        },
      ],
    },
  ],
};
```

## Step 8: Create Metadata

Create `src/metadata.ts`:

```typescript
import { Metadata, createMetadata } from '@sherrylinks/sdk';
import { chainSelectionAction } from './actions/chain-selection';
import { tokenSelectionAction } from './actions/token-selection';
import { approvalCheckAction } from './actions/approval-check';
import { gasCheckAction } from './actions/gas-check';
import { executeBridgeAction } from './actions/execute-bridge';
import { monitorBridgeAction } from './actions/monitor-bridge';

const metadata: Metadata = {
  url: 'https://bridge.example',
  icon: 'https://example.com/bridge-icon.png',
  title: 'Multi-Chain Bridge',
  description: 'Bridge tokens across multiple chains',
  actions: [
    {
      id: 'chain-selection',
      ...chainSelectionAction,
    },
    {
      id: 'token-selection',
      ...tokenSelectionAction,
    },
    {
      id: 'check-approval',
      ...approvalCheckAction,
    },
    {
      id: 'check-gas',
      ...gasCheckAction,
    },
    {
      id: 'execute-bridge',
      ...executeBridgeAction,
    },
    {
      id: 'monitor-bridge',
      ...monitorBridgeAction,
    },
    {
      id: 'bridge-complete',
      type: 'completion',
      label: 'Bridge Complete',
      message: 'Your tokens have been bridged successfully!',
      status: 'success',
    },
    {
      id: 'bridge-failed',
      type: 'completion',
      label: 'Bridge Failed',
      message: 'The bridge operation failed. Please try again.',
      status: 'error',
    },
    {
      id: 'same-chain-error',
      type: 'completion',
      label: 'Invalid Selection',
      message: 'Source and destination chains must be different.',
      status: 'error',
    },
  ],
};

export default createMetadata(metadata);
```

## Step 9: Create Server

Create `src/server.ts`:

```typescript
import express from 'express';
import metadata from './metadata';

const app = express();
const port = 3000;

app.get('/metadata', (req, res) => {
  res.json(metadata);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

## Step 10: Run Your Mini-App

1. Start the development server:
```bash
npx nodemon src/server.ts
```

2. Your mini-app is available at `http://localhost:3000/metadata`

## Testing Your Mini-App

1. Open the Sherry app
2. Create a new post
3. Add your mini-app using the URL `http://localhost:3000/metadata`
4. Test the complete bridge flow:
   - Select source and destination chains
   - Choose a token to bridge
   - Handle token approvals
   - Check gas prices
   - Execute the bridge
   - Monitor the bridge status

## What You've Learned

- How to create complex action flows with conditional logic
- How to implement dynamic actions with polling
- How to handle multiple chain interactions
- How to implement retry logic and fallback options
- How to monitor long-running operations
- How to handle various error cases

## Next Steps

- [Technical Reference](../reference/actions/action-flows.md) - Explore advanced action flow capabilities
- [Security Best Practices](../reference/best-practices/security.md) - Learn about secure implementation
- [Example Applications](https://github.com/sherrylabs/examples) - See more examples

## References

1. [Trigger SDK GitHub Repository](https://github.com/sherrylabs/sdk)
2. [Ethers.js Documentation](https://docs.ethers.org/)
3. [Cross-Chain Bridge Standards](https://github.com/ethereum/EIPs/issues/5169)
4. [Gas Optimization Guide](https://ethereum.org/en/developers/docs/gas/) 