---
id: intermediate-examples
sidebar_position: 2
title: Intermediate Examples
---

# 🟡 Intermediate Examples

Ready to build more sophisticated mini-apps.

## 5. Token Approval + Swap Flow

**⏱️ Setup: 15 minutes** | **Action Type: Flow**

A two-step process: approve tokens, then swap them.

```typescript
import { ActionFlow } from '@sherrylinks/sdk';

const tokenSwapFlow: ActionFlow = {
  type: 'flow',
  label: 'Swap USDC for AVAX',
  initialActionId: 'approve-usdc',
  actions: [
    // Step 1: Approve USDC spending
    {
      id: 'approve-usdc',
      type: 'blockchain',
      label: 'Step 1: Approve USDC',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      abi: erc20Abi,
      functionName: 'approve',
      chains: { source: 'avalanche' },
      params: [
        {
          name: 'spender',
          label: 'DEX Router',
          type: 'address',
          value: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
          fixed: true,
        },
        {
          name: 'amount',
          label: 'USDC Amount',
          type: 'number',
          required: true,
          min: 1,
          max: 10000,
        },
      ],
      nextActions: [
        {
          actionId: 'execute-swap',
          conditions: [{ field: 'lastResult.status', operator: 'eq', value: 'success' }],
        },
        {
          actionId: 'approval-failed',
        },
      ],
    },

    // Step 2: Execute the swap
    {
      id: 'execute-swap',
      type: 'blockchain',
      label: 'Step 2: Swap Tokens',
      address: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
      abi: routerAbi,
      functionName: 'swapExactTokensForAVAX',
      chains: { source: 'avalanche' },
      params: [
        {
          name: 'amountIn',
          label: 'Amount In',
          type: 'number',
          value: '{{amount}}', // From previous step
          fixed: true,
        },
        {
          name: 'amountOutMin',
          label: 'Min AVAX Out',
          type: 'number',
          required: true,
        },
        {
          name: 'path',
          label: 'Swap Path',
          type: 'text',
          value:
            '["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48","0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"]',
          fixed: true,
        },
        {
          name: 'to',
          label: 'Recipient',
          type: 'address',
          value: '{{userAddress}}',
          fixed: true,
        },
        {
          name: 'deadline',
          label: 'Deadline',
          type: 'number',
          value: '{{timestamp + 1200}}',
          fixed: true,
        },
      ],
      nextActions: [{ actionId: 'swap-complete' }],
    },

    // Completion states
    {
      id: 'swap-complete',
      type: 'completion',
      label: 'Swap Successful',
      message: 'Your USDC has been swapped for AVAX! 🎉',
      status: 'success',
    },
    {
      id: 'approval-failed',
      type: 'completion',
      label: 'Approval Failed',
      message: 'Token approval failed. Please try again.',
      status: 'error',
    },
  ],
};
```

**🎯 What you'll learn:**
- Multi-step Action Flows
- Conditional navigation between steps
- Parameter passing between actions
- Error handling in flows

## 6. DAO Voting with Proposals

**⏱️ Setup: 10 minutes** | **Action Type: Blockchain**

Vote on DAO proposals with real-time proposal data.

```typescript
const daoVotingApp: Metadata = {
  url: 'https://dao-voting.com',
  icon: '🗳️',
  title: 'DAO Governance',
  description: 'Vote on community proposals',
  actions: [
    {
      type: 'blockchain',
      label: 'Cast Your Vote',
      address: '0xDAOGovernanceContract',
      abi: daoAbi,
      functionName: 'castVote',
      chains: { source: 'celo' },
      params: [
        {
          name: 'proposalId',
          label: 'Active Proposals',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Proposal #42: Treasury Allocation',
              value: 42,
              description: 'Allocate 100K tokens for ecosystem development',
            },
            {
              label: 'Proposal #43: Partnership with Protocol X',
              value: 43,
              description: 'Strategic partnership for cross-chain expansion',
            },
            {
              label: 'Proposal #44: Governance Token Split',
              value: 44,
              description: '2:1 token split with updated tokenomics',
            },
          ],
        },
        {
          name: 'support',
          label: 'Your Vote',
          type: 'radio',
          required: true,
          options: [
            {
              label: '✅ Yes - I support this proposal',
              value: true,
              description: 'Vote in favor of the proposal',
            },
            {
              label: '❌ No - I oppose this proposal',
              value: false,
              description: 'Vote against the proposal',
            },
          ],
        },
      ],
    },
  ],
};
```

**🎯 What you'll learn:**
- Complex parameter selection
- Boolean parameter handling
- Real-world DAO integration
- Meaningful vote descriptions

## 7. Cross-Chain Asset Bridge

**⏱️ Setup: 12 minutes** | **Action Type: Blockchain**

Bridge tokens between Avalanche and Celo networks.

```typescript
const bridgeApp: Metadata = {
  url: 'https://cross-chain-bridge.com',
  icon: '🌉',
  title: 'Cross-Chain Bridge',
  description: 'Move assets between Avalanche and Celo',
  actions: [
    {
      type: 'blockchain',
      label: 'Bridge to Celo',
      address: '0xBridgeContractAddress',
      abi: bridgeAbi,
      functionName: 'bridgeTokens',
      chains: { source: 'avalanche', destination: 'celo' },
      params: [
        {
          name: 'token',
          label: 'Token to Bridge',
          type: 'select',
          required: true,
          options: [
            {
              label: 'USDC (USD Coin)',
              value: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
              description: 'Stable USD-pegged token',
            },
            {
              label: 'USDT (Tether)',
              value: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
              description: 'Widely used stablecoin',
            },
          ],
        },
        {
          name: 'amount',
          label: 'Amount to Bridge',
          type: 'number',
          required: true,
          min: 1,
          max: 100000,
          description: 'Amount of tokens to send to Celo',
        },
        {
          name: 'recipient',
          label: 'Recipient on Celo',
          type: 'address',
          required: true,
          description: 'Address that will receive tokens on Celo network',
        },
        {
          name: 'destinationChainId',
          label: 'Destination Chain',
          type: 'number',
          value: 42220,
          fixed: true,
        },
      ],
    },
  ],
};
```

**🎯 What you'll learn:**
- Cross-chain action configuration
- Token selection with descriptions
- Address validation across chains
- Fixed vs dynamic parameters

## 8. Multi-Step User Onboarding

**⏱️ Setup: 20 minutes** | **Action Type: Flow**

Complete user onboarding with email, wallet, and NFT mint.

```typescript
const onboardingFlow: ActionFlow = {
  type: 'flow',
  label: 'Complete Onboarding',
  initialActionId: 'collect-info',
  actions: [
    // Step 1: Collect user information
    {
      id: 'collect-info',
      type: 'http',
      label: 'Welcome! Tell us about yourself',
      path: 'https://api.myapp.com/onboard',
      params: [
        {
          name: 'name',
          label: 'Full Name',
          type: 'text',
          required: true,
          minLength: 2,
          maxLength: 50,
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true,
        },
        {
          name: 'experience',
          label: 'Web3 Experience',
          type: 'radio',
          required: true,
          options: [
            { label: 'Complete Beginner', value: 'beginner' },
            { label: 'Some Experience', value: 'intermediate' },
            { label: 'Very Experienced', value: 'expert' },
          ],
        },
      ],
      nextActions: [{ actionId: 'choose-path' }],
    },

    // Step 2: Choose onboarding path
    {
      id: 'choose-path',
      type: 'decision',
      label: 'Choose Your Path',
      title: 'What would you like to do first?',
      options: [
        {
          label: 'Get my welcome NFT',
          value: 'nft',
          nextActionId: 'mint-welcome-nft',
        },
        {
          label: 'Learn more about the platform',
          value: 'learn',
          nextActionId: 'learning-complete',
        },
        {
          label: 'Explore features',
          value: 'explore',
          nextActionId: 'exploration-complete',
        },
      ],
    },

    // Step 3: Mint welcome NFT
    {
      id: 'mint-welcome-nft',
      type: 'blockchain',
      label: 'Mint Your Welcome NFT',
      address: '0xWelcomeNFTContract',
      abi: welcomeNftAbi,
      functionName: 'mintWelcome',
      chains: { source: 'fuji' },
      params: [
        {
          name: 'to',
          label: 'Your Address',
          type: 'address',
          required: true,
        },
        {
          name: 'experience',
          label: 'Experience Level',
          type: 'text',
          value: '{{experience}}', // From step 1
          fixed: true,
        },
      ],
      nextActions: [{ actionId: 'onboarding-complete' }],
    },

    // Completion states
    {
      id: 'onboarding-complete',
      type: 'completion',
      label: 'Welcome Aboard! 🎉',
      message: 'Your onboarding is complete! Check your wallet for your welcome NFT.',
      status: 'success',
    },
    {
      id: 'learning-complete',
      type: 'completion',
      label: 'Keep Learning!',
      message: 'Great choice! Check out our documentation to learn more.',
      status: 'success',
    },
    {
      id: 'exploration-complete',
      type: 'completion',
      label: 'Happy Exploring!',
      message: 'Dive in and explore all our features. Welcome to the community!',
      status: 'success',
    },
  ],
};
```

**🎯 What you'll learn:**
- Complex multi-step flows
- Decision trees and branching
- Data passing between steps
- Multiple completion states 