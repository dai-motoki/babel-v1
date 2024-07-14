'use client'

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

const componentMap: { [key: string]: () => Promise<{ default: ComponentType }> } = {
  ChatInterface: () => import('@/components/CollaborationHub/ChatInterface'),
  VersionControl: () => import('@/components/SystemEditor/VersionControl'),
  SaaSList: () => import('@/components/SaaSPackageManager/SaaSList'),
  PackageList: () => import('@/components/SaaSPackageManager/PackageList'),
  MonacoEditor: () => import('@/components/IDE/MonacoEditor'),
}

const DynamicComponent = ({ componentName }: { componentName: string }) => {
  const Component = dynamic(componentMap[componentName] || (() => Promise.resolve(() => <div>コンポーネントが見つかりません: {componentName}</div>)), {
    loading: () => <div>Loading...</div>,
  })

  return <Component />
}

export default DynamicComponent