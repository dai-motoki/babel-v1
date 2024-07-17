| ファイル名 | ローカルストレージに保存すべき項目 |
|------------|----------------------------------|
| AIChat.tsx | 1. messages（チャット履歴）<br>2. tasks（タスク履歴）<br>3. position（チャットボックスの位置）<br>4. showTaskManager（タスクマネージャーの表示/非表示状態）<br>5. pendingRequests（処理中のリクエストID）<br>6. input（入力中のテキスト） |
| FileStructure/index.tsx | 1. selectedNodes<br>2. searchQuery<br>3. showFileNames<br>4. highlightedNodes<br>5. selectedStructure<br>6. isSelectionMode<br>7. filteredNodes と filteredLinks<br>8. changes<br>9. selectedSystem |
| SearchBar.tsx | 1. 最後に検索された文字列<br>2. 最近の検索履歴<br>3. ユーザーの検索設定 |
| greet-test.tsx | 1. ユーザー名<br>2. 挨拶のカスタマイズ<br>3. 最後に使用した入力<br>4. 使用回数<br>5. タイムスタンプ |
| RecentChanges.tsx | 1. 最近の変更リスト（changes配列）<br>2. 表示数の設定 |
| TaskManager.tsx | 1. expandedTasks<br>2. expandedFiles<br>3. tasks（基本情報のみ） |
| StackEditor.tsx | 1. isVimMode<br>2. editorOptions（fontSize, minimap.enabled, wordWrap等）<br>3. エディタの位置<br>4. 最後に編集したファイルのパス<br>5. カスタムテーマの設定<br>6. 最近開いたファイルのリスト<br>7. エディタのサイズ |
| 共通項目 | 1. 言語設定<br>2. テーマ設定 |