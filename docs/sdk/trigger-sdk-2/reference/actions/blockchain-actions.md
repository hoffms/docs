---
id: blockchain-actions
sidebar_position: 1
title: Blockchain Actions
---

# Blockchain Actions

Blockchain Actions allow you to interact with smart contracts on various blockchains. They're the most powerful action type in the Sherry SDK, enabling complex DeFi interactions, NFT operations, and DAO governance.

## Interface

```typescript
interface BlockchainActionMetadata {
  // Required Properties
  type: 'blockchain';           // Action type identifier
  label: string;                // Button text shown to users
  address: `0x${string}`;       // Smart contract address
  abi: Abi;                     // Contract ABI
  functionName: string;         // Function name to call
  chains: ChainContext;         // Source blockchain

  // Optional Properties
  amount?: number;              // Native token amount for payable functions
  params?: Parameter[];         // Function parameters
  description?: string;         // Action description
}
```

## Required Properties

### `type`
Always set to `'blockchain'` to indicate this is a smart contract interaction.

```typescript
const action: BlockchainActionMetadata = {
  type: 'blockchain',
  // ... other properties
};
```

### `label`
User-facing text displayed on the action button. Keep it clear and concise.

```typescript
const action: BlockchainActionMetadata = {
  label: 'Mint NFT',
  // ... other properties
};
```

### `address`
The Ethereum-format address of the smart contract to interact with.

```typescript
const action: BlockchainActionMetadata = {
  address: '0x742d35Cc6734C0532925a3b8D4ccd306f6F4B26C',
  // ... other properties
};
```

### `abi`
The ABI (Application Binary Interface) of the smart contract. Must include at least the function you're calling.

```typescript
const action: BlockchainActionMetadata = {
  abi: [
    {
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'tokenURI', type: 'string' }
      ],
      name: 'mint',
      outputs: [{ name: 'tokenId', type: 'uint256' }],
      stateMutability: 'payable',
      type: 'function'
    }
  ],
  // ... other properties
};
```

### `functionName`
The exact name of the contract function to execute.

```typescript
const action: BlockchainActionMetadata = {
  functionName: 'mint',
  // ... other properties
};
```

### `chains`
Blockchain configuration specifying where the transaction will be executed.

```typescript
const action: BlockchainActionMetadata = {
  chains: { source: 'avalanche' },
  // ... other properties
};
```

## Optional Properties

### `amount`
Native token amount to send with the transaction (for payable functions).

```typescript
const action: BlockchainActionMetadata = {
  amount: 0.1, // Send 0.1 AVAX with the transaction
  // ... other properties
};
```

### `params`
User input parameters that map to contract function arguments.

```typescript
const action: BlockchainActionMetadata = {
  params: [
    {
      name: 'to',
      label: 'Recipient Address',
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
  // ... other properties
};
```

### `description`
Additional information about the action displayed to users.

```typescript
const action: BlockchainActionMetadata = {
  description: 'Mint a new NFT for 0.1 AVAX',
  // ... other properties
};
```

## Supported Chains

| Chain       | Network           | Type    | Chain ID |
|------------|-------------------|---------|----------|
| `avalanche` | Avalanche C-Chain | Mainnet | 43114    |
| `celo`      | Celo              | Mainnet | 42220    |
| `ethereum`  | Ethereum          | Mainnet | 1        |
| `fuji`      | Avalanche Fuji    | Testnet | 43113    |
| `alfajores` | Celo Alfajores    | Testnet | 44787    |
| `sepolia`   | Ethereum Sepolia  | Testnet | 11155111 |

## Examples

### 1. Token Approval (Non-Payable Function)

```typescript
const approveAction: BlockchainActionMetadata = {
  type: 'blockchain',
  label: 'Approve USDC',
  address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', // USDC on Avalanche
  abi: erc20Abi,
  functionName: 'approve',
  chains: { source: 'avalanche' },
  params: [
    {
      name: 'spender',
      label: 'Spender Address',
      type: 'address',
      required: true,
    },
    {
      name: 'amount',
      label: 'Amount to Approve',
      type: 'number',
      required: true,
      min: 0,
    },
  ],
};
```

### 2. NFT Minting (Payable Function)

```typescript
const mintAction: BlockchainActionMetadata = {
  type: 'blockchain',
  label: 'Mint NFT',
  description: 'Mint a new NFT for 0.1 AVAX',
  address: '0x742d35Cc6734C0532925a3b8D4ccd306f6F4B26C',
  abi: nftAbi,
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
};
```

### 3. DAO Voting

```typescript
const voteAction: BlockchainActionMetadata = {
  type: 'blockchain',
  label: 'Vote on Proposal',
  description: 'Cast your vote on the current proposal',
  address: '0xDaoGovernanceContract',
  abi: daoAbi,
  functionName: 'castVote',
  chains: { source: 'ethereum' },
  params: [
    {
      name: 'proposalId',
      label: 'Proposal ID',
      type: 'number',
      required: true,
    },
    {
      name: 'support',
      label: 'Your Vote',
      type: 'radio',
      required: true,
      options: [
        { label: 'For', value: 1 },
        { label: 'Against', value: 0 },
        { label: 'Abstain', value: 2 },
      ],
    },
  ],
};
```

## Advanced Features

### Parameter Templates

Use built-in templates for common parameter patterns:

```typescript
import { PARAM_TEMPLATES, createParameter } from '@sherrylinks/sdk';

const params = [
  createParameter(PARAM_TEMPLATES.ADDRESS, {
    name: 'recipient',
    label: 'Token Recipient',
  }),
  createParameter(PARAM_TEMPLATES.AMOUNT, {
    name: 'tokenAmount',
    label: 'Tokens to Send',
    min: 0.01,
  }),
];
```

### Special Values

Some parameters accept special values:

```typescript
{
  name: 'to',
  label: 'Recipient',
  type: 'address',
  value: 'sender' // Special value: resolves to current user's address
}
```

### Complex Parameter Types

For advanced use cases:

```typescript
// Array parameter (as JSON string)
{
  name: 'recipients',
  label: 'Recipients',
  type: 'text',
  value: '["0x123...abc", "0x456...def"]',
  description: 'JSON array of recipient addresses'
}

// Bytes parameter (hex-encoded)
{
  name: 'data',
  label: 'Transaction Data',
  type: 'text',
  pattern: '^0x[a-fA-F0-9]*$',
  description: 'Hex-encoded transaction data'
}
```

## Validation & Error Handling

The SDK validates blockchain actions to ensure they're properly configured:

```typescript
import { createMetadata } from '@sherrylinks/sdk';

try {
  const validated = createMetadata({
    url: 'https://myapp.com',
    icon: 'https://myapp.com/icon.png',
    title: 'My Blockchain App',
    description: 'Interact with smart contracts',
    actions: [blockchainAction],
  });

  console.log('✅ Action validated successfully');
} catch (error) {
  console.error('❌ Validation failed:', error);
}
```

### Validation Rules

1. **Contract Validation**
   - Address must be a valid Ethereum address
   - ABI must be valid and include the specified function
   - Function must exist in the ABI
   - Function parameters must match ABI inputs

2. **Chain Validation**
   - Source chain must be supported
   - Chain must be appropriate for the contract

3. **Parameter Validation**
   - Parameters must match function signature
   - Required parameters must be provided
   - Parameter types must be valid
   - Amount must be positive for payable functions

## Best Practices

1. **Security**
   - Always verify contract addresses
   - Use appropriate access controls
   - Validate user inputs
   - Consider gas limits

2. **User Experience**
   - Provide clear labels and descriptions
   - Use appropriate parameter types
   - Include helpful error messages
   - Consider gas costs

3. **Performance**
   - Minimize parameter count
   - Use efficient parameter types
   - Consider gas optimization
   - Cache ABIs when possible

## Related

- [Metadata](./metadata.md)
- [Parameter System](./parameters/parameter-types.md)
- [Chain Configuration](./chains.md)
- [Validation](./validation/action-validation.md)
- [Best Practices](./best-practices/security.md) 