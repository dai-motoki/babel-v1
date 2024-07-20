import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CreateSystemDialogProps {
  onClose: () => void;
  onCreateSystem: (systemName: string) => void;
}

export const CreateSystemDialog: React.FC<CreateSystemDialogProps> = ({ onClose, onCreateSystem }) => {
  const [systemName, setSystemName] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (systemName.trim()) {
      onCreateSystem(systemName.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#2d2d2d] text-[#e0e0e0] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-[#4db6ac]">{t('新しいシステムの作成')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="systemName" className="block mb-2">
              {t('作りたいシステムを記載してください:')}
            </label>
            <input
              type="text"
              id="systemName"
              value={systemName}
              onChange={(e) => setSystemName(e.target.value)}
              className="w-full p-2 bg-[#3d3d3d] text-[#e0e0e0] rounded"
              required
            />
          </div>
          <p className="mb-4 text-sm text-[#a0a0a0]">
            {t('~/babel_generated/ ディレクトリ下に生成されます。')}
          </p>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#616161] text-[#e0e0e0] rounded hover:bg-[#757575] transition-colors"
            >
              {t('キャンセル')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4db6ac] text-white rounded hover:bg-[#26a69a] transition-colors"
            >
              {t('作成')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};