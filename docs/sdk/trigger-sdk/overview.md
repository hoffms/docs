---
id: overview
sidebar_position: 1
title: Overview
---

# Trigger SDK Overview

[![npm version](https://img.shields.io/npm/v/@sherrylinks/sdk.svg)](https://www.npmjs.com/package/@sherrylinks/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-Jest-green)](https://jestjs.io/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue.svg)](https://github.com/SherryLabs/sherry-sdk)


Trigger SDK is a **TypeScript-first toolkit** for building interactive Web3 **dApps** that embed directly within social media posts. Transform static content into dynamic blockchain experiences that users can interact with seamlessly.

:::tip New to Web3 Social Apps?
Think of Trigger SDK as a way to turn any social media post into an interactive Web3 application.
Users can swap tokens, mint NFTs, vote on proposals, and more - all without leaving their social feed.
:::

## Key Features

### Core Capabilities

- **🔗 Embed Anywhere**: Your mini-apps work in Twitter, Discord, Telegram, and any platform that supports rich content
- **🎯 Zero Context Switch**: Users never leave their social feed to interact with your dApp
- **🛠️ Developer Friendly**: TypeScript-first with built-in validation and comprehensive tooling
- **🌐 Multi-Chain Ready**: One codebase, multiple blockchains - Avalanche, Celo, Ethereum, and more

### Action Types

| Action Type    | Use Case                    | Example                                  |
|---------------|----------------------------|------------------------------------------|
| **Blockchain** | Smart contract interactions | Token approvals, NFT minting, DAO voting |
| **Transfer**   | Native token transfers      | Tips, donations, payments                |
| **Dynamic**    | Server-computed actions     | Complex DeFi strategies, dynamic pricing |
| **Flow**       | Multi-step processes        | Onboarding, approval + swap workflows    |

### Multi-Chain Support

- **Mainnets**: 
  - Avalanche C-Chain
  - Celo
  - Ethereum
- **Testnets**: 
  - Avalanche Fuji
  - Celo Alfajores
- **Cross-Chain**: Built-in bridge support via Wormhole

### Built-in Validation

- **Compile-time**: Full TypeScript support catches errors early
- **Runtime**: `createMetadata()` validates your mini-app configuration
- **ABI Compatibility**: Automatic parameter validation against smart contract ABIs

### Parameter System

Configure user inputs with built-in validation:

- **Standard Types**: 
  - Text
  - Numbers
  - Addresses
  - Booleans
  - Dates
- **Selection Types**: 
  - Dropdowns
  - Radio buttons with custom options
- **Templates**: Pre-built parameter templates for common use cases

## Getting Started

### Installation

```bash
npm install @sherrylinks/sdk
```

### Quick Example

```typescript
import { createMetadata, Metadata } from '@sherrylinks/sdk';

const metadata: Metadata = {
  url: 'https://my-nft-collection.com',
  icon: 'https://my-nft-collection.com/icon.png',
  title: 'Mint Cosmic NFT',
  description: 'Mint exclusive NFTs directly from social media',
  actions: [
    {
      type: 'blockchain',
      label: 'Mint NFT',
      address: '0x742d35Cc6734C0532925a3b8D4ccd306f6F4B26C',
      abi: contractAbi,
      functionName: 'mint',
      chains: { source: 'avalanche' },
      amount: 0.1, // 0.1 AVAX mint price
      params: [
        {
          name: 'to',
          label: 'Your Address',
          type: 'address',
          required: true,
        },
        {
          name: 'tokenURI',
          label: 'Metadata URI',
          type: 'text',
          value: 'ipfs://QmNft42...',
          fixed: true,
        },
      ],
    },
  ],
};

// Validate and use your mini-app
const validated = createMetadata(metadata);
console.log('✅ Mini-app ready to deploy!');
```

### Example Output

When embedded in a social post, this mini-app renders as:

```
🎨 Mint Cosmic NFT
┌─────────────────────────────────┐
│ Your Address: [0x...________]   │
│ [Mint for 0.1 AVAX]             │
└─────────────────────────────────┘
```

## Learning Resources

### Choose Your Path

| Experience Level | Resource | Description |
|-----------------|----------|-------------|
| 🏃‍♂️ Quick Start | [5-Minute Quickstart](getting-started/quickstart) | Get a mini-app running in 5 minutes |
| 🧑‍💻 New to Web3 | [Complete Tutorial](guides/guide-en) | Step-by-step with Next.js (30 min) |
| 🔧 Experienced | [Action Types Reference](api-reference/action-types/blockchain-actions) | Deep dive into the API |
| 💡 Examples | [Live Examples](getting-started/examples) | Working mini-apps for common use cases |

## Use Cases

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">

<div className="p-4 border border-solid border-[var(--ifm-color-emphasis-300)] rounded-lg">
  <h4>🎨 NFT Collections</h4>
  <p>Let users mint NFTs directly from announcement posts</p>
</div>

<div className="p-4 border border-solid border-[var(--ifm-color-emphasis-300)] rounded-lg">
  <h4>🔄 Token Swaps</h4>
  <p>Enable DeFi trading without leaving social media</p>
</div>

<div className="p-4 border border-solid border-[var(--ifm-color-emphasis-300)] rounded-lg">
  <h4>🗳️ DAO Governance</h4>
  <p>Embed voting directly in community discussions</p>
</div>

<div className="p-4 border border-solid border-[var(--ifm-color-emphasis-300)] rounded-lg">
  <h4>💝 Donations</h4>
  <p>Accept crypto donations with custom amounts and recipients</p>
</div>

<div className="p-4 border border-solid border-[var(--ifm-color-emphasis-300)] rounded-lg">
  <h4>🌉 Cross-Chain Bridges</h4>
  <p>Move assets between blockchains seamlessly</p>
</div>

<div className="p-4 border border-solid border-[var(--ifm-color-emphasis-300)] rounded-lg">
  <h4>📋 Lead Generation</h4>
  <p>Combine Web3 actions with email collection</p>
</div>

</div>

## Advanced Features

### Multi-Step Flows

Create complex workflows with conditional logic:

```typescript
const onboardingFlow: ActionFlow = {
  type: 'flow',
  label: 'Join Community',
  initialActionId: 'collect-email',
  actions: [
    {
      id: 'collect-email',
      type: 'http',
      label: 'Step 1: Enter Email',
      path: '/api/newsletter',
      params: [/* email params */],
      nextActions: [{ actionId: 'mint-membership' }],
    },
    {
      id: 'mint-membership',
      type: 'blockchain',
      label: 'Step 2: Mint Membership',
      // ... blockchain action config
      nextActions: [{ actionId: 'welcome' }],
    },
    {
      id: 'welcome',
      type: 'completion',
      message: 'Welcome to the community! 🎉',
      status: 'success',
    },
  ],
};
```

### Dynamic Actions

Server-side computed actions for complex logic:

```typescript
{
  type: 'dynamic',
  label: 'Smart Swap',
  path: '/api/calculate-optimal-swap',
  chains: { source: 'avalanche' },
  params: [
    {
      name: 'amount',
      label: 'Amount to Swap',
      type: 'number',
      required: true
    }
  ]
}
```

## Ecosystem

### Integrations

- **Social Platforms**: Twitter/X, Twitch, YouTube
- **Wallets**: Coming soon
- **Blockchains**: Avalanche, Fuji

### Community & Support

- [Discord](https://discord.gg/69brTf6J) - Get help and connect with other developers
- [GitHub](https://github.com/SherryLabs/sherry-sdk) - Contribute to the SDK
- [Examples Repository](https://github.com/SherryLabs/sherry-examples) - Real-world implementations

## Technical Specifications

| Metric | Value |
|--------|-------|
| 📦 Bundle Size | ~50KB gzipped |
| 🔧 Dependencies | Minimal (viem, abitype) |
| 🧪 Test Coverage | >90% |
| 📚 TypeScript | 100% type coverage |
| ⚡ Performance | <100ms validation time |

## Ready to Build Your First Mini-App?

Choose your starting point below


<div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
  gap: '1rem',
  marginBottom: '2rem'
}}>
  <a 
    href="/docs/getting-started/quickstart" 
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem',
      border: '1px solid var(--ifm-color-secondary)',
      borderRadius: '8px',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    }}
    onMouseOver="this.style.backgroundColor='var(--ifm-color-primary)'; this.style.color='white'"
    onMouseOut="this.style.backgroundColor='transparent'; this.style.color='inherit'"
  >
    <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</span>
    <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Quick Start</h4>
    <p style={{ textAlign: 'center', fontSize: '0.9rem', margin: 0 }}>Get a mini-app running in 5 minutes</p>
  </a>

  <a 
    href="/docs/guides/guide-en" 
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem',
      border: '1px solid var(--ifm-color-secondary)',
      borderRadius: '8px',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    }}
    onMouseOver="this.style.backgroundColor='var(--ifm-color-secondary)'; this.style.color='white'"
    onMouseOut="this.style.backgroundColor='transparent'; this.style.color='inherit'"
  >
    <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📖</span>
    <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Complete Tutorial</h4>
    <p style={{ textAlign: 'center', fontSize: '0.9rem', margin: 0 }}>Step-by-step guide with Next.js</p>
  </a>

  <a 
    href="/docs/getting-started/examples" 
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem',
      border: '1px solid var(--ifm-color-secondary)',
      borderRadius: '8px',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    }}
    onMouseOver="this.style.backgroundColor='var(--ifm-color-emphasis-200)'"
    onMouseOut="this.style.backgroundColor='transparent'"
  >
    <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💡</span>
    <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>View Examples</h4>
    <p style={{ textAlign: 'center', fontSize: '0.9rem', margin: 0 }}>Explore real-world implementations</p>
  </a>

  <a 
    href="https://discord.gg/69brTf6J" 
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem',
      border: '1px solid var(--ifm-color-secondary)',
      borderRadius: '8px',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    }}
    onMouseOver="this.style.backgroundColor='var(--ifm-color-secondary)'; this.style.color='white'"
    onMouseOut="this.style.backgroundColor='transparent'; this.style.color='inherit'"
  >
    <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</span>
    <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Join Discord</h4>
    <p style={{ textAlign: 'center', fontSize: '0.9rem', margin: 0 }}>Get help from our community</p>
  </a>
</div>

:::info SDK Status
The Sherry SDK is in **active development**. We're working hard to make everything as polished as possible.

- **Found a bug?** [Report it on GitHub](https://github.com/SherryLabs/sherry-sdk/issues)
- **Need help?** [Join our Discord](https://discord.gg/69brTf6J)
- **Want to contribute?** [Check our contribution guide](https://github.com/SherryLabs/sherry-sdk/blob/main/CONTRIBUTING.md)
:::