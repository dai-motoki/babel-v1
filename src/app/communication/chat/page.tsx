'use client'

import Sidebar from '@/components/common/Sidebar'
import DynamicComponent from '@/components/DynamicComponent'

export default function ChatPage() {
  return (
    <div className="flex h-screen">
      {/* サイドバーコンポーネント */}
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative bg-gradient-to-b from-gray-100 to-gray-200">
        {/* チャットインターフェースコンポーネント */}
        <DynamicComponent componentName="ChatInterface" />
      </main>
    </div>
  );
}
