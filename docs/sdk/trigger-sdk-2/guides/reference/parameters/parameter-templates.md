---
id: parameter-templates
sidebar_position: 2
title: Parameter Templates
---

# Parameter Templates

> 🚧 **Under Construction**
>
> This documentation is currently being written. Parameter Templates provide pre-built configurations for common parameter patterns.

Parameter Templates are predefined configurations that make it easy to create common parameter types. They help maintain consistency and reduce boilerplate code.

## Using Templates

Use the `createParameter` function with predefined templates:

```typescript
import { PARAM_TEMPLATES, createParameter } from '@sherrylinks/sdk';

// Address parameter
const recipientParam = createParameter(PARAM_TEMPLATES.ADDRESS, {
  name: 'recipient',
  label: 'Destination Address',
});

// Amount parameter
const amountParam = createParameter(PARAM_TEMPLATES.AMOUNT, {
  name: 'transferAmount',
  label: 'Amount to Send',
  min: 0.01,
});

// Yes/No selection
const confirmParam = createParameter(PARAM_TEMPLATES.YES_NO, {
  name: 'confirmation',
  label: 'Confirm transaction?',
});
```

## Available Templates

The SDK provides several built-in templates for common use cases:

- `ADDRESS` - Ethereum address input
- `AMOUNT` - Numeric amount for transfers
- `EMAIL` - Email address input
- `TEXT` - Basic text input
- `BOOLEAN` - Boolean checkbox
- `YES_NO` - Yes/No radio selection
- `TOKEN_SELECT` - Common token dropdown

Coming soon:
- Template customization
- Common use cases
- Best practices
- Creating custom templates 