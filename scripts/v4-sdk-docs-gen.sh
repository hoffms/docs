#!/bin/bash

# Generate SDK documentation for Sherry Protocol
# This script generates TypeScript documentation for the Sherry SDK

# Exit on error
set -e

# Clean up any existing docs
rm -rf docs/sdk

# Generate docs
npx typedoc --out docs/sdk \
  --excludePrivate \
  --excludeProtected \
  --excludeExternals \
  --theme default \
  --name "Sherry SDK" \
  --readme none \
  packages/sdk/src

echo "SDK documentation generated successfully!"
