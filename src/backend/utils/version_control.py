import asyncio
from services.git_service import git_add, git_commit

async def version_control(file_path: str, operation: str):
    """
    ファイルの変更をバージョン管理システム（Git）に記録します。
    
    :param file_path: バージョン管理対象のファイルパス
    :param operation: 実行された操作の説明
    """
    try:
        repo_path = '.'  # リポジトリのルートパスを指定。必要に応じて変更してください。
        await git_add(repo_path, file_path)
        commit_message = f"AI {operation} on {file_path}"
        await git_commit(repo_path, commit_message)
        print(f"Version control: {commit_message}")
    except Exception as e:
        print(f"Error in version control: {str(e)}")
        # エラーが発生しても処理を続行するため、例外は再発生させません

# 必要に応じて、他のバージョン管理関連の関数をここに追加できます