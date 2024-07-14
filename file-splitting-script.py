import os
import subprocess
from datetime import datetime

def create_file(path, content):
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    
    if os.path.exists(path):
        print(f"警告: ファイル {path} は既に存在します。上書きします。")
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    # ファイルの内容を定義
    files = {
        'next.config.js': '''
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
  },
}

module.exports = nextConfig
''',
        'src/app/layout.tsx': '''
import '@/styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'プロジェクトバベル',
  description: '言語を超え、文化をつなぐ。新たな世界の創造へ。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
''',
        'src/app/page.tsx': '''
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MessageSquare, GitBranch, Cloud, Package, Code, Home } from 'lucide-react'
import DynamicComponent from '@/components/DynamicComponent'

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const sidebarComponents = {
    '主要機能': [
      { name: 'ChatInterface', displayName: 'チャットインターフェース', icon: <MessageSquare size={18} />, isActive: true },
      { name: 'VersionControl', displayName: 'バージョン管理', icon: <GitBranch size={18} />, isActive: true },
      { name: 'SaaSList', displayName: 'SaaSリスト', icon: <Cloud size={18} />, isActive: true },
    ],
    'パッケージマネージャー': [
      { name: 'PackageList', displayName: 'パッケージリスト', icon: <Package size={18} />, isActive: true },
      { name: 'MonacoEditor', displayName: 'コードエディタ', icon: <Code size={18} />, isActive: false },
    ],
    '統合開発環境（IDE）': [],
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // ... 残りのコンポーネントロジック

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-gray-200 font-serif">
      {/* ... JSXの内容 */}
    </div>
  )
}
''',
        'src/components/DynamicComponent.tsx': '''
import dynamic from 'next/dynamic'

const DynamicComponent = ({ componentName }: { componentName: string }) => {
  const Component = dynamic(() => {
    switch (componentName) {
      case 'ChatInterface':
        return import('./CollaborationHub/ChatInterface')
      case 'VersionControl':
        return import('./SystemEditor/VersionControl')
      case 'SaaSList':
        return import('./SaaSPackageManager/SaaSList')
      case 'PackageList':
        return import('./SaaSPackageManager/PackageList')
      case 'MonacoEditor':
        return import('./IDE/MonacoEditor')
      default:
        return Promise.resolve(() => (
          <div className="text-red-600 font-semibold p-4 bg-red-100 rounded-md">
            コンポーネントが見つかりません: {componentName}
          </div>
        ))
    }
  }, {
    loading: () => <div>Loading...</div>,
  })

  return <Component />
}

export default DynamicComponent
''',
        'src/components/CollaborationHub/ChatInterface.tsx': '''
import React from 'react'

const ChatInterface = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">チャットインターフェース</h2>
      <p>ここにチャットインターフェースの実装を追加します。</p>
    </div>
  )
}

export default ChatInterface
''',
        'src/components/SystemEditor/VersionControl.tsx': '''
import React from 'react'

const VersionControl = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">バージョン管理</h2>
      <p>ここにバージョン管理の実装を追加します。</p>
    </div>
  )
}

export default VersionControl
''',
        'src/components/SaaSPackageManager/SaaSList.tsx': '''
import React from 'react'

const SaaSList = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">SaaSリスト</h2>
      <p>ここにSaaSリストの実装を追加します。</p>
    </div>
  )
}

export default SaaSList
''',
        'src/components/SaaSPackageManager/PackageList.tsx': '''
import React from 'react'

const PackageList = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">パッケージリスト</h2>
      <p>ここにパッケージリストの実装を追加します。</p>
    </div>
  )
}

export default PackageList
''',
        'src/components/IDE/MonacoEditor.tsx': '''
import React from 'react'

const MonacoEditor = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Monaco エディタ</h2>
      <p>ここにMonaco エディタの実装を追加します。</p>
    </div>
  )
}

export default MonacoEditor
''',
    }

    # ファイルを作成
    for path, content in files.items():
        create_file(path, content.strip())

    print("ファイルの生成が完了しました。")

if __name__ == "__main__":
    main()