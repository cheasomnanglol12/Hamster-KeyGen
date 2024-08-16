require('dotenv').config();
const { getKeys, getAllKeys } = require('./tokenGeneration');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post(`/`, (req, res) => {
    console.log('received post request');
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

async function sendKeys(msg, filePath) {
    let keys = JSON.parse(fs.readFileSync(filePath));
    let keysToSend = keys.slice(0, 4);
    keysToSend.forEach(key => bot.sendMessage(msg.chat.id, key));
    fs.writeFileSync(filePath, JSON.stringify(keys.slice(4), null, 2));
}

bot.onText('/start', (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome to the Hamster Key Generator Bot!');

    const userInfo = {
        id: msg.chat.id,
        username: msg.chat.username,
        first_name: msg.chat.first_name,
        last_name: msg.chat.last_name
    };

    const filePath = path.join(__dirname, 'Keys', 'Bot_Users.json');
    const existingUsers = JSON.parse(fs.readFileSync(filePath));

    if (!existingUsers.some(user => user.id === userInfo.id)) {
        existingUsers.push(userInfo);
        fs.writeFileSync(filePath, JSON.stringify(existingUsers, null, 2));
    }
});


const commands = {
    '/bike': 'Bike_keys.json',
    '/cube': 'Cube_keys.json',
    '/clone': 'Clone_keys.json',
    '/train': 'Train_keys.json',
    '/merge': 'Merge_keys.json'
};

Object.entries(commands).forEach(([command, file]) => {
    bot.onText(new RegExp(command), async (msg) => {
        await sendKeys(msg, path.join(__dirname, 'Keys', file));
    });
});

const keysFiles = ['Bike_keys.json', 'Cube_keys.json', 'Clone_keys.json', 'Train_keys.json', 'Merge_keys.json'];

bot.onText('/remaining', async (msg) => {
    const remaining = await Promise.all(keysFiles.map(async file => {
        const filePath = path.join(__dirname, 'Keys', file);
        const keys = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
        return `${file.replace('_keys.json', ' Keys')}: ${keys.length}`;
    }));
    bot.sendMessage(msg.chat.id, remaining.join('\n'));
});

bot.onText('/users', async (msg) => {
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'Keys', 'Bot_Users.json')));
    const list = users.map(user =>
        `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}${user.username ? `: @${user.username}` : ''}`
    );
    bot.sendMessage(msg.chat.id, list.join('\n'));
});

getAllKeys();