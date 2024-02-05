const {
    Client
} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const client = new Client({
    puppeteer: {
        args: [
            "--no-sandbox",
        ],
        browserWSEndpoint: "ws://localhost:9337",
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
    } else {
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
    }
});

client.initialize();