import os
import logging

logger = logging.getLogger(__name__)

def get_file_path(projectId: str, filename: str, upload_dir: str) -> str:
    """
    projectIdに基づいてファイルパスを決定し、ファイルの存在を確認する関数
    """
    logger.info(f"get_file_path関数が呼び出されました。projectId: {projectId}, filename: {filename}")
    
    if projectId == "babel":

        # ファイルパスを1つ上の階層から設定
        file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), filename)
        

        logger.info(f"babelプロジェクトのファイルパス: {os.path.abspath(file_path)}")
    else:
        file_path = os.path.join(os.path.expanduser("~"), "babel_generated", projectId, filename)
        logger.info(f"生成されたプロジェクトのファイルパス: {file_path}")
    
    if not os.path.exists(file_path):
        logger.error(f"ファイル {filename} が見つかりません")
        raise FileNotFoundError(f"ファイル {filename} が見つかりません")
    
    logger.info(f"ファイルパスが正常に取得されました: {file_path}")
    return file_path