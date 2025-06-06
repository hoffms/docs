---
id: quickstart-guide
sidebar_position: 3
title: Quickstart Guide (review)
---

# Quickstart Guide

This guide will help you create a simple token transfer mini-app in 10 minutes. You'll learn how to define metadata, create an action, and deploy your mini-app.

## What You'll Build

A simple mini-app that allows users to transfer AVAX tokens to a specified address. The mini-app will:
- Display a transfer button
- Handle the token transfer
- Show the transaction status

## Prerequisites

- Node.js installed
- Basic knowledge of TypeScript
- A code editor (like VSCode)

## Step 1: Install the SDK

```bash
npm install @sherrylinks/sdk
# or
yarn add @sherrylinks/sdk
```

## Step 2: Create Your Project

Create a new directory and initialize a TypeScript project:

```bash
mkdir my-mini-app
cd my-mini-app
npm init -y
npm install typescript @types/node --save-dev
npx tsc --init
```

## Step 3: Define Your Mini-App

Create a new file `src/metadata.ts`:

```typescript
import { Metadata, createMetadata } from '@sherrylinks/sdk';

const metadata: Metadata = {
  url: 'https://myapp.example',
  icon: 'https://example.com/icon.png',
  title: 'Send AVAX',
  description: 'Quick AVAX transfer',
  actions: [
    {
      label: 'Send 0.1 AVAX',
      description: 'Transfer 0.1 AVAX to recipient',
      to: '0x1234567890123456789012345678901234567890', // Replace with your address
      amount: 0.1,
      chains: { source: 'avalanche' },
    },
  ],
};

// Validate the metadata
const validatedMetadata = createMetadata(metadata);
export default validatedMetadata;
```

## Step 4: Create an API Endpoint

Create a new file `src/server.ts`:

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

## Step 5: Deploy Your Mini-App

1. Install Express:
```bash
npm install express @types/express
```

2. Start the server:
```bash
npx ts-node src/server.ts
```

3. Your mini-app is now available at `http://localhost:3000/metadata`

## Testing Your Mini-App

1. Open the Sherry app
2. Create a new post
3. Add your mini-app using the URL `http://localhost:3000/metadata`
4. Test the transfer functionality

## What You've Learned

- How to install and set up the Trigger SDK
- How to define a simple transfer action
- How to create and deploy a metadata endpoint
- How to test your mini-app

## Next Steps

- [Basic Mini-App Guide](./basic-mini-app.md) - Learn to create more complex mini-apps
- [Technical Reference](../reference/metadata.md) - Explore the full SDK capabilities
- [Example Applications](https://github.com/sherrylabs/examples) - See more examples

## References

1. [Trigger SDK GitHub Repository](https://github.com/sherrylabs/sdk)
2. [Express.js Documentation](https://expressjs.com/)
3. [TypeScript Documentation](https://www.typescriptlang.org/docs/) 