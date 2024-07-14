// 必要なモジュールをインポート
import React, { useState, useEffect } from 'react';
import { ChevronDown, User, Award, AlertTriangle, Calendar, FileText, TrendingUp } from 'react-feather';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

// ClassAssignmentコンポーネントの定義
const ClassAssignment = () => {
  // 状態変数の定義
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [classAssignments, setClassAssignments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // コンポーネントのマウント時にデータを取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchStudents();
        setLoading(false);
      } catch (error) {
        setError('データの取得中にエラーが発生しました。');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 学生データを取得する関数
  const fetchStudents = async () => {
    // ダミーの学生データを生成
    const dummyStudents = [
      { id: 1, name: '山田太郎', grade: '1年生', examHistory: [
        { date: '2023-04', scores: { 国語: 52, 数学: 55, 英語: 48, 理科: 50, 社会: 53 } },
        { date: '2023-05', scores: { 国語: 54, 数学: 58, 英語: 50, 理科: 52, 社会: 55 } },
        { date: '2023-06', scores: { 国語: 56, 数学: 60, 英語: 52, 理科: 54, 社会: 57 } },
      ]},
      { id: 2, name: '佐藤花子', grade: '2年生', examHistory: [
        { date: '2023-04', scores: { 国語: 58, 数学: 62, 英語: 55, 理科: 57, 社会: 60 } },
        { date: '2023-05', scores: { 国語: 60, 数学: 65, 英語: 58, 理科: 60, 社会: 63 } },
        { date: '2023-06', scores: { 国語: 62, 数学: 68, 英語: 60, 理科: 62, 社会: 65 } },
      ]},
      { id: 3, name: '鈴木一郎', grade: '3年生', examHistory: [
        { date: '2023-04', scores: { 国語: 50, 数学: 52, 英語: 45, 理科: 48, 社会: 50 } },
        { date: '2023-05', scores: { 国語: 52, 数学: 55, 英語: 48, 理科: 50, 社会: 53 } },
        { date: '2023-06', scores: { 国語: 54, 数学: 58, 英語: 50, 理科: 52, 社会: 55 } },
      ]},
    ];

    // 非同期処理をシミュレート
    return new Promise((resolve) => {
      setTimeout(() => {
        setStudents(dummyStudents);
        resolve();
      }, 1000);
    });
  };

  // 学生選択時の処理
  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  // クラス割り当て関数
  const assignClass = (student) => {
    const latestExam = student.examHistory[student.examHistory.length - 1];
    const averageScore = Object.values(latestExam.scores).reduce((a, b) => a + b) / Object.values(latestExam.scores).length;
    let assignedClass = '';
    if (averageScore >= 65) {
      assignedClass = 'T';
    } else if (averageScore >= 55) {
      assignedClass = 'S';
    } else {
      assignedClass = 'A';
    }

    setClassAssignments((prev) => ({
      ...prev,
      [student.id]: assignedClass,
    }));

    setSelectedStudent((prev) => ({
      ...prev,
      currentClass: assignedClass,
    }));
  };

  // ローディング中の表示
  if (loading) {
    return <div className="flex justify-center items-center h-screen">読み込み中...</div>;
  }

  // エラー時の表示
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AlertTriangle className="text-red-500 mr-2" />
        {error}
      </div>
    );
  }

  // メインのレンダリング
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-indigo-900 border-b-2 border-indigo-500 pb-2">
        月例試験評価・クラス分け管理
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-indigo-800 flex items-center">
            <User className="mr-2" /> 学生選択
          </h2>
          <div className="relative">
            <select
              className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
              onChange={(e) => handleStudentSelect(JSON.parse(e.target.value))}
            >
              <option value="">学生を選択してください</option>
              {students.map((student) => (
                <option key={student.id} value={JSON.stringify(student)}>
                  {student.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-indigo-800 flex items-center">
            <Award className="mr-2" /> 試験結果
          </h2>
          {selectedStudent && (
            <div>
              <p className="text-lg mb-2">
                学生名: <span className="font-medium">{selectedStudent.name}</span>
              </p>
              <p className="text-lg mb-2">
                学年: <span className="font-medium">{selectedStudent.grade}</span>
              </p>
              <p className="text-lg mb-4">
                最新スコア: 
                {Object.entries(selectedStudent.examHistory[selectedStudent.examHistory.length - 1].scores).map(([subject, score]) => (
                  <span key={subject} className="ml-2">
                    {subject}: <span className="font-medium">{score}</span>
                  </span>
                ))}
              </p>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                onClick={() => assignClass(selectedStudent)}
              >
                クラス割り当て
              </button>
              {selectedStudent.currentClass && (
                <p className="mt-4 text-lg">
                  割り当てクラス: <span className="font-medium">{selectedStudent.currentClass}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedStudent && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-indigo-800 flex items-center">
            <TrendingUp className="mr-2" /> 成績推移
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} width={730} height={250} data={Object.entries(selectedStudent.examHistory[selectedStudent.examHistory.length - 1].scores).map(([subject, score]) => ({ subject, score }))}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="スコア" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedStudent.examHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  {Object.keys(selectedStudent.examHistory[0].scores).map((subject, index) => (
                    <Line key={subject} type="monotone" dataKey={`scores.${subject}`} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} name={subject} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-indigo-800 flex items-center">
          <Calendar className="mr-2" /> 月例試験スケジュール
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2 text-left">日付</th>
                <th className="px-4 py-2 text-left">試験内容</th>
                <th className="px-4 py-2 text-left">対象学年</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2">2023年7月15日</td>
                <td className="px-4 py-2">7月度月例試験</td>
                <td className="px-4 py-2">全学年</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2">2023年8月20日</td>
                <td className="px-4 py-2">8月度月例試験</td>
                <td className="px-4 py-2">全学年</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2">2023年9月17日</td>
                <td className="px-4 py-2">9月度月例試験</td>
                <td className="px-4 py-2">全学年</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-indigo-800 flex items-center">
          <FileText className="mr-2" /> クラス分け基準
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2 text-left">クラス</th>
                <th className="px-4 py-2 text-left">平均偏差値範囲</th>
                <th className="px-4 py-2 text-left">評価</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2">T</td>
                <td className="px-4 py-2">65以上</td>
                <td className="px-4 py-2">上位</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2">S</td>
                <td className="px-4 py-2">55-64</td>
                <td className="px-4 py-2">中位</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2">A</td>
                <td className="px-4 py-2">55未満</td>
                <td className="px-4 py-2">要改善</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// コンポーネントをエクスポート
export default ClassAssignment;
