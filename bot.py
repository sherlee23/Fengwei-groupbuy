from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
import logging

# 配置日志，让您可以看到Bot的运行信息
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# 将 YOUR_BOT_TOKEN 替换为您真实的 Telegram Bot API 令牌
# 示例: BOT_TOKEN = "1234567890:ABCDEFGHIJKLM_NOPQRSTUVWXYZabcdefghij"
BOT_TOKEN = "8048497346:AAGnDk0ZcXlT0LrOrgx0-K43Z18Q8otTnPA"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """当用户发送 /start 命令时调用"""
    user = update.effective_user
    logger.info(f"User {user.first_name} started the bot.")
    await update.message.reply_html(
        f"哈啰 {user.mention_html()}! 欢迎使用我的 Telegram Bot！\n\n我是你的编码伙伴。",
    )

async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """回显用户发送的任何文本消息"""
    logger.info(f"User {update.effective_user.first_name} sent message: {update.message.text}")
    await update.message.reply_text(f"您说的是：'{update.message.text}'")

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """当用户发送 /help 命令时调用"""
    await update.message.reply_text("您好！这是一个简单的回显机器人。发送任何文本我都会回复您。")

def main() -> None:
    """启动 bot"""
    # 创建 Application 并传入您的 bot 令牌
    application = Application.builder().token(BOT_TOKEN).build()

    # 添加命令处理器
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))

    # 添加消息处理器，用于处理所有非命令的文本消息
    # ~filters.COMMAND 表示不处理命令消息
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))

    # 启动 bot，它会一直运行，直到您按下 Ctrl+C
    print("Bot 正在运行中...")
    # run_polling 会阻塞，直到程序停止
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()