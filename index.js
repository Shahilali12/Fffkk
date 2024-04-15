const TelegramBot = require('node-telegram-bot-api');
const { createLogo } = require('./logoGenerator'); // Assuming you have a function to generate logos

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual Telegram bot token
const bot = new TelegramBot('7173317866:AAEDE2ubLHQpn2NOEdXegFpqGJ53vuaW1v8', { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Welcome to the Logo Maker Bot! You can create logos by typing /make_logo.");
});

bot.onText(/\/make_logo/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Please enter the name you want on your logo:");
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const name = msg.text;

  try {
    const logo = await createLogo(name); // Assuming createLogo function generates the logo
    bot.sendPhoto(chatId, logo, { caption: "Here's your generated logo!" });
  } catch (error) {
    bot.sendMessage(chatId, "Sorry, an error occurred while generating your logo. Please try again later.");
  }
});
