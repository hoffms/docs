---
id: dynamic-actions
sidebar_position: 4
title: Dynamic Actions
---

# Dynamic Actions

> 🚧 **Under Construction**
>
> This documentation is currently being written. Dynamic Actions allow you to create server-computed actions with complex business logic.

Dynamic Actions provide flexibility by allowing server-side computation of action parameters and logic. They're ideal for complex scenarios where the action details need to be computed based on various factors.

## Example

```typescript
const dynamicAction: Metadata = {
  url: 'https://myapp.example',
  icon: 'https://example.com/icon.png',
  title: 'Dynamic Swap',
  description: 'Smart token swapping',
  baseUrl: 'https://myapp.example',
  actions: [
    {
      type: 'dynamic',
      label: 'Smart Swap',
      path: '/api/swap',
      chains: { source: 'avalanche' },
      params: [
        {
          name: 'amount',
          label: 'Amount to Swap',
          type: 'number',
          required: true,
        },
      ],
    },
  ],
};
```

Coming soon:
- Complete interface documentation
- Server-side computation examples
- Dynamic parameter generation
- State management
- Performance optimization 