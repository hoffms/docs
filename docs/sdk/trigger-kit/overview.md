---
id: overview
sidebar_position: 1
title: Overview
---

# Trigger Kit Overview

[![npm version](https://img.shields.io/npm/v/@sherrylabs/trigger-kit.svg)](https://www.npmjs.com/package/@sherrylabs/trigger-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%2B-blue)](https://reactjs.org/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue.svg)](https://github.com/SherryLabs/trigger-kit)

Trigger Kit is a **React-based toolkit** for building and integrating interactive Web3 mini-apps into your applications. It provides a complete set of components, hooks, and utilities to create seamless blockchain experiences that work across different platforms.

:::tip What is Trigger Kit?
Think of Trigger Kit as your all-in-one solution for building Web3 mini-apps that can be embedded anywhere - from social media platforms to browser extensions. It handles all the complex parts of blockchain integration, wallet connections, and UI components so you can focus on building great user experiences.
:::

## Key Features

### Core Capabilities

- **🎨 Ready-to-Use Components**: Pre-built React components for common Web3 interactions
- **🔌 Multi-Wallet Support**: Seamless integration with popular wallets like MetaMask, WalletConnect, and more
- **🌐 Cross-Platform**: Works in web apps, browser extensions, and social media platforms
- **🛠️ Developer Experience**: TypeScript-first with comprehensive documentation and examples
- **⚡ Performance Optimized**: Built with modern React patterns and optimized for performance

### Integration Types

| Integration Type | Use Case | Example |
|-----------------|----------|---------|
| **Web App** | React/Next.js applications | Embed mini-apps in your dApp |
| **Browser Extension** | Chrome/Firefox extensions | Auto-detect and enhance links |
| **Social Media** | Twitter, Discord, etc. | Interactive posts and messages |

## Technical Specifications

| Metric | Value |
|--------|-------|
| 📦 Bundle Size | ~100KB gzipped |
| 🔧 Dependencies | React 18+, wagmi, viem |
| 🧪 Test Coverage | >90% |
| 📚 TypeScript | 100% type coverage |
| ⚡ Performance | <50ms component mount |

## Getting Started

Choose your integration path:

<div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
  gap: '1rem',
  marginBottom: '2rem'
}}>
  <a 
    href="/docs/sdk/trigger-kit/guides/web-app" 
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem',
      border: '1px solid var(--ifm-color-secondary)',
      borderRadius: '8px',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    }}
  >
    <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌐</span>
    <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Web App Integration</h4>
    <p style={{ textAlign: 'center', fontSize: '0.9rem', margin: 0 }}>Add mini-apps to your React/Next.js application</p>
  </a>

  <a 
    href="/docs/sdk/trigger-kit/guides/browser-extension" 
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem',
      border: '1px solid var(--ifm-color-secondary)',
      borderRadius: '8px',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    }}
  >
    <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔌</span>
    <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Browser Extension</h4>
    <p style={{ textAlign: 'center', fontSize: '0.9rem', margin: 0 }}>Build extensions that enhance web3 links</p>
  </a>
</div>

## Support & Resources

:::info Need Help?
- **Found a bug?** [Report it on GitHub](https://github.com/SherryLabs/trigger-kit/issues)
- **Need help?** [Join our Discord](https://discord.gg/sherry)
- **Want to contribute?** [Check our contribution guide](https://github.com/SherryLabs/trigger-kit/blob/main/CONTRIBUTING.md)
::: 