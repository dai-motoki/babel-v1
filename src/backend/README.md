# ファイル操作API使用ガイド

このガイドでは、新しく追加されたファイル操作APIの使用方法を説明します。すべてのエンドポイントは `/api/files` のプレフィックスを持ちます。

## 1. ファイルのアップロード

- エンドポイント: `POST /api/files/upload`
- 説明: 新しいファイルをサーバーにアップロードします。
- 使用例:
  ```python
  import requests

  files = {'file': open('example.txt', 'rb')}
  response = requests.post('http://localhost:8000/api/files/upload', files=files)
  print(response.json())
  ```

## 2. ファイル一覧の取得

- エンドポイント: `GET /api/files/list`
- 説明: アップロードされたすべてのファイルのリストを取得します。
- 使用例:
  ```python
  import requests

  response = requests.get('http://localhost:8000/api/files/list')
  print(response.json())
  ```

## 3. ファイル内容の取得

- エンドポイント: `GET /api/files/content/{filename}`
- 説明: 指定されたファイルの内容を取得します。
- 使用例:
  ```python
  import requests

  filename = 'example.txt'
  response = requests.get(f'http://localhost:8000/api/files/content/{filename}')
  print(response.json())
  ```

## 4. ファイルの編集

- エンドポイント: `PUT /api/files/edit/{filename}`
- 説明: 指定されたファイルの特定の行を編集します。
- 使用例:
  ```python
  import requests

  filename = 'example.txt'
  data = {
      "line_number": 2,
      "new_content": "This is the new second line"
  }
  response = requests.put(f'http://localhost:8000/api/files/edit/{filename}', json=data)
  print(response.json())
  ```

## 5. ファイルへの追記

- エンドポイント: `POST /api/files/append/{filename}`
- 説明: 既存のファイルに新しい内容を追記します。
- 使用例:
  ```python
  import requests

  filename = 'example.txt'
  content = "This is a new line to append"
  response = requests.post(f'http://localhost:8000/api/files/append/{filename}?content={content}')
  print(response.json())
  ```

## 6. ファイルの削除

- エンドポイント: `DELETE /api/files/delete/{filename}`
- 説明: 指定されたファイルを削除します。
- 使用例:
  ```python
  import requests

  filename = 'example.txt'
  response = requests.delete(f'http://localhost:8000/api/files/delete/{filename}')
  print(response.json())
  ```

注意事項:
- すべてのリクエストで適切なエラーハンドリングを行ってください。
- ファイル名には適切なエンコーディングを使用してください。
- 大きなファイルを扱う場合は、タイムアウトの設定に注意してください。
- 実際の運用環境では、適切な認証と認可の仕組みを実装することを強くお勧めします。

これらのAPIを使用することで、サーバー上のファイルを効率的に管理できます。