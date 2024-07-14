import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle, AlertTriangle, Clock, RefreshCw } from 'lucide-react';

const SecurityAudit = () => {
  const [auditResults, setAuditResults] = useState([]);
  const [overallScore, setOverallScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 実際のAPIコールの代わりにモックデータを使用
    const fetchAuditResults = async () => {
      setLoading(true);
      // モックデータの生成を模倣
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockResults = [
        { id: 1, category: 'ネットワークセキュリティ', status: 'passed', description: 'ファイアウォールの設定が適切です。' },
        { id: 2, category: 'アプリケーションセキュリティ', status: 'warning', description: '一部のAPIエンドポイントが適切に保護されていません。' },
        { id: 3, category: 'データ暗号化', status: 'passed', description: '全てのデータが適切に暗号化されています。' },
        { id: 4, category: 'アクセス制御', status: 'failed', description: '特権アカウントの監査ログが不十分です。' },
        { id: 5, category: 'セキュリティパッチ管理', status: 'passed', description: 'すべてのシステムが最新のセキュリティパッチで更新されています。' },
        { id: 6, category: 'インシデント対応計画', status: 'warning', description: 'インシデント対応手順の更新が必要です。' },
        { id: 7, category: 'フィッシング対策', status: 'passed', description: '従業員向けのフィッシング教育プログラムが効果的に実施されています。' },
        { id: 8, category: '物理的セキュリティ', status: 'passed', description: 'データセンターのアクセス制御が適切に管理されています。' },
      ];
      setAuditResults(mockResults);
      calculateOverallScore(mockResults);
      setLoading(false);
    };

    fetchAuditResults();
  }, []);

  const calculateOverallScore = (results) => {
    const totalItems = results.length;
    const passedItems = results.filter(item => item.status === 'passed').length;
    const score = Math.round((passedItems / totalItems) * 100);
    setOverallScore(score);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="text-green-500" />;
      case 'failed':
        return <XCircle className="text-red-500" />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" />;
      default:
        return <Clock className="text-gray-500" />;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <RefreshCw className="animate-spin text-green-700 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">セキュリティ監査ダッシュボード</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-green-700">総合セキュリティスコア</h2>
          <Shield className="text-green-600 w-10 h-10" />
        </div>
        <div className="text-5xl font-bold text-center mb-4">
          <span className={getScoreColor(overallScore)}>{overallScore}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${overallScore}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {auditResults.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-700">{item.category}</h3>
              {getStatusIcon(item.status)}
            </div>
            <p className="text-gray-600">{item.description}</p>
            <div className={`mt-4 text-sm font-medium ${
              item.status === 'passed' ? 'text-green-600' :
              item.status === 'failed' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {item.status === 'passed' ? '合格' :
               item.status === 'failed' ? '不合格' : '要注意'}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300"
          onClick={() => window.location.reload()}
        >
          監査を再実行
        </button>
      </div>
    </div>
  );
};

export default SecurityAudit;
