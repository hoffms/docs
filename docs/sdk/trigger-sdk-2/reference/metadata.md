---
id: metadata
sidebar_position: 2
title: Metadata
---

# Metadata

The `Metadata` interface is the foundation of every Sherry mini-app. It defines the app's identity, appearance, and available actions.

## Interface

```typescript
interface Metadata {
  // Required Properties
  url: string;           // Base URL of your mini-app
  icon: string;          // URL to your app's icon
  title: string;         // Display name of your mini-app
  description: string;   // Brief description of your app
  actions: Action[];     // Array of available actions

  // Optional Properties
  baseUrl?: string;      // Alternative base URL for API calls
  version?: string;      // Version of your mini-app
  tags?: string[];       // Keywords for discovery
}
```

## Required Properties

### `url`
The base URL where your mini-app is hosted. This should be a valid HTTPS URL.

```typescript
const metadata: Metadata = {
  url: 'https://my-nft-collection.com',
  // ... other properties
};
```

### `icon`
URL to your app's icon image. Should be a square image (recommended size: 512x512px).

```typescript
const metadata: Metadata = {
  icon: 'https://my-nft-collection.com/icon.png',
  // ... other properties
};
```

### `title`
The display name of your mini-app. Keep it short and descriptive.

```typescript
const metadata: Metadata = {
  title: 'Cosmic NFT Minter',
  // ... other properties
};
```

### `description`
A brief description of what your mini-app does. This helps users understand its purpose.

```typescript
const metadata: Metadata = {
  description: 'Mint exclusive NFTs directly from social media',
  // ... other properties
};
```

### `actions`
An array of actions that users can perform in your mini-app. Each action must be one of the supported action types:

- `BlockchainAction` - Smart contract interactions
- `TransferAction` - Native token transfers
- `HttpAction` - API calls
- `DynamicAction` - Server-computed actions
- `ActionFlow` - Multi-step processes

```typescript
const metadata: Metadata = {
  actions: [
    {
      type: 'blockchain',
      label: 'Mint NFT',
      // ... action configuration
    },
    {
      type: 'transfer',
      label: 'Send Tip',
      // ... action configuration
    }
  ],
  // ... other properties
};
```

## Optional Properties

### `baseUrl`
Alternative base URL for API calls. Useful when your API is hosted on a different domain.

```typescript
const metadata: Metadata = {
  baseUrl: 'https://api.my-nft-collection.com',
  // ... other properties
};
```

### `version`
Version of your mini-app. Useful for tracking changes and compatibility.

```typescript
const metadata: Metadata = {
  version: '1.0.0',
  // ... other properties
};
```

### `tags`
Keywords that help users discover your mini-app.

```typescript
const metadata: Metadata = {
  tags: ['nft', 'minting', 'avalanche', 'art'],
  // ... other properties
};
```

## Validation

The SDK provides built-in validation for metadata through the `createMetadata` function:

```typescript
import { createMetadata, Metadata } from '@sherrylinks/sdk';

const metadata: Metadata = {
  // ... your metadata configuration
};

try {
  const validated = createMetadata(metadata);
  console.log('✅ Metadata is valid:', validated);
} catch (error) {
  console.error('❌ Validation failed:', error);
}
```

### Validation Rules

1. **Required Fields**
   - All required properties must be present
   - `url` must be a valid HTTPS URL
   - `icon` must be a valid URL
   - `title` must be non-empty
   - `description` must be non-empty
   - `actions` must be a non-empty array

2. **Action Validation**
   - Each action must have a valid type
   - Action-specific properties are validated
   - Maximum of 4 actions per mini-app

3. **URL Validation**
   - `url` and `baseUrl` must be valid HTTPS URLs
   - `icon` must be a valid URL
   - URLs cannot contain invalid characters

## Examples

### Basic NFT Minter

```typescript
import { createMetadata, Metadata } from '@sherrylinks/sdk';

const nftMinter: Metadata = {
  url: 'https://my-nft-collection.com',
  icon: 'https://my-nft-collection.com/icon.png',
  title: 'Cosmic NFT Minter',
  description: 'Mint exclusive NFTs directly from social media',
  version: '1.0.0',
  tags: ['nft', 'minting', 'avalanche'],
  actions: [
    {
      type: 'blockchain',
      label: 'Mint NFT',
      address: '0x742d35Cc6734C0532925a3b8D4ccd306f6F4B26C',
      abi: contractAbi,
      functionName: 'mint',
      chains: { source: 'avalanche' },
      amount: 0.1,
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

const validated = createMetadata(nftMinter);
```

### Multi-Action Mini-App

```typescript
import { createMetadata, Metadata } from '@sherrylinks/sdk';

const socialApp: Metadata = {
  url: 'https://my-social-app.com',
  icon: 'https://my-social-app.com/icon.png',
  title: 'Social Token Platform',
  description: 'Create and manage your social token',
  baseUrl: 'https://api.my-social-app.com',
  version: '2.0.0',
  tags: ['social', 'tokens', 'avalanche', 'celo'],
  actions: [
    {
      type: 'blockchain',
      label: 'Create Token',
      // ... token creation action
    },
    {
      type: 'transfer',
      label: 'Send Tokens',
      // ... token transfer action
    },
    {
      type: 'dynamic',
      label: 'Token Analytics',
      // ... analytics action
    },
    {
      type: 'flow',
      label: 'Token Launch',
      // ... token launch flow
    },
  ],
};

const validated = createMetadata(socialApp);
```

## Best Practices

1. **Keep it Simple**
   - Use clear, descriptive titles
   - Write concise descriptions
   - Limit the number of actions

2. **Security**
   - Always use HTTPS URLs
   - Validate user inputs
   - Use appropriate access controls

3. **Performance**
   - Optimize icon size
   - Minimize action count
   - Use efficient parameter types

4. **User Experience**
   - Provide clear action labels
   - Include helpful descriptions
   - Use appropriate parameter types

## Related

- [Action Types](./actions/action-types.md)
- [Parameter System](./parameters/parameter-types.md)
- [Validation](./validation/metadata-validation.md)
- [Best Practices](./best-practices/security.md) 