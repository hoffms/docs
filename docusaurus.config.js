const math = require('remark-math')
const katex = require('rehype-katex')
require('dotenv').config()

module.exports = {
  customFields: {
    // Analytics proxy URL
    analyticsProxyUrl: process.env.REACT_APP_AMPLITUDE_PROXY_URL,
    // Determines if staging env
    stagingEnv: process.env.REACT_APP_STAGING,
    // From node
    nodeEnv: process.env.NODE_ENV,
  },
  title: 'Sherry',
  tagline: 'Documentation and Guides',
  url: 'https://hoffms.github.io',
  baseUrl: '/docs/',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'ignore',
  favicon: 'img/sherry-favicon.png',
  organizationName: 'hoffms', // GitHub org/user name
  projectName: 'docs', // GitHub repo name
  deploymentBranch: 'gh-pages',
  themeConfig: {
    image: 'img/twitter_card_bg.jpg',
    prism: {
      additionalLanguages: ['solidity'],
    },
    algolia: {
      apiKey: '32465e2ab6f7554ff014e64c0d92171c',
      indexName: 'v3-docs',
      appId: 'S0IDD0YGLZ',
    },
    navbar: {
      title: '',
      logo: {
        alt: 'Sherry Logo',
        src: 'img/sherry_black_logo.svg',
        srcDark: 'img/sherry_white_logo.svg',
      },
      items: [
        {
          to: '/concepts/overview',
          label: 'Concepts',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/contracts/v4/overview',
          label: 'Contracts',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/sdk/trigger-sdk/overview',
          label: 'SDKs',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/api/overview',
          label: 'APIs',
          position: 'left',
          className: 'V3_active',
        },
        {
          label: 'Minithon',
          to: 'https://sherry.social/minithon',
          position: 'right',
          className: 'persistent',
        },
        {
          label: 'Sherry Labs',
          to: 'https://sherry.social/',
          position: 'right',
          className: 'persistent',
        },
        {
          label: 'GitHub',
          to: 'https://github.com/sherrylabs/',
          position: 'right',
          className: 'persistent',
        },
      ],
    },
    footer: {
      // style: "dark",
      links: [
        {
          title: 'Developers',
          items: [
            {
              label: 'Dev Chat',
              href: 'https://discord.com/invite/sherry',
            },
            {
              label: 'Feedback',
              href: 'https://forms.gle/13XtjmkwdXQ2jMn26',
            },
            {
              label: 'Bug Bounty',
              href: 'https://sherry.social/bug-bounty',
            },
            {
              label: 'Whitepaper',
              href: 'https://sherry.social/whitepaper.pdf',
            },
          ],
        },
        {
          title: 'GitHub',
          items: [
            {
              label: 'sherry-core',
              href: 'https://github.com/sherrylabs/core',
            },
            {
              label: 'sherry-sdk',
              href: 'https://github.com/sherrylabs/sdk',
            },
            {
              label: 'sherry-periphery',
              href: 'https://github.com/sherrylabs/periphery',
            },
            {
              label: 'Deployment addresses',
              href: '/contracts/v4/deployments',
            },
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {
              label: 'App',
              href: 'https://app.sherry.social/',
            },
            {
              label: 'Analytics',
              href: 'https://analytics.sherry.social/',
            },
            {
              label: 'Token Lists',
              href: 'https://tokenlists.sherry.social/',
            },
            {
              label: 'Brand Assets',
              href: 'https://github.com/sherrylabs/brand-assets',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Blog',
              href: 'https://blog.sherry.social/',
            },
            {
              label: 'Governance',
              href: 'https://gov.sherry.social/',
            },
            {
              label: 'Sherry Labs Twitter',
              href: 'https://twitter.com/sherrylabs',
            },
            {
              label: 'Sherry Foundation Twitter',
              href: 'https://x.com/sherryfnd',
            },
          ],
        },
      ],
      // copyright: `unlicensed`,
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: 'dark',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: true,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
          editUrl: 'https://github.com/uniswap/uniswap-docs/tree/main/',
          includeCurrentVersion: true,
        },
        blog: {
          remarkPlugins: [math],
          rehypePlugins: [katex],
          path: 'blog/',
          blogTitle: 'Engineering Blog',
          blogSidebarCount: 0,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
          customCss2: require.resolve('./src/css/colors.css'),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  plugins: [
    ['@saucelabs/theme-github-codeblock', {}],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/sdk/v3/guides/background',
            from: '/sdk/v3/guides/quick-start',
          },
          {
            to: '/sdk/v3/guides/swaps/quoting',
            from: ['/sdk/v3/guides/creating-a-pool', '/sdk/v3/guides/fetching-prices'],
          },
          {
            to: '/sdk/v3/guides/swaps/trading',
            from: ['/sdk/v3/guides/creating-a-trade', '/sdk/guides/creating-a-trade'],
          },
          {
            to: '/sdk/v3/guides/swaps/routing',
            from: '/sdk/v3/guides/auto-router',
          },
          {
            to: '/sdk/v3/guides/liquidity/modifying-position',
            from: ['/sdk/v3/guides/liquidity/adding', '/sdk/v3/guides/liquidity/removing'],
          }
        ],
      },
    ],
  ],
}
