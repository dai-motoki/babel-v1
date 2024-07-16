
import os
from typing import List
import asyncio
from services.anthropic_service import generate_text_anthropic
from utils.version_control import version_control

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

async def ai_update(file_path: str, version_control: bool, change_type: str, feature_request: str):
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

async def multi_ai_update(file_paths: List[str], version_control: bool, change_type: str, execution_mode: str, feature_request: str):
    tasks = [ai_update(file_path, version_control, change_type, feature_request) for file_path in file_paths]
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