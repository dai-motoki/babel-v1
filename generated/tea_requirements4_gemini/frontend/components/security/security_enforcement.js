import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../UI/card'
import { Input } from '../UI/input'
import { Label } from '../UI/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/select'
import { Switch } from '../UI/switch'
import { Toggle } from '../UI/toggle'
import { Icons } from '../UI/Icons'

export const SecurityEnforcement = () => {
  const [enabled, setEnabled] = useState(false)
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-lg font-medium">セキュリティ強化</CardTitle>
            <CardDescription>
              重要なセキュリティ設定を管理します
            </CardDescription>
          </div>
          <Toggle
            onCheckedChange={setEnabled}
            checked={enabled}
            aria-label="Toggle security enforcement"
          />
        </CardHeader>
        {enabled && (
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password-policy">パスワードポリシー</Label>
                  <Select>
                    <SelectTrigger id="password-policy">
                      <SelectValue placeholder="パスワードの強度を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weak">弱い</SelectItem>
                      <SelectItem value="medium">中</SelectItem>
                      <SelectItem value="strong">強い</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="mfa">多要素認証</Label>
                  <Select>
                    <SelectTrigger id="mfa">
                      <SelectValue placeholder="MFA方式を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">無効</SelectItem>
                      <SelectItem value="email">メール</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="authenticator">認証アプリ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="session-timeout">
                  セッションタイムアウト (分)
                </Label>
                <Input
                  id="session-timeout"
                  type="number"
                  defaultValue={30}
                  className="h-10"
                />
              </div>
              <div>
                <Label htmlFor="allowed-ips">許可済み IP アドレス</Label>
                <Input
                  id="allowed-ips"
                  type="text"
                  placeholder="例: 192.168.1.1, 10.0.0.0/24"
                  className="h-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="waf" />
                <Label htmlFor="waf">WAF (Web アプリケーションファイアウォール)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="ids" />
                <Label htmlFor="ids">IDS (侵入検知システム)</Label>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>最近のセキュリティイベント</CardTitle>
            <CardDescription>
              過去24時間のセキュリティイベントを表示
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium">
                  不正アクセス試行:
                </span>{' '}
                ユーザー「guest」が保護されたリソースへのアクセスを試みました。
              </li>
              <li>
                <span className="font-medium">
                  パスワードリセット:
                </span>{' '}
                ユーザー「admin」のパスワードがリセットされました。
              </li>
              <li>
                <span className="font-medium">
                  新規ログイン:
                </span>{' '}
                IP アドレス 192.168.1.100 からの新しいログインが検出されました。
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}