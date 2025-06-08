import React from 'react'
import { useLocation } from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export default function Root({ children }) {
  const { pathname } = useLocation()
  const { siteConfig } = useDocusaurusContext()

  return (
    <>
      {children}
    </>
  )
}
