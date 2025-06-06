---
id: basic-mini-app
sidebar_position: 4
title: Basic Mini-App Guide
---

# Basic Mini-App Guide

This guide will help you create a more complex mini-app with multiple actions and user inputs. You'll build a token swap mini-app that allows users to select tokens and amounts.

## What You'll Build

A token swap mini-app that:
- Allows users to select input and output tokens
- Lets users specify the swap amount
- Shows a preview of the swap
- Executes the swap on-chain

## Prerequisites

- Completed the [Quickstart Guide](./quickstart-guide.md)
- Basic understanding of blockchain transactions
- Familiarity with token standards (ERC20)

## Step 1: Set Up Your Project

Create a new directory and install dependencies:

```bash
mkdir token-swap-app
cd token-swap-app
npm init -y
npm install @sherrylinks/sdk typescript @types/node express @types/express --save
npm install ts-node nodemon --save-dev
```

## Step 2: Define Token Selection Action

Create `src/actions/token-selection.ts`:

```typescript
import { HttpAction } from '@sherrylinks/sdk';

export const tokenSelectionAction: HttpAction = {
  type: 'http',
  label: 'Select Tokens',
  description: 'Choose tokens to swap',
  path: 'https://api.example.com/tokens',
  params: [
    {
      name: 'inputToken',
      type: 'select',
      label: 'Input Token',
      options: [
        { label: 'AVAX', value: 'avax' },
        { label: 'USDC', value: 'usdc' },
      ],
    },
    {
      name: 'outputToken',
      type: 'select',
      label: 'Output Token',
      options: [
        { label: 'AVAX', value: 'avax' },
        { label: 'USDC', value: 'usdc' },
      ],
    },
    {
      name: 'amount',
      type: 'number',
      label: 'Amount',
      min: 0,
      step: 0.01,
    },
  ],
  nextActions: [{ actionId: 'preview-swap' }],
};
```

## Step 3: Create Preview Action

Create `src/actions/preview-swap.ts`:

```typescript
import { DecisionAction } from '@sherrylinks/sdk';

export const previewSwapAction: DecisionAction = {
  type: 'decision',
  label: 'Preview Swap',
  description: 'Review your swap details',
  title: 'Swap Preview',
  options: [
    { label: 'Confirm', value: 'confirm', nextActionId: 'execute-swap' },
    { label: 'Cancel', value: 'cancel', nextActionId: 'cancelled' },
  ],
};
```

## Step 4: Define Swap Action

Create `src/actions/execute-swap.ts`:

```typescript
import { BlockchainAction } from '@sherrylinks/sdk';

export const executeSwapAction: BlockchainAction = {
  type: 'blockchain',
  label: 'Execute Swap',
  description: 'Swap your tokens',
  address: '0xRouterAddress', // Replace with actual router address
  abi: [
    {
      name: 'swap',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'tokenIn', type: 'address' },
        { name: 'tokenOut', type: 'address' },
        { name: 'amountIn', type: 'uint256' },
        { name: 'amountOutMin', type: 'uint256' },
      ],
      outputs: [{ name: 'amountOut', type: 'uint256' }],
    },
  ],
  functionName: 'swap',
  chains: { source: 'avalanche' },
  nextActions: [
    {
      actionId: 'success',
      conditions: [{ field: 'lastResult.status', operator: 'eq', value: 'success' }],
    },
    {
      actionId: 'failed',
      conditions: [{ field: 'lastResult.status', operator: 'eq', value: 'error' }],
    },
  ],
};
```

## Step 5: Create Metadata

Create `src/metadata.ts`:

```typescript
import { Metadata, createMetadata } from '@sherrylinks/sdk';
import { tokenSelectionAction } from './actions/token-selection';
import { previewSwapAction } from './actions/preview-swap';
import { executeSwapAction } from './actions/execute-swap';

const metadata: Metadata = {
  url: 'https://swap.example',
  icon: 'https://example.com/swap-icon.png',
  title: 'Token Swap',
  description: 'Swap tokens with our guided flow',
  actions: [
    {
      id: 'token-selection',
      ...tokenSelectionAction,
    },
    {
      id: 'preview-swap',
      ...previewSwapAction,
    },
    {
      id: 'execute-swap',
      ...executeSwapAction,
    },
    {
      id: 'success',
      type: 'completion',
      label: 'Swap Complete',
      message: 'Your swap was successful!',
      status: 'success',
    },
    {
      id: 'failed',
      type: 'completion',
      label: 'Swap Failed',
      message: 'Your swap failed. Please try again.',
      status: 'error',
    },
    {
      id: 'cancelled',
      type: 'completion',
      label: 'Swap Cancelled',
      message: 'You cancelled the swap.',
      status: 'info',
    },
  ],
};

export default createMetadata(metadata);
```

## Step 6: Create Server

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

## Step 7: Run Your Mini-App

1. Start the development server:
```bash
npx nodemon src/server.ts
```

2. Your mini-app is available at `http://localhost:3000/metadata`

## Testing Your Mini-App

1. Open the Sherry app
2. Create a new post
3. Add your mini-app using the URL `http://localhost:3000/metadata`
4. Test the complete swap flow:
   - Select input and output tokens
   - Enter an amount
   - Review the preview
   - Execute the swap

## What You've Learned

- How to create a multi-step mini-app
- How to handle user inputs with parameters
- How to create decision points in your flow
- How to execute blockchain transactions
- How to handle different completion states

## Next Steps

- [Advanced Flows Guide](./advanced-flows.md) - Learn to create complex action flows
- [Technical Reference](../reference/actions/action-flows.md) - Explore action flow capabilities
- [Example Applications](https://github.com/sherrylabs/examples) - See more examples

## References

1. [Trigger SDK GitHub Repository](https://github.com/sherrylabs/sdk)
2. [ERC20 Token Standard](https://eips.ethereum.org/EIPS/eip-20)
3. [Express.js Documentation](https://expressjs.com/) 