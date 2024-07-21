import subprocess
import os
import argparse

def create_next_app(project_dir):
    """
    指定されたプロジェクトディレクトリの app/frontend/ で create-next.sh を実行する関数
    """
    # 現在のディレクトリを保存
    current_dir = os.getcwd()
    
    try:
        # 指定されたプロジェクトディレクトリの app/frontend に移動
        frontend_dir = os.path.expanduser(f'~/babel_generated/{project_dir}/app/frontend')
        os.chdir(frontend_dir)
        
        # create-next.sh に実行権限を付与
        subprocess.run(['chmod', '+x', 'create-next.sh'], check=True)
        
        # create-next.sh を実行
        subprocess.run(['./create-next.sh', 'nextapp'], check=True)
        
        print(f"{project_dir} の Next.jsアプリケーションの作成が完了しました。")
    
    except subprocess.CalledProcessError as e:
        print(f"エラーが発生しました: {e}")
    
    except FileNotFoundError:
        print("create-next.sh が見つかりません。ファイルの場所を確認してください。")
    
    finally:
        # 元のディレクトリに戻る
        os.chdir(current_dir)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Next.jsアプリケーションを作成します。')
    parser.add_argument('-dir', '--directory', type=str, required=True, help='プロジェクトディレクトリ名')
    args = parser.parse_args()
    
    create_next_app(args.directory)
