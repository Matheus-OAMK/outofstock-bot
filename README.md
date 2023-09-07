# Product Stock Checker with Puppeteer and Telegram Notifications

This Node.js script checks the stock availability of products on a website and sends notifications to a Telegram chat when a product is in stock.

## Prerequisites

Before you begin, make sure you have the following:

- Node.js installed on your system.
- A Telegram bot token.
- A chat ID for the chat where you want to receive notifications.

## Installation

1. Clone this repository to your local machine:
  ```bash
   git clone https://github.com/Matheus-OAMK/outofstock-bot.git
  ```
2. Install the required dependencies using npm:
  ```bash
   npm install
  ```

3. Create a .env file in the project directory and add your Telegram bot token and chat ID:
  ```env
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token
   CHAT_ID=your-telegram-chat-id
  ```

