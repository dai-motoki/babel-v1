
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
    full_path = os.path.join(BASE_PATH, file_path)
    with open(full_path, 'r') as file:
        content = file.read()
    # prompt = f"以下のファイル内容を{change_type}の方法で更新し、次の機能追加要望を実装してください：{feature_request}\n\n{content}"
    prompt = f"\n\n{content} \n\n に対して、{feature_request}"
    result = await generate_text_anthropic(prompt)
    if version_control:
        await version_control(file_path, "AI更新")
    return {"result": result, "file_path": file_path}

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
    with open(full_path, 'r') as file:
        content = file.read()
    python_process_prompt = f"""
    ファイルの書き込みはpythonファイルを作成します。
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
    
    # 現在の日付を取得
    import datetime
    current_date = datetime.datetime.now().strftime("%Y%m%d")
    
    # 一時ファイル名を生成
    temp_file_name = f"../.history/{current_date}.py"
    logger.info(f"一時ファイル名を生成しました: {temp_file_name}")
    
    # 一時ファイルにコードを書き込む
    os.makedirs(os.path.dirname(temp_file_name), exist_ok=True)
    with open(temp_file_name, 'w') as temp_file:
        temp_file.write(code)
    # logger.info(f"コードを一時ファイルに書き込みました: {temp_file_name}")
    
    # # サブプロセスでコードを実行
    try:
        logger.info("サブプロセスでコードを実行します。")
        output = subprocess.check_output(['python', temp_file_name], stderr=subprocess.STDOUT, universal_newlines=True)
        # result = {"generated_text": code}
        result = {"generated_text": code, "execution_output": output}
        logger.info("コードの実行が成功しました。")
    except subprocess.CalledProcessError as e:
        logger.error(f"コードの実行中にエラーが発生しました: {e}")
        # result = {"generated_text": code}
        result = {"generated_text": code, "execution_error": e.output}
    result = {"generated_text": text}
    
    # # 一時ファイルを削除
    # os.remove(temp_file_name)
    if version_control:
        logger.info(f"バージョン管理を実行します: {file_path}")
        await version_control(file_path, "AI更新")

    logger.info(f"処理が完了しました: {file_path}")
    return {"result": result, "file_path": file_path}

async def multi_ai_process(file_paths: List[str], version_control: bool, change_type: str, execution_mode: str, feature_request: str):
    tasks = [ai_process(file_path, version_control, change_type, feature_request) for file_path in file_paths]
    if execution_mode == "parallel":
        results = await asyncio.gather(*tasks)
    else:
        results = []
        for task in tasks:
            results.append(await task)
    return results
