
import os
from typing import List
import asyncio
from services.anthropic_service import generate_text_anthropic
from utils.version_control import version_control
from utils.process import process
import subprocess
import logging

logger = logging.getLogger(__name__)

# ベースファイルパスを設定
BASE_PATH = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

async def ai_analyze(file_path: str, version_control: bool, analysis_depth: str):
    full_path = os.path.join(BASE_PATH, file_path)
    with open(full_path, 'r') as file:
        content = file.read()
    prompt = f"以下のファイル内容を{analysis_depth}の深さで分析してください：\n\n{content}"
    result = await generate_text_anthropic(prompt)
    if version_control:
        await version_control(file_path, "AI分析")
    return result

async def ai_reply(file_path: str, version_control: bool, change_type: str, feature_request: str):
    # 機能追加系
    logger.info(f"ai_reply関数が呼び出されました。ファイルパス: {file_path}")
    full_path = os.path.join(BASE_PATH, file_path)
    try:
        # ディレクトリかどうかをチェック
        if os.path.isdir(full_path):
            logger.info(f"{file_path}はディレクトリです。ディレクトリ用の処理を実行します。")
            # ディレクトリの場合、直下のツリー構造を取得
            tree_structure = get_directory_tree(full_path)
            
            # ディレクトリ構造と要望に基づいて返答を生成
            prompt = f"""
            以下のディレクトリ構造に対して、{feature_request} を実現する方法を提案してください。
            
            ディレクトリ構造:
            {tree_structure}
            
            提案には以下の点を含めてください：
            1. 新しいファイルやディレクトリの追加が必要な場合、その構造と目的
            2. 既存のファイルに変更が必要な場合、どのファイルをどのように変更するか
            3. 全体的なアプローチと、それがどのようにして要望を満たすか
            """
            
            result = await generate_text_anthropic(prompt)
            return {"result": result, "file_path": file_path, "is_directory": True}
        
        # ファイルの場合
        with open(full_path, 'r') as file:
            content = file.read()
        logger.debug(f"ファイル {file_path} の内容を読み込みました")
        
        prompt = f"\n\n{content} \n\n に対して、{feature_request}"
        logger.info(f"Anthropicに送信するプロンプトを生成しました: {prompt[:100]}...")
        
        result = await generate_text_anthropic(prompt)
        logger.info("Anthropicからの応答を受信しました")
        
        if version_control:
            await version_control(file_path, "AI更新")
            logger.debug(f"ファイル {file_path} のバージョン管理を実行しました")
        
        return {"result": result, "file_path": file_path, "is_directory": False}
    except Exception as e:
        logger.error(f"ai_reply関数でエラーが発生しました: {str(e)}")
        raise

async def multi_ai_reply(file_paths: List[str], version_control: bool, change_type: str, execution_mode: str, feature_request: str):
    tasks = [ai_reply(file_path, version_control, change_type, feature_request) for file_path in file_paths]
    if execution_mode == "parallel":
        results = await asyncio.gather(*tasks)
    else:
        results = []
        for task in tasks:
            results.append(await task)
    return results

async def ai_rewrite(file_path: str, version_control: bool, rewrite_style: str):
    full_path = os.path.join(BASE_PATH, file_path)
    with open(full_path, 'r') as file:
        content = file.read()
    prompt = f"以下のファイル内容を{rewrite_style}のスタイルで書き直してください：\n\n{content}"
    result = await generate_text_anthropic(prompt)
    if version_control:
        await version_control(file_path, "AI書き直し")
    return result

async def ai_append(file_path: str, version_control: bool, append_location: str):
    full_path = os.path.join(BASE_PATH, file_path)
    with open(full_path, 'r') as file:
        content = file.read()
    prompt = f"以下のファイル内容の{append_location}に追記してください：\n\n{content}"
    result = await generate_text_anthropic(prompt)
    if version_control:
        await version_control(file_path, "AI追記")
    return result

async def ai_analyze_dependencies(file_paths: List[str], version_control: bool, analysis_scope: str):
    contents = []
    for file_path in file_paths:
        full_path = os.path.join(BASE_PATH, file_path)
        with open(full_path, 'r') as file:
            contents.append(file.read())
    prompt = f"以下のファイル内容の依存関係を{analysis_scope}の範囲で分析してください：\n\n" + "\n\n".join(contents)
    result = await generate_text_anthropic(prompt)
    if version_control:
        for file_path in file_paths:
            await version_control(file_path, "AI依存関係分析")
    return result

async def multi_ai_analyze(file_paths: List[str], version_control: bool, analysis_depth: str, execution_mode: str, ):
    tasks = [ai_analyze(file_path, version_control, analysis_depth) for file_path in file_paths]
    if execution_mode == "parallel":
        results = await asyncio.gather(*tasks)
    else:
        results = []
        for task in tasks:
            results.append(await task)
    return results

async def multi_ai_reply(file_paths: List[str], version_control: bool, change_type: str, execution_mode: str, feature_request: str):
    tasks = [ai_reply(file_path, version_control, change_type, feature_request) for file_path in file_paths]
    if execution_mode == "parallel":
        results = await asyncio.gather(*tasks)
    else:
        results = []
        for task in tasks:
            results.append(await task)
    return results

async def multi_ai_rewrite(file_paths: List[str], version_control: bool, rewrite_style: str, execution_mode: str):
    tasks = [ai_rewrite(file_path, version_control, rewrite_style) for file_path in file_paths]
    if execution_mode == "parallel":
        results = await asyncio.gather(*tasks)
    else:
        results = []
        for task in tasks:
            results.append(await task)
    return results

async def multi_ai_append(file_paths: List[str], version_control: bool, append_location: str, execution_mode: str):
    tasks = [ai_append(file_path, version_control, append_location) for file_path in file_paths]
    if execution_mode == "parallel":
        results = await asyncio.gather(*tasks)
    else:
        results = []
        for task in tasks:
            results.append(await task)
    return results

async def multi_ai_analyze_dependencies(file_paths: List[str], version_control: bool, analysis_scope: str, execution_mode: str):
    return await ai_analyze_dependencies(file_paths, version_control, analysis_scope)


async def ai_process(file_path: str, version_control: bool, change_type: str, feature_request: str):
    # 機能追加系
    full_path = os.path.join(BASE_PATH, file_path)
    
    # ディレクトリかどうかをチェック
    if os.path.isdir(full_path):
        # ディレクトリの場合、直下のツリー構造を取得
        tree_structure = get_directory_tree(full_path)
        
        # ディレクトリ構造と要望に基づいて返答を生成
        prompt = f"""
        以下のディレクトリ構造に対して、{feature_request} を実現する方法を提案してください。
        
        ディレクトリ構造:
        {tree_structure}
        
        提案には以下の点を含めてください：
        1. 新しいファイルやディレクトリの追加が必要な場合、その構造と目的
        2. 既存のファイルに変更が必要な場合、どのファイルをどのように変更するか
        3. 全体的なアプローチと、それがどのようにして要望を満たすか
        """
        
        result = await generate_text_anthropic(prompt)
        return {"result": result, "file_path": file_path, "is_directory": True}
    
    # ファイルの場合は既存の処理を続行
    with open(full_path, 'r') as file:
        content = file.read()
    python_process_prompt = f"""
    ファイルの書き込みはpythonファイルを作成します。
    - 1枚のファイルで書いてください。複数に分けてはいけません。

    - ... (他の既存のコードは変更なし)などは書かない。絶対に省略しない
    - 変更前にgit保存。変更後はgit保存しない
    - python subprocess モジュール使用
    - {full_path}への直接書き込み
    - プログラムは全文出力し、コードブロックで囲うこと。省略は一切しない。
    """
    prompt = f"""\n\n{content} \n\n に対して、{feature_request} を実現するコードを提案してください。
    """ + python_process_prompt

    logger.info(f"Anthropicからテキストを生成します。プロンプト: {prompt[:100]}...")
    result = await generate_text_anthropic(prompt)
    text = result['generated_text']
    logger.info("Anthropicからのテキスト生成が完了しました。")

    logger.info("生成されたテキストを処理します。")
    code = process(text)

    logger.info("テキスト処理が完了しました。")
    
    # 現在の日付と時刻を取得
    import datetime
    current_datetime = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # 一時ファイル名を生成
    temp_file_name = f"../.history/{current_datetime}.py"
    logger.info(f"一時ファイル名を生成しました: {temp_file_name}")
    
    # 一時ファイルにコードを書き込む
    os.makedirs(os.path.dirname(temp_file_name), exist_ok=True)
    with open(temp_file_name, 'w') as temp_file:
        temp_file.write(code)
    logger.info(f"コードを一時ファイルに書き込みました: {temp_file_name}")
    
    # サブプロセスでコードを実行
    try:
        logger.info("サブプロセスでコードを実行します。")
        output = subprocess.check_output(['python', temp_file_name], stderr=subprocess.STDOUT, universal_newlines=True)
        result = {"generated_text": code, "execution_output": output}
        logger.info("コードの実行が成功しました。")
    except subprocess.CalledProcessError as e:
        logger.error(f"コードの実行中にエラーが発生しました: {e}")
        result = {"generated_text": code, "execution_error": e.output}
    
    if version_control:
        logger.info(f"バージョン管理を実行します: {file_path}")
        await version_control(file_path, "AI更新")

    logger.info(f"処理が完了しました: {file_path}")
    return {"result": result, "file_path": file_path, "is_directory": False}

def get_directory_tree(path, level=0):
    tree = ""
    for item in os.listdir(path):
        item_path = os.path.join(path, item)
        if os.path.isdir(item_path):
            tree += "    " * level + f"📁 {item}/\n"
            tree += get_directory_tree(item_path, level + 1)
        else:
            tree += "    " * level + f"📄 {item}\n"
    return tree

async def multi_ai_process(file_paths: List[str], version_control: bool, change_type: str, execution_mode: str, feature_request: str):
    tasks = [ai_process(file_path, version_control, change_type, feature_request) for file_path in file_paths]
    if execution_mode == "parallel":
        results = await asyncio.gather(*tasks)
    else:
        results = []
        for task in tasks:
            results.append(await task)
    return results
