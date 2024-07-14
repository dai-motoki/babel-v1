import React from 'react';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Switch,
} from "@material-tailwind/react";
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

const systemData = [
  { name: 'Webサーバー', status: '稼働中', uptime: '99.98%', responseTime: '200ms' },
  { name: 'データベースサーバー', status: '稼働中', uptime: '99.95%', responseTime: '50ms' },
  { name: 'メールサーバー', status: '停止中', uptime: '99.80%', responseTime: 'N/A' },
  { name: 'APIサーバー', status: '稼働中', uptime: '99.99%', responseTime: '150ms' },
];

const eventData = [
  { id: 1, time: '10:00 AM', type: '情報', message: 'システムは正常に稼働しています。' },
  { id: 2, time: '10:30 AM', type: '警告', message: 'ディスク使用量が80%を超えました。' },
  { id: 3, time: '11:00 AM', type: 'エラー', message: 'メールサーバーへの接続に失敗しました。' },
  { id: 4, time: '11:30 AM', type: '情報', message: 'メールサーバーが再起動されました。' },
];

const Monitoring = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">システム監視</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemData.map((system) => (
          <Card key={system.name} className="bg-white border border-gray-200">
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-t-lg bg-green-500"
            >
              <div className="flex items-center justify-between">
                <Typography variant="h6" color="white">
                  {system.name}
                </Typography>
                <div className="flex items-center gap-2">
                  {system.status === '稼働中' && (
                    <CheckCircleIcon className="h-6 w-6 text-green-300" />
                  )}
                  {system.status === '停止中' && (
                    <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                  )}
                  <Switch defaultChecked />
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="mb-4">
                <Typography variant="small" color="gray-600">
                  稼働時間:
                </Typography>
                <Typography variant="h6" color="gray-800">
                  {system.uptime}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="gray-600">
                  応答時間:
                </Typography>
                <Typography variant="h6" color="gray-800">
                  {system.responseTime}
                </Typography>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          最近のイベント
          <Button
            variant="text"
            size="sm"
            color="blue-gray"
            className="ml-2"
            onClick={handleToggleDetails}
          >
            {showDetails ? '詳細を隠す' : '詳細を表示'}
          </Button>
        </h3>
        <div className="space-y-4">
          {eventData.map((event) => (
            <div
              key={event.id}
              className={`flex items-start ${
                showDetails ? 'h-auto' : 'h-12'
              } overflow-hidden transition-all duration-300`}
            >
              <div className="w-10 flex items-center justify-center">
                {event.type === '情報' && (
                  <InformationCircleIcon className="h-6 w-6 text-blue-500" />
                )}
                {event.type === '警告' && (
                  <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" />
                )}
                {event.type === 'エラー' && (
                  <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                )}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-800">
                  {event.time} - {event.message}
                </p>
                {showDetails && (
                  <p className="text-xs text-gray-600">
                    詳細情報：{event.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Monitoring;

