import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, AlertCircle, Info } from 'lucide-react';

const SecurityAudit = () => {
  const [auditResults, setAuditResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overallStatus, setOverallStatus] = useState('');

  useEffect(() => {
    const fetchAuditResults = async () => {
      // 実際のアプリケーションでは、ここで本物のAPIからデータを取得します
      const mockData = [
        { id: 1, category: 'アクセス制御', status: 'パス', description: 'すべてのユーザーロールが適切に設定されています', recommendation: '定期的なレビューを継続してください' },
        { id: 2, category: 'データ暗号化', status: '警告', description: '一部のデータが暗号化されていません', recommendation: 'すべての機密データにAES-256暗号化を適用してください' },
        { id: 3, category: 'ログ管理', status: 'パス', description: 'すべてのシステムログが適切に記録されています', recommendation: 'ログの保持期間を見直し、必要に応じて延長を検討してください' },
        { id: 4, category: 'ファイアウォール', status: '危険', description: '一部のポートが不必要に開いています', recommendation: '未使用のポートを即時に閉鎖し、必要最小限のポートのみを開放してください' },
        { id: 5, category: 'パッチ管理', status: '警告', description: '一部のシステムが最新でありません', recommendation: '緊急パッチの適用を優先し、定期的なパッチ適用スケジュールを確立してください' },
        { id: 6, category: '多要素認証', status: 'パス', description: '重要なシステムに多要素認証が実装されています', recommendation: 'ユーザーへの多要素認証の重要性に関する教育を継続してください' },
      ];

      setAuditResults(mockData);
      setOverallStatus(calculateOverallStatus(mockData));
      setLoading(false);
    };

    fetchAuditResults();
  }, []);

  const calculateOverallStatus = (results) => {
    const statusCounts = results.reduce((acc, result) => {
      acc[result.status] = (acc[result.status] || 0) + 1;
      return acc;
    }, {});

    if (statusCounts['危険'] > 0) return '危険';
    if (statusCounts['警告'] > 0) return '警告';
    return 'パス';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'パス':
        return <CheckCircle className="text-green-500" />;
      case '警告':
        return <AlertTriangle className="text-yellow-500" />;
      case '危険':
        return <Shield className="text-red-500" />;
      default:
        return null;
    }
  };

  const getOverallStatusColor = (status) => {
    switch (status) {
      case 'パス':
        return 'bg-green-100 border-green-200 text-green-800';
      case '警告':
        return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      case '危険':
        return 'bg-red-100 border-red-200 text-red-800';
      default:
        return 'bg-blue-100 border-blue-200 text-blue-800';
    }
  };

  if (loading) {
    return <div className="text-center text-black">読み込み中...</div>;
  }

  return (
    <div className="p-4 bg-white text-black">
      <h1 className="text-3xl font-bold mb-6">セキュリティ監査結果</h1>
      <div className={`mb-6 p-4 rounded-md ${getOverallStatusColor(overallStatus)}`}>
        <div className="flex items-center">
          {getStatusIcon(overallStatus)}
          <h2 className="text-xl font-semibold ml-2">全体的な状況: {overallStatus}</h2>
        </div>
        <p className="mt-2">
          {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })} に実施された監査の結果です。
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">主な発見事項</h3>
        <ul className="list-disc list-inside">
          {auditResults.filter(result => result.status !== 'パス').map(result => (
            <li key={result.id} className="mb-1">{result.category}: {result.description}</li>
          ))}
        </ul>
      </div>
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">カテゴリ</th>
            <th className="border p-2 text-left">ステータス</th>
            <th className="border p-2 text-left">説明</th>
            <th className="border p-2 text-left">推奨対策</th>
          </tr>
        </thead>
        <tbody>
          {auditResults.map((result) => (
            <tr key={result.id} className={result.status === '危険' ? 'bg-red-50' : result.status === '警告' ? 'bg-yellow-50' : ''}>
              <td className="border p-2">{result.category}</td>
              <td className="border p-2">
                <div className="flex items-center">
                  {getStatusIcon(result.status)}
                  <span className="ml-2">{result.status}</span>
                </div>
              </td>
              <td className="border p-2">{result.description}</td>
              <td className="border p-2">{result.recommendation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-gray-100 p-4 rounded-md">
        <div className="flex items-center mb-2">
          <Info className="text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold">次のステップ</h3>
        </div>
        <p>1. 危険および警告状態の項目に優先的に対処してください。</p>
        <p>2. 推奨対策を実施し、セキュリティ態勢を強化してください。</p>
        <p>3. 定期的な監査を継続し、新たな脅威に対する備えを怠らないようにしてください。</p>
      </div>
    </div>
  );
};

export default SecurityAudit;
