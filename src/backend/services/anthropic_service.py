from anthropic import Anthropic
import asyncio
import logging

logger = logging.getLogger(__name__)

anthropic_client = Anthropic()

async def generate_text_anthropic(prompt: str):
    logger.info(f"Anthropicリクエストを受信: prompt={prompt}")
    try:
        message = await asyncio.to_thread(
            anthropic_client.messages.create,
            model="claude-3-5-sonnet-20240620",
            max_tokens=4000,
            temperature=1,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        logger.info("Anthropicでテキスト生成成功")
        logger.info(message.content[0].text)
        return {"generated_text": message.content[0].text}
    except Exception as e:
        logger.error(f"Anthropicでのテキスト生成中にエラーが発生: {str(e)}")
        raise