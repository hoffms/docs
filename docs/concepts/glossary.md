---
id: glossary
title: Glossary
sidebar_position: 6
---

This glossary provides definitions for key terms and concepts used throughout the Sherry documentation.

## A

**Action**
A modular, declarative unit that defines what a Trigger dApp can do. Sherry supports four types of actions: Dynamic Actions, Blockchain Actions, Transfer Actions, and Flow Actions. Each action represents a specific task users can perform, such as sending tokens, calling smart contracts, or initiating multi-step workflows.

## B

**Blockchain Action**
A type of Trigger action that enables direct interaction with smart contracts. It requires an ABI and contract address, and executes specific functions on the blockchain. Used for operations like minting NFTs, voting in DAOs, or other contract interactions.

## C

**Chain Context**
The configuration that defines which blockchain(s) an action operates on. It includes a required `source` chain and an optional `destination` chain for cross-chain operations.

**Cross-Chain Operation**
A blockchain interaction that spans multiple networks, facilitated by the Wormhole protocol in Sherry. Enables operations like bridging assets between chains (e.g., Avalanche to Celo) while handling gas costs and message relaying automatically.

## D

**Dynamic Action**
A type of Trigger action designed for complex use cases requiring server-side logic. The backend dynamically constructs transactions based on user input, external data, or business rules. Ideal for DeFi strategies, dynamic pricing, or AI-powered recommendations.

## F

**Flow Action**
A type of Trigger action that enables multi-step workflows with conditional branching. Used to create complex user journeys that combine multiple blockchain operations.

## M

**Metadata**
A structured JSON (or TypeScript) object that defines a Trigger dApp's behavior, actions, and user interactions. It includes app metadata (URL, icon, title), chain configuration, and a list of available actions. Must be validated using the SDK's validation functions.

## P

**Parameter**
A configurable input field that defines what information users need to provide to execute an action. Parameters can be of different types (address, string, number, select, radio) and include validation rules.

## S

**Sherry**
A Web3 developer ecosystem and platform designed to make Trigger dApps easy to create, deploy, and use directly within social media feeds. Consists of several components:
- **Sherry Labs**: The company developing the Trigger Protocol
- **Trigger Protocol**: The developer toolkit and infrastructure
- **Sherry Studio**: Platform for creating Triggers (TBA)
- **Sherry Marketplace**: Web interface for Trigger interactions (TBA)
- **Sherry Extension**: Browser extension for social media integration (TBA)

## T

**Transfer Action**
A type of Trigger action designed for native token transfers (e.g., AVAX, ETH, CELO). Uses configuration objects for amount and recipient instead of parameters, with built-in UI components.

**Trigger dApp**
A modular, metadata-defined mini-application that enables Web3 interactions. Triggers are portable, composable, and executable across different environments (wallets, browser extensions, social platforms) without requiring custom frontend implementation.

**Trigger Protocol**
The comprehensive developer toolkit and infrastructure for creating, deploying, and interacting with Trigger dApps. Includes tools like the TriggerSDK, Debugger, and Chat interface for development.

## V

**ValidatedMetadata**
The processed and validated version of a Trigger dApp's metadata, returned by the `createMetadata` function. Includes additional processed information and ensures the metadata is correctly structured for reliable execution.

**ValidationResult**
The output of the `validateMetadata` function, indicating whether the metadata is valid and providing detailed error information if validation fails. Includes the path to any errors and descriptive messages.


