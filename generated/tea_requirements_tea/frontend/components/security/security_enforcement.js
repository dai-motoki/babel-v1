import React, { useState } from 'react';
import { Shield, Lock, AlertTriangle, ToggleLeft, ToggleRight } from 'lucide-react';

const SecurityEnforcement = () => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [passwordPolicy, setPasswordPolicy] = useState(true);
  const [dataEncryption, setDataEncryption] = useState(true);

  const handlePolicyChange = (policy, value) => {
    switch (policy) {
      case 'twoFactor':
        setTwoFactor(value);
        break;
      case 'passwordPolicy':
        setPasswordPolicy(value);
        break;
      case 'dataEncryption':
        setDataEncryption(value);
        break;
      default:
        break;
    }
  };

  const applyChanges = () => {
    // ここで通常はバックエンドに新しい設定を送信します
    console.log('セキュリティ変更を適用:', { twoFactor, passwordPolicy, dataEncryption });
  };

  // カスタムスイッチコンポーネント
  const CustomSwitch = ({ checked, onChange }) => (
    <div onClick={() => onChange(!checked)} className="cursor-pointer">
      {checked ? <ToggleRight className="text-blue-500" /> : <ToggleLeft className="text-gray-400" />}
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Shield className="mr-2" /> セキュリティ強化
      </h1>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Lock className="mr-2" />
            <span>二要素認証</span>
          </div>
          <CustomSwitch
            checked={twoFactor}
            onChange={(value) => handlePolicyChange('twoFactor', value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Lock className="mr-2" />
            <span>強力なパスワードポリシー</span>
          </div>
          <CustomSwitch
            checked={passwordPolicy}
            onChange={(value) => handlePolicyChange('passwordPolicy', value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Lock className="mr-2" />
            <span>データ暗号化</span>
          </div>
          <CustomSwitch
            checked={dataEncryption}
            onChange={(value) => handlePolicyChange('dataEncryption', value)}
          />
        </div>
      </div>

      <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
        <div className="flex">
          <div className="py-1"><AlertTriangle className="h-6 w-6 text-yellow-500 mr-4" /></div>
          <div>
            <p className="font-bold">警告</p>
            <p className="text-sm">セキュリティ設定の変更はシステムのパフォーマンスとユーザー体験に影響を与える可能性があります。適用前に変更内容を慎重に確認してください。</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={applyChanges}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          セキュリティ変更を適用
        </button>
      </div>
    </div>
  );
};

export default SecurityEnforcement;