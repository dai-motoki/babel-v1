import os
import logging
import argparse
from tqdm import tqdm
import concurrent.futures
import importlib

from utils.utils import generate_response, normal

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')

def import_modules(saas_name):
    concept = importlib.import_module(f"{saas_name}.def_concept").concept
    dir_frontend = importlib.import_module(f"{saas_name}.def_concept").dir_frontend
    files = importlib.import_module(f"{saas_name}.def_domain").files
    root_dir = importlib.import_module(f"{saas_name}.def_domain").root_dir
    constraints = importlib.import_module(f"{saas_name}.def_constraints").constraints
    return concept, dir_frontend, files, root_dir, constraints

def create_file(directory, filename, prompt, file_number, concept, dir_frontend, constraints, root_dir, progress_bar, total_files):
    file_path = os.path.join(root_dir, directory)
    os.makedirs(file_path, exist_ok=True)  # ディレクトリが存在しない場合は作成
    file_path = os.path.join(file_path, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        model = "claude-3-5-sonnet-20240620"
        full_prompt = f'''
        {concept}\n{dir_frontend}\n{constraints}\n上記の内容をもとにして{prompt}
        '''
        max_tokens = 4000
        temperature = 0.7
        
        response = generate_response(model, full_prompt, max_tokens, temperature)
        formatted_response = normal(response)
        f.write(formatted_response)
    
    progress_bar.update(1)
    print(f"{file_number}枚目/{total_files}が完了しました。")

def main(saas_name):
    concept, dir_frontend, files, root_dir, constraints = import_modules(saas_name)
    
    os.makedirs(root_dir, exist_ok=True)

    # プログレスバーの初期化
    progress_bar = tqdm(total=len(files), unit="files")

    # 並列実行のためのスレッドプールを作成
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(create_file, directory, filename, prompt, i+1, concept, dir_frontend, constraints, root_dir, progress_bar, len(files)) 
                   for i, (directory, filename, prompt) in enumerate(files)]
        for future in concurrent.futures.as_completed(futures):
            future.result()

    progress_bar.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="SaaSアプリケーション生成スクリプト")
    parser.add_argument("-s", "--saas_name", required=True, help="SaaS名を指定してください")
    args = parser.parse_args()
    
    main(args.saas_name)
