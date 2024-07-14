from openai import AsyncOpenAI
import logging
from config.settings import OPENAI_API_KEY

logger = logging.getLogger(__name__)

openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)

async def generate_text_gpt4o(prompt: str):
    logger.info(f"GPT-4oリクエストを受信: prompt={prompt}")
    try:
        response = await openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=1,
            max_tokens=4000,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        generated_text = response.choices[0].message.content.strip()
        logger.info("GPT-4oでテキスト生成成功")
        logger.info(generated_text)
        return {"generated_text": generated_text}
    except Exception as e:
        logger.error(f"GPT-4oでのテキスト生成中にエラーが発生: {str(e)}")
        raise