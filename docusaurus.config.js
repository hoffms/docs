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
      indexName: 'sherry-docs',
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
        },
        {
          to: '/contracts/overview',
          label: 'Contracts',
          position: 'left',
        },
        {
          to: '/sdk/trigger-sdk/overview',
          label: 'SDKs',
          position: 'left',
        },
        {
          to: '/api/overview',
          label: 'APIs',
          position: 'left',
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
          to: 'https://github.com/SherryLabs/',
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
          ],
        },
        {
          title: 'GitHub',
          items: [
            {
              label: 'sherry-sdk',
              href: 'https://github.com/SherryLabs/sherry-sdk',
            },
            {
              label: 'sherry-contracts',
              href: 'https://github.com/SherryLabs/sherry-contracts',
            },
            {
              label: 'sherrylinks-examples',
              href: 'https://github.com/SherryLabs/sherrylinks-examples',
            },
            {
              label: 'sherry-example',
              href: 'https://github.com/SherryLabs/sherry-example',
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
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Blog',
              href: 'https://medium.com/@sherry.social',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/SherryProtocol',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/sherrylabs',
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
          editUrl: 'https://github.com/hoffms/docs/tree/main/',
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
          // Removed SDK v3 redirects as they are no longer needed
        ],
      },
    ],
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
      },
    },
  },
}
