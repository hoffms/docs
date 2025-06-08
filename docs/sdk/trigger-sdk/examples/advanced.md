---
id: advanced-examples
sidebar_position: 3
title: Advanced Examples
---

# 🔴 Advanced Examples

Complex mini-apps with server-side logic and optimization.

## 1. AI-Powered Yield Optimizer

**⏱️ Setup: 30 minutes** | **Action Type: Dynamic**

Server calculates optimal DeFi yield strategies across multiple protocols.

```typescript
const yieldOptimizerApp: Metadata = {
  url: 'https://yield-optimizer.com',
  icon: '🤖',
  title: 'AI Yield Optimizer',
  description: 'Maximize your DeFi yields with AI-powered strategies',
  baseUrl: 'https://api.yield-optimizer.com',
  actions: [
    {
      type: 'dynamic',
      label: 'Optimize My Yield',
      path: '/api/calculate-optimal-yield',
      chains: { source: 'avalanche' },
      params: [
        {
          name: 'amount',
          label: 'Investment Amount (USDC)',
          type: 'number',
          required: true,
          min: 100,
          max: 1000000,
          description: 'Minimum $100 for optimal strategy calculation',
        },
        {
          name: 'riskTolerance',
          label: 'Risk Tolerance',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Conservative (3-5% APY)',
              value: 'low',
              description: 'Stable protocols only, lower risk',
            },
            {
              label: 'Moderate (5-12% APY)',
              value: 'medium',
              description: 'Balanced risk/reward approach',
            },
            {
              label: 'Aggressive (12%+ APY)',
              value: 'high',
              description: 'Higher risk for maximum returns',
            },
          ],
        },
        {
          name: 'timeHorizon',
          label: 'Investment Duration',
          type: 'radio',
          required: true,
          options: [
            { label: '1 Week', value: 7, description: 'Short-term gains' },
            { label: '1 Month', value: 30, description: 'Medium-term strategy' },
            { label: '3 Months', value: 90, description: 'Long-term optimization' },
            { label: '1 Year', value: 365, description: 'Maximum compounding' },
          ],
        },
        {
          name: 'autoCompound',
          label: 'Auto-compound rewards',
          type: 'boolean',
          value: true,
          description: 'Automatically reinvest rewards for compound growth',
        },
      ],
    },
  ],
};
```

**Backend Implementation (Next.js API Route):**

```typescript
// pages/api/calculate-optimal-yield.ts
import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'wagmi';
import { avalanche } from 'viem/chains';
import { ExecutionResponse } from '@sherrylinks/sdk';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const amount = parseFloat(searchParams.get('amount') || '0');
    const riskTolerance = searchParams.get('riskTolerance');
    const timeHorizon = parseInt(searchParams.get('timeHorizon') || '30');
    const autoCompound = searchParams.get('autoCompound') === 'true';

    // 🧠 AI-POWERED YIELD CALCULATION
    const protocols = await fetchProtocolYields();
    const filteredProtocols = filterByRisk(protocols, riskTolerance);
    const optimalStrategy = await calculateOptimalAllocation({
      protocols: filteredProtocols,
      amount,
      timeHorizon,
      autoCompound,
    });

    // Build optimized transaction
    const transaction = await buildYieldTransaction(optimalStrategy);
    const serializedTx = serialize(transaction);

    const response: ExecutionResponse = {
      serializedTransaction: serializedTx,
      chainId: 'avalanche',
      params: {
        functionName: 'executeYieldStrategy',
        args: {
          strategy: optimalStrategy.name,
          expectedAPY: `${optimalStrategy.projectedAPY}%`,
          protocols: optimalStrategy.protocols.join(', '),
          projectedValue: `$${(amount * (1 + optimalStrategy.projectedAPY / 100)).toFixed(2)} after ${timeHorizon} days`,
        },
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Yield calculation failed' }, { status: 500 });
  }
}

// AI yield calculation functions
async function fetchProtocolYields() {
  // Fetch real-time yields from Aave, Compound, Yearn, etc.
  const protocols = await Promise.all([
    fetch('https://api.aave.com/data/liquidity/v1').then(r => r.json()),
    fetch('https://api.compound.finance/api/v2/ctoken').then(r => r.json()),
    fetch('https://api.yearn.finance/v1/chains/1/vaults/all').then(r => r.json()),
  ]);
  return protocols.flat();
}

function filterByRisk(protocols: any[], risk: string) {
  const riskThresholds = { low: 3, medium: 6, high: 10 };
  return protocols.filter(p => p.riskScore <= riskThresholds[risk]);
}

async function calculateOptimalAllocation(config: any) {
  // Portfolio optimization algorithm (Markowitz, Black-Litterman, etc.)
  return {
    name: 'Multi-Protocol Yield Strategy',
    protocols: ['Aave USDC', 'Compound DAI', 'Yearn USDT'],
    allocation: [0.4, 0.35, 0.25],
    projectedAPY: 8.7,
    riskScore: 4.2,
  };
}
```

**🎯 What you'll learn:**

- Complex Dynamic Action implementation
- Server-side AI/ML integration
- Multi-protocol yield optimization
- Real-time data processing
- Advanced parameter handling

## 2. Dynamic NFT Pricing Engine

**⏱️ Setup: 25 minutes** | **Action Type: Dynamic**

NFT pricing that adapts to market conditions, demand, and whale activity.

```typescript
const dynamicNFTApp: Metadata = {
  url: 'https://dynamic-nft.com',
  icon: '💎',
  title: 'Smart NFT Mint',
  description: 'AI-powered dynamic pricing based on market conditions',
  baseUrl: 'https://api.dynamic-nft.com',
  actions: [
    {
      type: 'dynamic',
      label: 'Mint at Current Price',
      path: '/api/calculate-nft-price',
      chains: { source: 'avalanche' },
      params: [
        {
          name: 'tier',
          label: 'NFT Tier',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Common ⚪',
              value: 'common',
              description: 'Basic tier with standard traits',
            },
            {
              label: 'Rare 🔵',
              value: 'rare',
              description: 'Enhanced traits and special effects',
            },
            {
              label: 'Epic 🟣',
              value: 'epic',
              description: 'Unique animations and rare attributes',
            },
            {
              label: 'Legendary 🟡',
              value: 'legendary',
              description: 'Ultra-rare with exclusive benefits',
            },
          ],
        },
        {
          name: 'quantity',
          label: 'Quantity',
          type: 'radio',
          required: true,
          options: [
            { label: '1 NFT', value: 1, description: 'Single mint' },
            { label: '3 NFTs', value: 3, description: '5% bulk discount' },
            { label: '5 NFTs', value: 5, description: '10% bulk discount' },
            { label: '10 NFTs', value: 10, description: '15% bulk discount' },
          ],
        },
      ],
    },
  ],
};
```

**Backend Implementation:**

```typescript
// pages/api/calculate-nft-price.ts
export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tier = searchParams.get('tier');
    const quantity = parseInt(searchParams.get('quantity') || '1');

    // 🎯 DYNAMIC PRICING ALGORITHM
    const marketData = await analyzeMarketConditions();
    const demandMetrics = await calculateDemandMetrics(tier);
    const whaleActivity = await detectWhaleActivity();

    const basePrice = getTierBasePrice(tier);
    const dynamicMultiplier = calculatePriceMultiplier({
      marketData,
      demandMetrics,
      whaleActivity,
      quantity,
    });

    const finalPrice = basePrice * dynamicMultiplier * quantity;
    const bulkDiscount = getBulkDiscount(quantity);
    const totalPrice = finalPrice * (1 - bulkDiscount);

    // Build mint transaction with dynamic pricing
    const transaction = await buildMintTransaction({
      tier,
      quantity,
      price: totalPrice,
      recipient: searchParams.get('userAddress'),
    });

    const response: ExecutionResponse = {
      serializedTransaction: serialize(transaction),
      chainId: 'avalanche',
      params: {
        functionName: 'mintWithDynamicPrice',
        args: {
          tier: tier,
          quantity: quantity,
          currentPrice: `${totalPrice.toFixed(3)} AVAX`,
          marketCondition: marketData.condition,
          demandLevel: demandMetrics.level,
          priceChange: `${((dynamicMultiplier - 1) * 100).toFixed(1)}%`,
          bulkDiscount: `${(bulkDiscount * 100).toFixed(0)}%`,
        },
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Price calculation failed' }, { status: 500 });
  }
}

// Dynamic pricing functions
async function analyzeMarketConditions() {
  // Analyze overall NFT market, ETH price, gas fees, etc.
  return {
    condition: 'bullish', // bearish, neutral, bullish
    volatility: 0.15,
    volume24h: 1500000,
  };
}

async function calculateDemandMetrics(tier: string) {
  // Analyze recent mints, wallet interest, social sentiment
  return {
    level: 'high', // low, medium, high
    recentMints: 47,
    uniqueWallets: 156,
    socialSentiment: 0.8,
  };
}

async function detectWhaleActivity() {
  // Monitor large wallet movements and buying patterns
  return {
    recentWhaleActivity: true,
    largeWalletInterest: 0.7,
  };
}
```

**🎯 What you'll learn:**

- Real-time market analysis
- Dynamic pricing algorithms
- Whale detection systems
- Bulk discount calculations
- Market sentiment integration

## 3. Advanced Arbitrage Bot

**⏱️ Setup: 35 minutes** | **Action Type: Dynamic**

Multi-DEX arbitrage with flash loans and optimal routing.

```typescript
const arbitrageBotApp: Metadata = {
  url: 'https://arbitrage-bot.com',
  icon: '⚡',
  title: 'Flash Arbitrage Bot',
  description: 'Execute profitable arbitrage opportunities across DEXs',
  baseUrl: 'https://api.arbitrage-bot.com',
  actions: [
    {
      type: 'dynamic',
      label: 'Find & Execute Arbitrage',
      path: '/api/find-arbitrage',
      chains: { source: 'avalanche' },
      params: [
        {
          name: 'tokenPair',
          label: 'Token Pair',
          type: 'select',
          required: true,
          options: [
            {
              label: 'AVAX/USDC',
              value: 'AVAX_USDC',
              description: 'Most liquid pair with frequent opportunities',
            },
            {
              label: 'AVAX/USDT',
              value: 'AVAX_USDT',
              description: 'High volume, good for large trades',
            },
            {
              label: 'USDC/USDT',
              value: 'USDC_USDT',
              description: 'Stable pair with smaller but consistent profits',
            },
          ],
        },
        {
          name: 'maxSlippage',
          label: 'Max Slippage (%)',
          type: 'radio',
          required: true,
          options: [
            { label: '0.1%', value: 0.1, description: 'Conservative, safer trades' },
            { label: '0.5%', value: 0.5, description: 'Balanced approach' },
            { label: '1.0%', value: 1.0, description: 'Aggressive, higher profits' },
          ],
        },
        {
          name: 'minProfitThreshold',
          label: 'Minimum Profit Threshold',
          type: 'number',
          required: true,
          min: 0.01,
          max: 5.0,
          value: 0.1,
          description: 'Minimum profit % to execute trade',
        },
        {
          name: 'useFlashLoan',
          label: 'Use Flash Loans',
          type: 'boolean',
          value: true,
          description: 'Enable flash loans for capital-free arbitrage',
        },
      ],
    },
  ],
};
```

**Backend Implementation:**

```typescript
// pages/api/find-arbitrage.ts
export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tokenPair = searchParams.get('tokenPair');
    const maxSlippage = parseFloat(searchParams.get('maxSlippage') || '0.5');
    const minProfitThreshold = parseFloat(searchParams.get('minProfitThreshold') || '0.1');
    const useFlashLoan = searchParams.get('useFlashLoan') === 'true';

    // 🔍 SCAN MULTIPLE DEXs FOR ARBITRAGE OPPORTUNITIES
    const dexPrices = await scanDEXPrices(tokenPair);
    const opportunities = findArbitrageOpportunities(dexPrices, minProfitThreshold);

    if (opportunities.length === 0) {
      return NextResponse.json(
        {
          error: 'No profitable arbitrage opportunities found',
        },
        { status: 404 },
      );
    }

    // Select best opportunity
    const bestOpportunity = opportunities[0];

    // Calculate optimal trade size
    const optimalSize = calculateOptimalTradeSize(bestOpportunity, maxSlippage);

    // Build arbitrage transaction
    const transaction = useFlashLoan
      ? await buildFlashLoanArbitrage(bestOpportunity, optimalSize)
      : await buildDirectArbitrage(bestOpportunity, optimalSize);

    const response: ExecutionResponse = {
      serializedTransaction: serialize(transaction),
      chainId: 'avalanche',
      params: {
        functionName: useFlashLoan ? 'executeFlashArbitrage' : 'executeDirectArbitrage',
        args: {
          pair: tokenPair,
          buyDEX: bestOpportunity.buyDEX,
          sellDEX: bestOpportunity.sellDEX,
          tradeSize: `${optimalSize} tokens`,
          expectedProfit: `${bestOpportunity.profitPercent.toFixed(2)}%`,
          estimatedGain: `${((optimalSize * bestOpportunity.profitPercent) / 100).toFixed(2)}`,
          flashLoan: useFlashLoan,
        },
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Arbitrage calculation failed' }, { status: 500 });
  }
}

async function scanDEXPrices(tokenPair: string) {
  // Scan TraderJoe, Pangolin, SushiSwap, etc.
  const dexAPIs = [
    'https://api.traderjoe.xyz/v1/prices',
    'https://api.pangolin.exchange/v1/prices',
    'https://api.sushi.com/v1/prices',
  ];

  const prices = await Promise.all(
    dexAPIs.map(api => fetch(`${api}/${tokenPair}`).then(r => r.json())),
  );

  return prices;
}
```

**🎯 What you'll learn:**

- Multi-DEX price scanning
- Flash loan implementation
- Optimal trade sizing
- Gas cost optimization
- Real-time opportunity detection 