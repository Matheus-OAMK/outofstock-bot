import puppeteer from 'puppeteer';
import fetch from 'node-fetch';
import {config} from 'dotenv';

config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN 
const CHAT_ID = process.env.CHAT_ID 

async function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const data = {
    chat_id: CHAT_ID,
    text: message,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Telegram notification sent successfully.');
    } else {
      console.error('Failed to send Telegram notification.');
    }
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
  }
}


const productInStock = 'https://www.jimms.fi/fi/Product/Show/187728/tuf-rtx4070ti-o12g-gaming/asus-geforce-rtx-4070-ti-tuf-gaming-oc-edition-naytonohjain-12gb-gddr6x'
const productOutOfStock = 'https://www.jimms.fi/fi/Product/Show/186311/49nxm5md6dsk/kfa2-geforce-rtx-4090-sg-1-click-oc-naytonohjain-24gb-gddr6x'


async function checkStock() {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: 'new',});
  const page = await browser.newPage();
  try {
    await page.goto(
      productInStock
    );

    const availabilityElement = await page.$('.availability-product');
    if (availabilityElement) {
      const availabilityText = await page.evaluate(
        (el) => el.querySelector('span > span').textContent,
        availabilityElement
      );

      if (availabilityText.includes('Ei varastossa')) {
        sendTelegramMessage('Item is out of stock =(')
      } else {
        sendTelegramMessage('ITEM IS IN STOCK GET YOUR CARD OUT LETS GO!!')
      }
    }
  } catch (error) {}

  await browser.close();
}

setInterval(checkStock, 5000)
