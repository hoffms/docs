import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
`

const Button = styled.button<{ isSelected: boolean }>`
  background: ${({ isSelected }) => (isSelected ? 'var(--ifm-color-primary)' : 'transparent')};
  border: 1px solid var(--ifm-color-primary);
  border-radius: 16px;
  color: ${({ isSelected }) => (isSelected ? 'white' : 'var(--ifm-color-primary)')};
  cursor: pointer;
  font-size: 14px;
  padding: 4px 12px;
  transition: all 0.2s ease;

  &:hover {
    background: var(--ifm-color-primary);
    color: white;
  }
`

export default function SentimentTracking() {
  const [selectedSentiment, setSelectedSentiment] = React.useState<string | null>(null)

  const handleSentimentClick = (sentiment: string) => {
    setSelectedSentiment(sentiment)
    // You can add your own feedback collection logic here
  }

  return (
    <Container>
      <Button isSelected={selectedSentiment === 'helpful'} onClick={() => handleSentimentClick('helpful')}>
        Helpful
      </Button>
      <Button isSelected={selectedSentiment === 'not-helpful'} onClick={() => handleSentimentClick('not-helpful')}>
        Not Helpful
      </Button>
    </Container>
  )
}
