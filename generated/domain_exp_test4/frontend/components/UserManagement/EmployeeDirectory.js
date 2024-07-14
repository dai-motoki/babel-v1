import React, { useState, useEffect } from 'react';
import { Search, User, Mail, Phone, MapPin } from 'react-feather';

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    // 仮のデータを使用（実際の実装ではAPIから取得）
    const mockEmployees = [
      { id: 1, name: '山田 太郎', email: 'taro.yamada@example.com', phone: '090-1234-5678', department: '営業部', location: '東京' },
      { id: 2, name: '佐藤 花子', email: 'hanako.sato@example.com', phone: '090-8765-4321', department: '人事部', location: '大阪' },
      { id: 3, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com', phone: '090-2468-1357', department: '開発部', location: '福岡' },
      // ... 他の従業員データ
    ];
    setEmployees(mockEmployees);
    setFilteredEmployees(mockEmployees);
  }, []);

  useEffect(() => {
    const results = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(results);
  }, [searchTerm, employees]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-red-500 pb-2">従業員ディレクトリ</h1>
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="従業員を検索..."
            className="w-full p-4 pl-12 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map(employee => (
            <div key={employee.id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <div className="p-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-500" />
                </div>
                <h2 className="text-xl font-semibold text-center mb-2">{employee.name}</h2>
                <p className="text-sm text-gray-600 text-center mb-4">{employee.department}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{employee.location}</span>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 p-4">
                <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out">
                  詳細を表示
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">該当する従業員が見つかりません。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDirectory;