import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, RefreshCw, FileText, Lock } from 'lucide-react';

const SecurityAudit = () => {
  const [auditResults, setAuditResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    // 実際のAPIコールの代わりにモックデータを使用
    const fetchAuditResults = async () => {
      setLoading(true);
      try {
        // モックデータを生成
        const mockResults = generateMockAuditResults();
        setAuditResults(mockResults);
        calculateOverallScore(mockResults);
      } catch (error) {
        console.error('Error fetching audit results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditResults();
  }, []);

  const generateMockAuditResults = () => {
    const categories = ['アクセス制御', 'データ暗号化', 'ネットワークセキュリティ', 'アプリケーションセキュリティ', '監査ログ'];
    return categories.map(category => ({
      category,
      status: Math.random() > 0.7 ? 'passed' : Math.random() > 0.5 ? 'warning' : 'failed',
      score: Math.floor(Math.random() * 100),
      recommendations: [
        '二要素認証の導入を検討してください',
        'データベースの暗号化レベルを上げることを推奨します',
        'ファイアウォールの設定を見直してください'
      ]
    }));
  };

  const calculateOverallScore = (results) => {
    const totalScore = results.reduce((acc, result) => acc + result.score, 0);
    setOverallScore(Math.floor(totalScore / results.length));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="w-12 h-12 text-green-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <Shield className="w-8 h-8 mr-2 text-green-700" />
        セキュリティ監査レポート
      </h1>

      <div className="mb-8 bg-green-50 p-4 rounded-md border border-green-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">全体スコア</h2>
        <div className="flex items-center">
          <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}
          </div>
          <div className="ml-2 text-gray-600">/100</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {auditResults.map((result, index) => (
          <div key={index} className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-700">{result.category}</h3>
              {getStatusIcon(result.status)}
            </div>
            <div className="mb-2">
              <span className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}
              </span>
              <span className="text-gray-600">/100</span>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {result.recommendations.map((rec, recIndex) => (
                <li key={recIndex}>{rec}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-green-700" />
          詳細レポート
        </h2>
        <p className="text-gray-600 mb-4">
          詳細なセキュリティ監査レポートをダウンロードして、より深い分析と推奨事項をご確認ください。
        </p>
        <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300">
          <Lock className="w-5 h-5 mr-2" />
          詳細レポートをダウンロード
        </button>
      </div>
    </div>
  );
};

export default SecurityAudit;