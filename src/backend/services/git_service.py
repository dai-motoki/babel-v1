import asyncio
import subprocess

async def git_add(repo_path: str, file_path: str):
    process = await asyncio.create_subprocess_exec(
        'git', '-C', repo_path, 'add', file_path,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )
    stdout, stderr = await process.communicate()
    if process.returncode != 0:
        raise Exception(f"Git add failed: {stderr.decode()}")
    return stdout.decode()

async def git_commit(repo_path: str, message: str):
    process = await asyncio.create_subprocess_exec(
        'git', '-C', repo_path, 'commit', '-m', message,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )
    stdout, stderr = await process.communicate()
    if process.returncode != 0:
        raise Exception(f"Git commit failed: {stderr.decode()}")
    return stdout.decode()