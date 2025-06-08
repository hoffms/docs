import { useLocation } from '@docusaurus/router'
import OriginalNavBarItem from '@theme-original/NavbarItem'
import React from 'react'

type NavbarItemProps = {
  className?: string
  label: string
}

export default function NavbarItem(props: NavbarItemProps) {
  const { pathname } = useLocation()
  const selectedDocVersion = getSelectedDocVersion(pathname)

  function getSelectedDocVersion(path: string): string {
    if (path.includes('/v4/')) return 'v4'
    if (path.includes('/v3/')) return 'v3'
    if (path.includes('/v2/')) return 'v2'
    return 'v1'
  }

  function getClassName(className?: string, version?: string): string {
    return `${className ?? ''} ${version ? `version-${version}` : ''}`
  }

  return (
    <>
      <OriginalNavBarItem {...props} className={getClassName(props.className, selectedDocVersion)} />
    </>
  )
}
