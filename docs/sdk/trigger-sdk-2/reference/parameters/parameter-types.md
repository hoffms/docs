---
id: parameter-types
sidebar_position: 1
title: Parameter Types
---

# Parameter Types

> 🚧 **Under Construction**
>
> This documentation is currently being written. Parameter Types define the different ways users can input data in your mini-app.

Parameters define the inputs a user provides when executing actions. They control the UI generation and validation for each required field.

## Base Parameter Interface

All parameters extend from `BaseParameter`:

```typescript
interface BaseParameter {
  name: string;      // Parameter identifier
  label: string;     // UI label
  type: string;      // Input type
  required?: boolean; // Is mandatory?
  description?: string; // Help text
  fixed?: boolean;   // Is non-editable?
  value?: any;       // Default/fixed value
}
```

## Standard Parameter Types

### Text Input
```typescript
{
  name: 'message',
  label: 'Your Message',
  type: 'text',
  required: true,
  minLength: 5,
  maxLength: 100
}
```

### Number Input
```typescript
{
  name: 'amount',
  label: 'Amount',
  type: 'number',
  required: true,
  min: 0.01,
  max: 1000
}
```

### Address Input
```typescript
{
  name: 'recipient',
  label: 'Recipient Address',
  type: 'address',
  required: true
}
```

### Boolean Input
```typescript
{
  name: 'confirm',
  label: 'I agree to terms',
  type: 'boolean',
  required: true
}
```

## Selection Parameter Types

### Select Parameter (Dropdown)
```typescript
{
  name: 'token',
  label: 'Select Token',
  type: 'select',
  required: true,
  options: [
    { label: 'USDC', value: '0xUSDCAddress', description: 'USD Coin' },
    { label: 'USDT', value: '0xUSDTAddress', description: 'Tether USD' }
  ]
}
```

### Radio Parameter
```typescript
{
  name: 'priority',
  label: 'Priority Level',
  type: 'radio',
  required: true,
  options: [
    { label: 'Low', value: 'low', description: 'Standard processing' },
    { label: 'High', value: 'high', description: 'Priority processing' }
  ]
}
```

Coming soon:
- Custom parameter types
- Validation rules
- UI rendering guidelines 