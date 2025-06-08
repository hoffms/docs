---
id: beginner-examples
sidebar_position: 1
title: Beginner Examples
---

# 🟢 Beginner Examples

Perfect for getting started with the SDK basics.

## 1. Simple Creator Tip

**⏱️ Setup: 2 minutes** | **Action Type: Transfer**

A one-click tipping system for content creators.

```typescript
import { createMetadata, Metadata } from '@sherrylinks/sdk';

const creatorTipApp: Metadata = {
  url: 'https://my-creator-tip-app.com',
  icon: '☕',
  title: 'Tip the Creator',
  description: 'Show appreciation for great content',
  actions: [
    {
      type: 'transfer',
      label: 'Send Tip',
      chains: { source: 'avalanche' },
      to: '0x742d35Cc6734C0532925a3b8D4ccd306f6F4B26C',
      amountConfig: {
        type: 'radio',
        label: 'Tip Amount',
        options: [
          { label: 'Coffee ☕', value: 0.01, description: '0.01 AVAX' },
          { label: 'Lunch 🍕', value: 0.05, description: '0.05 AVAX' },
          { label: 'Dinner 🍽️', value: 0.1, description: '0.1 AVAX' },
        ],
      },
    },
  ],
};

export default createMetadata(creatorTipApp);
```

**🎯 What you'll learn:**
- Basic Transfer Action setup
- Interactive amount selection
- User-friendly option labeling

## 2. Charity Donation Selector

**⏱️ Setup: 3 minutes** | **Action Type: Transfer**

Let users choose between multiple charities with custom amounts.

```typescript
const charityApp: Metadata = {
  url: 'https://charity-donations.com',
  icon: '💝',
  title: 'Support a Cause',
  description: 'Make a difference with crypto donations',
  actions: [
    {
      type: 'transfer',
      label: 'Donate Now',
      chains: { source: 'celo' },
      recipient: {
        type: 'select',
        label: 'Choose Your Cause',
        options: [
          {
            label: 'Education Fund 🎓',
            value: '0x1234567890123456789012345678901234567890',
            description: 'Supporting education worldwide',
          },
          {
            label: 'Climate Action 🌍',
            value: '0x2345678901234567890123456789012345678901',
            description: 'Fighting climate change',
          },
          {
            label: 'Healthcare Access 🏥',
            value: '0x3456789012345678901234567890123456789012',
            description: 'Improving global healthcare',
          },
        ],
      },
      amountConfig: {
        type: 'select',
        label: 'Donation Amount',
        options: [
          { label: '$5 worth', value: 0.01 },
          { label: '$25 worth', value: 0.05 },
          { label: '$50 worth', value: 0.1 },
        ],
      },
    },
  ],
};
```

**🎯 What you'll learn:**
- Both recipient and amount selection
- Dropdown vs radio button UX
- Meaningful option descriptions

## 3. Fixed-Price NFT Mint

**⏱️ Setup: 5 minutes** | **Action Type: Blockchain**

Simple NFT minting with fixed price and metadata.

```typescript
const nftMintAbi = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'tokenURI', type: 'string' },
    ],
    outputs: [{ name: 'tokenId', type: 'uint256' }],
  },
] as const;

const simpleNFTApp: Metadata = {
  url: 'https://my-nft-collection.com',
  icon: '🎨',
  title: 'Mint Cosmic NFT',
  description: 'Get your unique cosmic NFT',
  actions: [
    {
      type: 'blockchain',
      label: 'Mint for 0.1 AVAX',
      address: '0x742d35Cc6734C0532925a3b8D4ccd306f6F4B26C',
      abi: nftMintAbi,
      functionName: 'mint',
      chains: { source: 'fuji' },
      amount: 0.1,
      params: [
        {
          name: 'to',
          label: 'Your Address',
          type: 'address',
          required: true,
          description: 'Address that will receive the NFT',
        },
        {
          name: 'tokenURI',
          label: 'Metadata',
          type: 'text',
          value: 'ipfs://QmYourNftMetadata123',
          fixed: true,
          description: 'NFT metadata URI',
        },
      ],
    },
  ],
};
```

**🎯 What you'll learn:**
- Basic Blockchain Action setup
- Working with contract ABIs
- Fixed vs user-input parameters
- Payable function handling

## 4. Simple Newsletter Signup

**⏱️ Setup: 3 minutes** | **Action Type: HTTP**

Collect user emails with optional preferences.

```typescript
const newsletterApp: Metadata = {
  url: 'https://newsletter-signup.com',
  icon: '📧',
  title: 'Join Our Newsletter',
  description: 'Stay updated with the latest Web3 news',
  actions: [
    {
      type: 'http',
      label: 'Subscribe Now',
      path: 'https://api.newsletter.com/subscribe',
      params: [
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true,
          description: "We'll never spam you",
        },
        {
          name: 'name',
          label: 'First Name',
          type: 'text',
          required: false,
          description: 'Help us personalize your experience',
        },
        {
          name: 'interests',
          label: 'Your Interests',
          type: 'select',
          required: false,
          options: [
            { label: 'DeFi', value: 'defi' },
            { label: 'NFTs', value: 'nfts' },
            { label: 'Gaming', value: 'gaming' },
            { label: 'Development', value: 'dev' },
          ],
        },
        {
          name: 'frequency',
          label: 'Email Frequency',
          type: 'radio',
          required: true,
          options: [
            { label: 'Daily', value: 'daily' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' },
          ],
        },
      ],
    },
  ],
};
```

**🎯 What you'll learn:**
- HTTP Action basics
- Form parameter types
- Email validation
- Radio vs select options