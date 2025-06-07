---
id: triggers
title: Trigger dApps
sidebar_position: 1
---

# Trigger dApps

## What is a Trigger?

A Trigger is a declarative unit that defines a Web3 interaction. It is represented by a structured JSON (or TypeScript) metadata object that describes what the Trigger dApp does, what user inputs it requires, and how it should behave at runtime.

:::info Portability
Triggers are portable, composable, and executable across different environments—such as wallets, browser extensions, or social platforms—without requiring a custom frontend implementation.
:::

## Core Components

### 1. Metadata

The root object that defines a Trigger. It includes:
- **App metadata**: 
  - `url`: The base URL for your mini-app
  - `icon`: URL to your app's icon
  - `title`: Display name of your mini-app
  - `description`: Brief description of what your mini-app does
- **Chain Configuration**: 
  - `chains.source`: Required. The source chain for the action
  - `chains.destination`: Optional. The destination chain for cross-chain actions
- **List of Actions**: The user can execute
- **BaseUrl**: (optional) Required for dynamic actions with relative paths

### 2. Actions

An Action represents a single executable task. Sherry supports 4 action types:

| Type | Description | Use Case |
|------|-------------|----------|
| `dynamic` | Server-side logic for complex operations | DeFi strategies, dynamic pricing, AI-powered recommendations, Cross-chain bridging |
| `blockchain` | Direct smart contract interaction | Token transfers, NFT minting, DAO voting |
| `transfer` | Native token transfers | Sending ETH, AVAX, CELO with customizable amounts |
| `flow` | Multi-step workflows | Complex user journeys with conditional branching |

Each Action has:
- **Type**: One of the four supported action types
- **Label**: Display text for the action
- **Description**: (optional) Detailed explanation of the action
- **Chain configuration**: 
  - `chains.source`: Required. The source chain for the action
  - `chains.destination`: Optional. The destination chain for cross-chain actions
- **Parameters**: Optional, depending on type. Supported parameter types:
  - `address`: For blockchain addresses
  - `string`: For text input
  - `number`: For numeric values (can include min/max constraints)
  - `select`: For predefined options
  - `radio`: For amount selection with predefined values

## Examples

This section provides various examples demonstrating how Trigger metadata is structured and how it renders in the user interface.

### Bridge to Avalanche in One Click

This example shows a Trigger dApp for bridging assets to Avalanche using Wormhole.

```typescript
const metadata: Metadata = {
  url: 'https://bridge.example',
  icon: 'https://example.com/bridge-icon.png',
  title: 'Bridge to Avalanche in One Click',
  description: 'Move your assets seamlessly to Avalanche using Wormhole.',
  actions: [
    {
      type: 'dynamic', // Or 'flow' for multi-step
      label: 'Bridge',
      chains: { source: 'ethereum', destination: 'avalanche' },
      params: [
        {
          name: 'sendToken',
          label: 'Send',
          type: 'select', // Assuming a dropdown for token selection
          required: true,
          options: [
            { label: 'ETH', value: 'eth' },
            // ... other tokens
          ]
        },
        {
          name: 'amount',
          label: 'Amount',
          type: 'number',
          required: true,
          min: 0.000001 // Example minimum amount
        }
      ]
    }
  ]
};
```

:::note UI Preview
[Bridge to Avalanche UI - A simple interface showing token selection and amount input for bridging assets to Avalanche]
:::

### Simple Token Transfer

This example demonstrates a simple token transfer Trigger dApp.

```typescript
const metadata: Metadata = {
  url: 'https://myapp.example',
  icon: 'https://example.com/icon.png',
  title: 'Send AVAX',
  description: 'Quick AVAX transfer to support creators',
  actions: [
    {
      type: 'transfer',
      label: 'Send 0.1 AVAX',
      description: 'Transfer 0.1 AVAX to recipient',
      to: '0x1234567890123456789012345678901234567890',
      amount: 0.1,
      chains: { source: 'avalanche' }
    }
  ]
};
```

:::note UI Preview
[Image placeholder: Simple token transfer UI]
:::

### Creator Tip with Amount Selection

This example shows a creator tipping Trigger dApp with predefined amount options.

```typescript
const metadata: Metadata = {
  url: 'https://creator-tips.example',
  icon: 'https://example.com/tip-icon.png',
  title: 'Support Creator',
  description: 'Show your support with AVAX tips',
  actions: [
    {
      type: 'transfer',
      label: 'Send Tip',
      to: '0xCreatorAddress123',
      chains: { source: 'avalanche' },
      amountConfig: {
        type: 'radio',
        label: 'Select tip amount',
        options: [
          { label: 'Coffee ☕', value: 0.01, description: '0.01 AVAX' },
          { label: 'Lunch 🍕', value: 0.05, description: '0.05 AVAX' },
          { label: 'Dinner 🍽️', value: 0.1, description: '0.1 AVAX' }
        ]
      }
    }
  ]
};
```

:::note UI Preview
[Image placeholder: Creator tip UI showing radio button selection for tip amounts]
:::

### Smart Contract Interaction

This example illustrates a Trigger dApp for interacting with a smart contract to mint an NFT.

```typescript
const metadata: Metadata = {
  url: 'https://nft-mint.example',
  icon: 'https://example.com/nft-icon.png',
  title: 'Mint NFT Collection',
  description: 'Mint your unique NFT from our collection',
  actions: [
    {
      type: 'blockchain',
      label: 'Mint NFT',
      description: 'Mint a unique NFT from our collection',
      address: '0xNFTContractAddress',
      abi: [
        {
          name: 'mint',
          type: 'function',
          stateMutability: 'payable',
          inputs: [
            { name: 'to', type: 'address' },
            { name: 'tier', type: 'string' }
          ],
          outputs: [{ name: 'tokenId', type: 'uint256' }]
        }
      ],
      functionName: 'mint',
      chains: { source: 'avalanche' },
      amount: 0.1, // Mint cost
      params: [
        {
          name: 'to',
          label: 'Recipient Address',
          type: 'address',
          required: true,
          description: 'Address that will receive the NFT'
        },
        {
          name: 'tier',
          label: 'NFT Tier',
          type: 'select',
          required: true,
          options: [
            { label: 'Common 🥉', value: 'common' },
            { label: 'Rare 🥈', value: 'rare' },
            { label: 'Epic 🥇', value: 'epic' }
          ]
        }
      ]
    }
  ]
};
```

:::note UI Preview
[Image placeholder: NFT minting interface with tier selection and recipient address input]
:::

## Execution Lifecycle

1. Trigger is loaded from a static file, endpoint, or embedded object
2. UI is rendered dynamically based on defined actions and parameters
3. User provides inputs and confirms execution
4. Action is executed, either:
   - Directly (e.g. EVM contract call)
   - Via backend (e.g. dynamic API → transaction)
   - As part of a flow
5. Transaction is signed and broadcasted via the user's wallet or connected runtime

## Benefits

- **Declarative**: No frontend logic required
- **Composable**: Chain actions into complex flows
- **Validatable**: Ensures consistency via schema validation
- **Embeddable**: Can run in wallets, UIs, or extensions
- **Chain-agnostic**: Works across EVM-compatible blockchains


:::tip UI Components
The Trigger protocol automatically renders appropriate UI components based on the metadata:
- Radio buttons for amount selection
- Select dropdowns for predefined options
- Number inputs with validation
- Address inputs with checksum validation
- Dynamic forms with real-time validation
:::

## Next Steps

:::tip Getting Started
- [Learn how to Define Actions](/docs/concepts/protocol/actions)
- [Validate triggers using createMetadata](/docs/concepts/protocol/metadata)
- [Use the Debugger to preview and test](/docs/tools/debugger)
:::
