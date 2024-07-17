import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')

def process(text: str) -> str:
    """
    テキスト内のコードブロックを抽出する関数。

    引数:
        text (str): 処理対象のテキスト

    戻り値:
        str: 抽出されたコードブロックのみを含むテキスト
    """
    logger.info("process関数が呼び出されました")
    logger.info("テキスト処理を開始します")
    logger.info(type(text))
    logger.info(text)
    lines = text.split('\n')
    logger.info(f"テキストを{len(lines)}行に分割しました")
    result = []
    code_block = []
    inside_code_block = False
    current_language = None

    for line in lines:
        logger.debug(f"処理中の行: {line}")
        if line.strip().startswith('```'):
            if not inside_code_block:
                inside_code_block = True
                current_language = line.strip('`').lower()
                logger.debug(f"コードブロック開始: 言語 = {current_language}")
            else:
                inside_code_block = False
                logger.debug("コードブロック終了")
                result.extend(code_block)
                code_block = []
                current_language = None
        elif inside_code_block:
            logger.debug(f"コードブロック内の行を追加: {line}")
            code_block.append(line)
        else:
            logger.debug(f"通常のテキスト行をスキップ: {line}")

    # コードブロックが閉じられていない場合の処理を追加
    if inside_code_block:
        logger.warning("コードブロックが閉じられていません。残りのコードを結果に追加します。")
        result.extend(code_block)

    logger.info("テキスト処理が完了しました")
    return '\n'.join(result)
