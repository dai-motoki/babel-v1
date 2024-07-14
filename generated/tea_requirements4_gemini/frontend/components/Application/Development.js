import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../UI/data";
import { Calendar } from "../UI/calendar";
import {
  LucideTerminalSquare,
  LucideCheckCircle2,
  LucideAlertCircle,
} from "lucide-react";

const statusColors = {
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
};

const Development = () => {
  const [deploymentDate, setDeploymentDate] = useState(new Date());
  const [branchName, setBranchName] = useState('');
  const [commitHash, setCommitHash] = useState('');
  const [buildStatus, setBuildStatus] = useState('pending');
  const [deploymentStatus, setDeploymentStatus] = useState('pending');

  const handleDeploy = () => {
    // ここにデプロイ処理を実装
    console.log('Deploying to development environment...');
    setBuildStatus('running');
    setTimeout(() => {
      setBuildStatus('success');
      setDeploymentStatus('running');
    }, 2000);
    setTimeout(() => {
      setDeploymentStatus('success');
    }, 4000);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Typography variant="h3">開発環境</Typography>
        <Button variant="outline" size="sm">
          詳細設定
        </Button>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="branchName">ブランチ名</Label>
            <Input
              id="branchName"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="commitHash">コミットハッシュ</Label>
            <Input
              id="commitHash"
              value={commitHash}
              onChange={(e) => setCommitHash(e.target.value)}
              className="mt-2"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="deploymentDate">デプロイ日時</Label>
            <Calendar
              id="deploymentDate"
              selected={deploymentDate}
              onChange={setDeploymentDate}
              className="mt-2"
            />
          </div>
        </div>
        <div className="mt-8">
          <Typography variant="h4" className="mb-2">
            ステータス
          </Typography>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <LucideTerminalSquare
                className={statusColors[buildStatus]}
                size={20}
              />
              <Typography
                variant="lg"
                className={statusColors[buildStatus]}
              >
                ビルド: {buildStatus === 'pending' ? '未実行' : buildStatus === 'running' ? '実行中...' : '成功'}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <LucideCheckCircle2
                className={statusColors[deploymentStatus]}
                size={20}
              />
              <Typography
                variant="lg"
                className={statusColors[deploymentStatus]}
              >
                デプロイ: {deploymentStatus === 'pending' ? '未実行' : deploymentStatus === 'running' ? '実行中...' : '成功'}
              </Typography>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="text-right">
        <Button onClick={handleDeploy}>デプロイ</Button>
      </CardFooter>
    </Card>
  );
};

export default Development;
