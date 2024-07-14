import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

// 学生データを管理するカスタムフック
export const useStudentData = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // 学生データを取得するクエリ
  const { data, isLoading, error } = useQuery('students', async () => {
    const response = await axios.get('/api/students');
    return response.data;
  });

  // 学生データを更新する
  useEffect(() => {
    if (data) {
      setStudents(data);
    }
  }, [data]);

  // 学生を追加する関数
  const addStudent = useMutation(
    async (newStudent) => {
      const response = await axios.post('/api/students', newStudent);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setStudents((prevStudents) => [...prevStudents, data]);
      },
    }
  );

  // 学生を更新する関数
  const updateStudent = useMutation(
    async (updatedStudent) => {
      const response = await axios.put(`/api/students/${updatedStudent.id}`, updatedStudent);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setStudents((prevStudents) =>
          prevStudents.map((student) => (student.id === data.id ? data : student))
        );
      },
    }
  );

  // 学生を削除する関数
  const deleteStudent = useMutation(
    async (studentId) => {
      await axios.delete(`/api/students/${studentId}`);
      return studentId;
    },
    {
      onSuccess: (deletedId) => {
        setStudents((prevStudents) => prevStudents.filter((student) => student.id !== deletedId));
      },
    }
  );

  // 学生を検索する関数
  const searchStudents = useCallback(() => {
    return students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  // 学生をフィルタリングする関数
  const filterStudents = useCallback(() => {
    if (filter === 'all') return searchStudents();
    return searchStudents().filter((student) => student.status === filter);
  }, [searchStudents, filter]);

  return {
    students: filterStudents(),
    isLoading,
    error,
    selectedStudent,
    setSelectedStudent,
    addStudent: addStudent.mutate,
    updateStudent: updateStudent.mutate,
    deleteStudent: deleteStudent.mutate,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
  };
};

// 学生管理コンポーネント
export const StudentManagement = () => {
  const {
    students,
    isLoading,
    error,
    selectedStudent,
    setSelectedStudent,
    addStudent,
    updateStudent,
    deleteStudent,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
  } = useStudentData();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-indigo-800">学生管理システム</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="学生を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">全て</option>
            <option value="active">アクティブ</option>
            <option value="inactive">非アクティブ</option>
          </select>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          新規学生追加
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">{student.name}</h2>
            <p className="text-gray-600 mb-2">メール: {student.email}</p>
            <p className="text-gray-600 mb-2">ステータス: {student.status}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedStudent(student)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300"
              >
                編集
              </button>
              <button
                onClick={() => deleteStudent(student.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">新規学生追加</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newStudent = Object.fromEntries(formData);
              addStudent(newStudent);
              setIsModalOpen(false);
            }}>
              <input
                type="text"
                name="name"
                placeholder="名前"
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                name="email"
                placeholder="メールアドレス"
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                name="status"
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">ステータスを選択</option>
                <option value="active">アクティブ</option>
                <option value="inactive">非アクティブ</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  追加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">学生情報編集</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const updatedStudent = { ...selectedStudent, ...Object.fromEntries(formData) };
              updateStudent(updatedStudent);
              setSelectedStudent(null);
            }}>
              <input
                type="text"
                name="name"
                defaultValue={selectedStudent.name}
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                name="email"
                defaultValue={selectedStudent.email}
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                name="status"
                defaultValue={selectedStudent.status}
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="active">アクティブ</option>
                <option value="inactive">非アクティブ</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  更新
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};