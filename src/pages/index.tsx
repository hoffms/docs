import './styles.module.css'

import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styled from '@emotion/styled'
import Discord from '@site/static/img/discord.svg'
import GitHub from '@site/static/img/github.svg'
import MinithonImage from '@site/static/img/minithon.png'
import Layout from '@theme/Layout'
import ThemedImage from '@theme/ThemedImage'
import React from 'react'
import { ArrowUpRight as LinkIcon, BookOpen, HelpCircle, Info, MessageCircle } from 'react-feather'

import SearchBar from '../theme/SearchBar'

export const actions = [
  {
    title: 'What is Sherry',
    icon: Info,
    to: '/concepts/overview',
    text: `Learn about Sherry and how it enables automated Triggers and mini-apps on social media and wallets.`,
  },
  {
    title: 'Create a Mini-App',
    icon: HelpCircle,
    to: '/sdk/trigger-sdk/overview',
    text: `Learn with guided examples how to create your mini-app with Trigger SDK, debug and publish it.`,
  },
  {
    title: 'Integrate Triggers',
    icon: BookOpen,
    to: '/sdk/trigger-sdk/overview',
    text: `Learn how to integrate Triggers into your social media, wallet, and other platforms.`,
  },
]

export const developerLinks = [
  {
    title: 'trigger-sdk',
    href: 'https://github.com/SherryLabs/sherry-sdk',
    icon: GitHub,
  },
  {
    title: 'sherry-contracts',
    href: 'https://github.com/SherryLabs/sherry-contracts',
    icon: GitHub,
  },
  {
    title: 'poap-trigger-example',
    href: 'https://github.com/SherryLabs/sherry-denver-quest',
    icon: GitHub,
  },
  {
    title: 'Dinamic Action example',
    href: 'https://github.com/SherryLabs/sherry-example',
    icon: GitHub,
  },
]

export const dAppGuides = [
  {
    title: 'Fetch token prices',
    text: 'Fetch the price of tokens in a specific Pool',
    to: '/sdk/trigger-sdk/guides/swaps/quoting',
  },
  {
    title: 'Create a Trade',
    text: 'Fetch a Quote for a Trade and execute the Trade',
    to: '/sdk/trigger-sdk/guides/swaps/trading',
  },
  {
    title: 'Route trades',
    text: 'Use Routing to get optimized prices for your Trades',
    to: '/sdk/trigger-sdk/guides/swaps/routing',
  },
  {
    title: 'Create a Trigger',
    text: 'Learn how to create and deploy custom Triggers',
    to: '/sdk/trigger-sdk/guides/triggers/creating',
  },
]
export const sherryGuides = [
  {
    title: 'Quick Start',
    text: 'Get up and running with Sherry SDK in minutes - create your first mini-app and validate your setup',
    to: '/sdk/trigger-sdk-2/quickstart',
  },
  {
    title: 'Build a Mini-App',
    text: 'Learn how to create a complete mini-app with Next.js, from simple transfers to smart contract interactions',
    to: '/sdk/trigger-sdk-2/guides/guide-en',
  },
  {
    title: 'Basic Mini-App Guide',
    text: 'Create more complex mini-apps with multiple actions and user inputs',
    to: '/sdk/trigger-sdk-2/guides/basic-mini-app',
  },
  {
    title: 'UI Integration',
    text: 'Integrate TriggerKit into your React and Next.js applications with pre-built components',
    to: '/sdk/trigger-kit/guides/trigger-ui',
  },
  {
    title: 'Examples & Templates',
    text: 'Explore complete examples from beginner to advanced, including full application implementations',
    to: '/sdk/trigger-sdk/examples/examples',
  },
]

export const sherryTools = [
  {
    title: 'Debugger',
    text: 'Test and validate your Trigger metadata with our visual debugging tool',
    to: 'https://app.sherry.social/debugger',
  },
]

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  justify-content: center;
  margin: 0 auto;
  padding: 1rem 0;
  max-width: 960px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    max-width: 100%;
    margin: 0 1rem;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const TwoRow = styled(Row)`
  grid-template-columns: 1fr 1fr;
  grid-gap: 48px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  display: flex;
  max-height: 250px;
  min-width: 350px;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 20px;
  border: 1px solid var(--ifm-color-emphasis-200);
  /* flex: 1 1 0px; */

  &:hover {
    border: 1px solid var(--ifm-color-emphasis-400);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 960px) {
    width: 100%;
  }
`

const CenterCard = styled(Card)`
  min-width: 250px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 24px;

  h3 {
    margin-bottom: 0.25rem;
  }

  p {
    margin-bottom: 0px;
  }
`

const ShadowCard = styled(Card)`
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  background-color: #ffffff10;
  backdrop-filter: blur(10px);
  min-height: 200px;
  /* background-color: var(--ifm-color-emphasis-0); */
`

const WideCard = styled(ShadowCard)`
  max-height: auto;

  @media (max-width: 960px) {
    margin: 0 2rem;
    max-height: fit-content;
    width: fit-content;
  }
`

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 0.5rem;
`

const LinkIconWrapper = styled.div`
  opacity: 0.25;
`

const TopSection = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const LinkRow = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  a h3 {
    color: black !important;
  }
`

const DocsHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  position: relative;
`

const StyledImage = styled(ThemedImage)`
  position: relative;
  z-index: -1;
  width: 100%;
  object-fit: cover;
`

const StyledTitleImage = styled(StyledImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  position: absolute;
  opacity: 0.2;
  mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
`

const HideMedium = styled.div`
  @media (max-width: 960px) {
    display: none;
  }
`

const StyledIcon = styled.div`
  svg {
    fill: var(--ifm-font-color-base);
  }
`

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title="Sherry Docs"
      description="Technical Documentation For Sherry and the Trigger Protocol"
      image={siteConfig.themeConfig.image as string}
    >
      <Container>
        <DocsHeader>
          <div
            style={{
              padding: '4rem 0  ',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1 style={{ fontWeight: 600 }}> Welcome to Sherry Docs</h1>
            <HideMedium>
              <SearchBar />
            </HideMedium>
          </div>
          <StyledTitleImage
            sources={{
              light: useBaseUrl('/img/bpurple.png'),
              dark: useBaseUrl('/img/bpurple.png'),
            }}
          />
          <Row>
            {actions.map((action) => (
              <Link style={{ textDecoration: 'none' }} to={action.to}>
                <ShadowCard key={action.title}>
                  <TopSection>
                    <IconWrapper>
                      <action.icon style={{ width: '24px' }} />
                    </IconWrapper>
                    <LinkIconWrapper>
                      <LinkIcon />
                    </LinkIconWrapper>
                  </TopSection>
                  <h3 style={{ marginBottom: '.75rem', fontWeight: 500 }}>{action.title}</h3>
                  <p style={{ marginBottom: '0.5rem', fontWeight: 300 }}>{action.text}</p>
                </ShadowCard>
              </Link>
            ))}
          </Row>
        </DocsHeader>
        <div
          style={{
            width: '100%',
            maxWidth: '960px',
            margin: '4rem auto',
            padding: '0 1rem',
          }}
        >
          {/* <div>
            <h2>Integrate your dApp</h2>
            <p>Explore these guided tutorials to get started integrating with Sherry in your dApp.</p>
            <div>
              {dAppGuides.map((action) => (
                <Link style={{ textDecoration: 'none' }} key={action.title} to={action.to}>
                  <Card key={action.title} style={{ marginBottom: '1rem' }}>
                    <LinkRow>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h3 style={{ marginBottom: '0rem' }}>{action.title}</h3>
                      </div>
                      <LinkIconWrapper>
                        <LinkIcon />
                      </LinkIconWrapper>
                    </LinkRow>
                    <p style={{ marginBottom: '0rem', fontWeight: 300 }}>{action.text}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div> */}
          <div>
            <h2>Build with Sherry</h2>
            <p>Follow these step-by-step guides to create powerful Triggers and integrate them into your applications.</p>
            <div>
              {sherryGuides.map((action) => (
                <Link style={{ textDecoration: 'none' }} key={action.title} to={action.to}>
                  <Card key={action.title} style={{ marginBottom: '1rem' }}>
                    <LinkRow>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h3 style={{ marginBottom: '0rem' }}>{action.title}</h3>
                      </div>
                      <LinkIconWrapper>
                        <LinkIcon />
                      </LinkIconWrapper>
                    </LinkRow>
                    <p style={{ marginBottom: '0rem', fontWeight: 300 }}>{action.text}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2>Developer Tools</h2>
            <p>Use these tools to build and test your Trigger dApps.</p>
            <div>
              {sherryTools.map((action) => (
                <Link style={{ textDecoration: 'none' }} key={action.title} to={action.to}>
                  <Card key={action.title} style={{ marginBottom: '1rem' }}>
                    <LinkRow>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h3 style={{ marginBottom: '0rem' }}>{action.title}</h3>
                      </div>
                      <LinkIconWrapper>
                        <LinkIcon />
                      </LinkIconWrapper>
                    </LinkRow>
                    <p style={{ marginBottom: '0rem', fontWeight: 300 }}>{action.text}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <TwoRow
          style={{
            gap: '48px',
            alignItems: 'center',
          }}
        >
          <StyledImage
            style={{ maxHeight: '400px' }}
            sources={{
              light: useBaseUrl('/img/girl.png'),
              dark: useBaseUrl('/img/girl.png'),
            }}
          />
          <div>
            <h2>Developer Links</h2>
            {developerLinks.map((action) => (
              <Link key={action.href} to={action.href}>
                <Card key={action.href} style={{ marginBottom: '0.5rem' }}>
                  <LinkRow>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IconWrapper>
                        <StyledIcon>
                          <action.icon style={{ width: '24px' }} />
                        </StyledIcon>
                      </IconWrapper>
                      {action.title}
                    </div>
                    <LinkIconWrapper>
                      <LinkIcon />
                    </LinkIconWrapper>
                  </LinkRow>
                </Card>
              </Link>
            ))}
          </div>
        </TwoRow>
        <hr />
        <Row>
          <Link style={{ textDecoration: 'none' }} href={'https://discord.com/invite/sherry'}>
            <CenterCard>
              <StyledIcon>
                <Discord style={{ width: '48px', height: '48px' }} />
              </StyledIcon>
              <div>
                <h3>Discord</h3>
                <p>Join our Developer Community.</p>
              </div>
            </CenterCard>
          </Link>
          <Link style={{ textDecoration: 'none' }} href={'https://x.com/sherryprotocol'}>
            <CenterCard>
              <MessageCircle style={{ width: '48px', height: '48px' }} />
              <div>
                <h3>X feed</h3>
                <p>Keep up to date with the latest news and updates.</p>
              </div>
            </CenterCard>
          </Link>
          <Link style={{ textDecoration: 'none' }} href={'https://github.com/SherryLabs'}>
            <CenterCard>
              <StyledIcon>
                <GitHub style={{ width: '48px', height: '48px' }} />
              </StyledIcon>
              <div>
                <h3>GitHub</h3>
                <p>View all Sherry repositories.</p>
              </div>
            </CenterCard>
          </Link>
        </Row>
        <Link
          style={{
            textDecoration: 'none',
            maxWidth: '960px',
            margin: '0 auto 4rem auto',
            width: '100%',
          }}
          href={'https://sherry.social/minithon'}
        >
          <WideCard
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '24px',
            }}
          >
            <img src={MinithonImage} width={'200px'} />
            <div>
              <h2 style={{ marginBottom: '0.5rem' }}>Open Minithon</h2>
              <p style={{ margin: '0rem' }}>
                Join Sherry in the first ever Minithon: A 10-day async hackathon where you build with the TriggerKit.
              </p>
            </div>
          </WideCard>
        </Link>
      </Container>
    </Layout>
  )
}
