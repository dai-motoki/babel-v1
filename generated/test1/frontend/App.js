import React, { useState } from 'react';
import MenuBar from './components/MenuBar';
import GlobalChat from './components/GlobalChat';
import MultilingualWiki from './components/MultilingualWiki';
import SystemEditor from './components/SystemEditor';

const App = () => {
  const [currentComponent, setCurrentComponent] = useState('GlobalChat');
  const [language, setLanguage] = useState('ja');
  const [user, setUser] = useState({ name: 'ゲスト', id: 'guest001' });

  const components = {
    GlobalChat: GlobalChat,
    MultilingualWiki: MultilingualWiki,
    SystemEditor: SystemEditor,
  };

  const DynamicComponent = components[currentComponent];

  const handleComponentChange = (componentName) => {
    setCurrentComponent(componentName);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleLogout = () => {
    setUser({ name: 'ゲスト', id: 'guest001' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 font-sans">
      <MenuBar
        onComponentChange={handleComponentChange}
        onLanguageChange={handleLanguageChange}
        onLogout={handleLogout}
        currentLanguage={language}
        user={user}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <DynamicComponent language={language} user={user} />
        </div>
      </main>
      <footer className="bg-gray-200 text-center py-4 text-sm">
        <p>&copy; 2023 プロジェクトBabel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;