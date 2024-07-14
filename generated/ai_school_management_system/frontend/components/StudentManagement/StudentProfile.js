import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, Camera, BookOpen, Award, Briefcase, Search, ChevronDown } from 'react-feather';

// ダミーデータの作成
const dummyStudentsData = [
  {
    id: 1,
    name: '山田太郎',
    email: 'taro.yamada@example.com',
    course: 'エンジニア',
    enrollmentDate: '2023-04-01',
    completedCourses: 5,
    certificates: 3,
    jobSupportStatus: '進行中'
  },
  {
    id: 2,
    name: '佐藤花子',
    email: 'hanako.sato@example.com',
    course: 'ビジネス',
    enrollmentDate: '2023-03-15',
    completedCourses: 3,
    certificates: 2,
    jobSupportStatus: '未開始'
  },
  {
    id: 3,
    name: '鈴木一郎',
    email: 'ichiro.suzuki@example.com',
    course: 'クリエイター',
    enrollmentDate: '2023-05-01',
    completedCourses: 2,
    certificates: 1,
    jobSupportStatus: '完了'
  }
];

const StudentManagementDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // ダミーデータを使用してAPIコールをシミュレート
    const fetchStudents = async () => {
      setTimeout(() => {
        setStudents(dummyStudentsData);
      }, 1000);
    };
    fetchStudents();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // ダミーのAPI保存処理
    setTimeout(() => {
      setStudents(students.map(s => s.id === editedStudent.id ? editedStudent : s));
      setSelectedStudent(editedStudent);
      setIsEditing(false);
    }, 1000);
  };

  const handleCancel = () => {
    setEditedStudent(selectedStudent);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">学生管理ダッシュボード</h1>
          <div className="mb-6">
            <input
              type="text"
              placeholder="学生を検索..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">学生一覧</h2>
              <ul className="space-y-2">
                {filteredStudents.map(student => (
                  <li
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`cursor-pointer p-2 rounded-md ${selectedStudent?.id === student.id ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}
                  >
                    {student.name} - {student.course}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">学生詳細</h2>
              {selectedStudent ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{selectedStudent.name}</h3>
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                      >
                        <Edit2 size={18} className="inline-block mr-2" />
                        編集
                      </button>
                    ) : (
                      <div>
                        <button
                          onClick={handleSave}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 mr-2"
                        >
                          <Save size={18} className="inline-block mr-2" />
                          保存
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                        >
                          <X size={18} className="inline-block mr-2" />
                          キャンセル
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editedStudent.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-gray-800">{selectedStudent.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">コース</label>
                      {isEditing ? (
                        <select
                          name="course"
                          value={editedStudent.course}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="ビジネス">ビジネス</option>
                          <option value="クリエイター">クリエイター</option>
                          <option value="エンジニア">エンジニア</option>
                        </select>
                      ) : (
                        <p className="text-gray-800">{selectedStudent.course}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">入学日</label>
                      <p className="text-gray-800">{selectedStudent.enrollmentDate}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-800 mb-1">完了したコース</h4>
                        <p className="text-xl font-bold text-green-600">{selectedStudent.completedCourses}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-800 mb-1">獲得した証明書</h4>
                        <p className="text-xl font-bold text-blue-600">{selectedStudent.certificates}</p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-800 mb-1">就職支援状況</h4>
                        <p className="text-xl font-bold text-purple-600">{selectedStudent.jobSupportStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">学生を選択してください</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagementDashboard;
