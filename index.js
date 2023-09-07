import puppeteer from 'puppeteer';
import fetch from 'node-fetch';
import { config } from 'dotenv';

config();

//replace this with your actual data
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const interval = 5000; // replace for desired interval time in ms

//replace this with the url of the item you want to check
const productUrl =
  'https://www.jimms.fi/fi/Product/Show/186311/49nxm5md6dsk/kfa2-geforce-rtx-4090-sg-1-click-oc-naytonohjain-24gb-gddr6x';

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

async function checkStock() {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    await page.goto(productUrl);

    const availabilityElement = await page.$('.availability-product');
    if (availabilityElement) {
      const availabilityText = await page.evaluate(
        (el) => el.querySelector('span > span').textContent,
        availabilityElement
      );

      if (availabilityText.includes('Ei varastossa')) {
        sendTelegramMessage('Item is out of stock =('); //comment this out if you dont want messages when item is out of stock
        console.log('Item is out of stock =(');
      } else {
        sendTelegramMessage('ITEM IS IN STOCK GET YOUR CARD OUT LETS GO!!');
        console.log('ITEM IS IN STOCK GET YOUR CARD OUT LETS GO!!');
      }
    }
  } catch (error) {}

  await browser.close();
}

setInterval(checkStock, interval);
