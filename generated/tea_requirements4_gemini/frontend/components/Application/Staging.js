import React from 'react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../UI/card';
import { Input } from '../UI/input';
import { Label } from '../UI/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../UI/select';
import { Switch } from '../UI/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../UI/table';
import { ScrollArea } from '../UI/scroll-area';

const stagingData = [
  {
    id: 1,
    branch: 'main',
    commit: 'abcdefg1234567890',
    status: '成功',
    date: '2023-12-25 10:00',
  },
  {
    id: 2,
    branch: 'feature/new-product',
    commit: 'ghijklmnopqrstuvwxyz',
    status: '失敗',
    date: '2023-12-24 18:30',
  },
  {
    id: 3,
    branch: 'hotfix/bug-fix',
    commit: '1234567890abcdefg',
    status: '成功',
    date: '2023-12-23 15:15',
  },
];

const Staging: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isDebugMode, setIsDebugMode] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const filteredData = stagingData.filter((item) => {
    const statusMatch =
      selectedStatus === 'all' || item.status === selectedStatus;
    const searchMatch =
      searchTerm === '' ||
      item.branch.includes(searchTerm) ||
      item.commit.includes(searchTerm);

    return statusMatch && searchMatch;
  });

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            ステージング環境
          </CardTitle>
          <CardDescription>
            最新のデプロイ状況と設定
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <Input
              placeholder="ブランチ、コミットIDで検索"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="flex items-center space-x-2">
              <Label htmlFor="status-select">ステータス:</Label>
              <Select
                id="status-select"
                value={selectedStatus}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="すべて" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="成功">成功</SelectItem>
                  <SelectItem value="失敗">失敗</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="debug-mode">デバッグモード:</Label>
              <Switch
                id="debug-mode"
                checked={isDebugMode}
                onCheckedChange={setIsDebugMode}
              />
            </div>
          </div>
          <ScrollArea className="h-[400px] mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>ブランチ</TableHead>
                  <TableHead>コミット</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>日時</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.branch}</TableCell>
                    <TableCell>{item.commit}</TableCell>
                    <TableCell
                      className={`${
                        item.status === '成功'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {item.status}
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Staging;
