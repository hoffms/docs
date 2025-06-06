---
id: transfer-actions
sidebar_position: 2
title: Transfer Actions
---

# Transfer Actions

> 🚧 **Under Construction**
>
> This documentation is currently being written. Transfer Actions allow you to send native tokens (like AVAX, ETH, CELO) between addresses.

Transfer Actions are used to send native tokens (like AVAX, ETH, CELO) between addresses. They're the simplest type of action in the SDK, perfect for basic token transfers.

## Example

```typescript
const transferAction: Metadata = {
  url: 'https://myapp.example',
  icon: 'https://example.com/icon.png',
  title: 'Send AVAX',
  description: 'Quick AVAX transfer',
  actions: [
    {
      type: 'transfer',
      label: 'Send 0.1 AVAX',
      to: '0x1234567890123456789012345678901234567890',
      amount: 0.1,
      chains: { source: 'avalanche' },
    },
  ],
};
```

Coming soon:
- Complete interface documentation
- Examples for different use cases
- Parameter configuration
- Chain support
- Best practices 