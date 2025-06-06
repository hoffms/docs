---
id: http-actions
sidebar_position: 3
title: HTTP Actions
---

# HTTP Actions

> 🚧 **Under Construction**
>
> This documentation is currently being written. HTTP Actions allow you to make API calls to external services and handle server-side logic.

HTTP Actions enable your mini-app to interact with external APIs and services. They're perfect for integrating with backend services, third-party APIs, or your own server endpoints.

## Example

```typescript
const httpAction: Metadata = {
  url: 'https://myapp.example',
  icon: 'https://example.com/icon.png',
  title: 'Submit Feedback',
  description: 'Send feedback to our API',
  actions: [
    {
      type: 'http',
      label: 'Submit Feedback',
      path: 'https://api.example.com/feedback',
      params: [
        {
          name: 'message',
          label: 'Your Message',
          type: 'textarea',
          required: true,
        },
        {
          name: 'rating',
          label: 'Rating',
          type: 'select',
          required: true,
          options: [
            { label: '⭐', value: 1 },
            { label: '⭐⭐⭐⭐⭐', value: 5 },
          ],
        },
      ],
    },
  ],
};
```

Coming soon:
- Complete interface documentation
- API integration examples
- Request/response handling
- Error handling
- Security best practices 