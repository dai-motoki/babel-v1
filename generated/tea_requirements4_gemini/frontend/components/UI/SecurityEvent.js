import { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface SecurityEventProps {
  timestamp: Date;
  type: string;
  description: string;
}

const SecurityEvent: React.FC<SecurityEventProps> = ({
  timestamp,
  type,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = format(timestamp, 'yyyy年MM月dd日 HH:mm', {
    locale: ja,
  });

  const typeColor =
    type === 'エラー'
      ? 'bg-red-500'
      : type === '警告'
      ? 'bg-yellow-500'
      : 'bg-green-500';

  return (
    <Alert className="mb-4 rounded-lg">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div
            className="flex cursor-pointer items-center gap-4 rounded-lg bg-white p-4 shadow-md hover:bg-gray-50"
            onClick={() => setIsOpen(true)}
          >
            <div
              className={`h-10 w-2 rounded-l-lg ${typeColor}`}
            ></div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <p className="font-bold">{type}</p>
                <p className="text-xs text-gray-500">
                  {formattedDate}
                </p>
              </div>
              <p className="text-sm text-gray-700 line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>セキュリティイベント詳細</DialogTitle>
          </DialogHeader>
          <DialogContent>
            <div className="mb-4 flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              <p className="text-sm">発生日時: {formattedDate}</p>
            </div>
            <div className="mb-4 flex items-center">
              <div
                className={`mr-2 h-5 w-5 rounded-full ${typeColor}`}
              ></div>
              <p className="text-sm">イベントタイプ: {type}</p>
            </div>
            <p className="text-sm">説明: {description}</p>
          </DialogContent>
          <DialogFooter>
            <Button type="button" onClick={() => setIsOpen(false)}>
              閉じる
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Alert>
  );
};

export default SecurityEvent;