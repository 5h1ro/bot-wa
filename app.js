const {
    Client
} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const axios = require("axios");

const client = new Client({
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ],
        headless: true,
        browserWSEndpoint: "ws://127.0.0.1:9337/?--user-data-dir=/usr/src/app/user-data-dir/ioniabotbrowser&--no-sandbox&--disable-setuid-sandbox&--disable-dev-shm-usage&--disable-accelerated-2d-canvas&--no-first-run&--no-zygote&--single-process&--disable-gpu&--window-size=426,240",
    },
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {
        small: true
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (msg) => {
    if (msg.body === '!wahai-rakyatku') {
        const chat = await msg.getChat();

        let text = '';
        let mentions = [];

        for (let participant of chat.participants) {
            mentions.push(`${participant.id.user}@c.us`);
            text += `@${participant.id.user} `;
        }

        await chat.sendMessage("Wahai rakyat jelata IONIA, Raja dan Ratu memanggil kalian", {
            mentions
        });
    } else if (msg.body === '!buat-stiker-ini') {
        if (msg.hasMedia) {
            const chat = await msg.getChat();
            if (chat.name == "IONIA EMPIRE") {
                if (msg.body === '!buat-stiker-ini') {
                    const chat_id = chat.id._serialized;
                    const media_message = await msg.downloadMedia();
                    await client.sendMessage(chat_id, media_message, {
                        sendMediaAsSticker: true
                    });
                    await chat.sendMessage("Berikut stiker anda yang mulia");
                }
            }
        }
    } else if (msg.body.startsWith("/freya")) {
        const message = msg.body.slice(6);
        const apiUrl = 'http://127.0.0.1:8000';
        const chat = await msg.getChat();
        let resMessage = "Freya sedang sibuk, jadi tidak bisa membalasmu :(";
        await axios.post(apiUrl, {
                message
            })
            .then(response => {
                resMessage = response.data
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        await chat.sendMessage(resMessage);
    } else if (msg.body.startsWith("/gojo")) {
        const message = msg.body.slice(5);
        const apiUrl = 'http://127.0.0.1:8000/gojo';
        const chat = await msg.getChat();
        let resMessage = "Gojo telah terbelah, jadi tidak bisa membalas :(";
        await axios.post(apiUrl, {
                message
            })
            .then(response => {
                resMessage = response.data
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        await chat.sendMessage(resMessage);
    } else if (msg.body.startsWith("/kobo")) {
        const message = msg.body.slice(5);
        const apiUrl = 'http://127.0.0.1:8000/kobo';
        const chat = await msg.getChat();
        let resMessage = "Kobo end live :(";
        await axios.post(apiUrl, {
                message
            })
            .then(response => {
                resMessage = response.data
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        await chat.sendMessage(resMessage);
    } else if (msg.body === '!ping') {
        const chat = await msg.getChat();
        await chat.sendMessage("Hamba disini yang mulia");
    }
});

client.initialize();