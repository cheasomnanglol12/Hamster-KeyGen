const fs = require('fs').promises;
const games = {
    'Cube': {
        appToken: 'd1690a07-3780-4068-810f-9b5bbf2931b2',
        promoId: 'b4170868-cef0-424f-8eb9-be0622e8e8e3',
    },
    'Polysphere': {
        appToken: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
        promoId: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71'
    },
    'Merge': {
        appToken: '8d1cc2ad-e097-4b86-90ef-7a27e19fb833',
        promoId: 'dc128d28-c45b-411c-98ff-ac7726fbaea4',
    },
    'Mow': {
        appToken: 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
        promoId: 'ef319a80-949a-492e-8ee0-424fb5fc20a6'
    },
    'Twerk': {
        appToken: '61308365-9d16-4040-8bb0-2f4a4c69074c',
        promoId: '61308365-9d16-4040-8bb0-2f4a4c69074c'
    },
    'Train': {
        appToken: '82647f43-3f87-402d-88dd-09a90025313f',
        promoId: 'c4480ac7-e178-4973-8061-9ed5b2e17954',
    },
    'Zoopolis': {
        appToken: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b',
        promoId: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b'
    },
    'Fluff': {
        appToken: '112887b0-a8af-4eb2-ac63-d82df78283d9',
        promoId: '112887b0-a8af-4eb2-ac63-d82df78283d9'
    },
    'Tile': {
        appToken: 'e68b39d2-4880-4a31-b3aa-0393e7df10c7',
        promoId: 'e68b39d2-4880-4a31-b3aa-0393e7df10c7'
    },
    'Stone': {
        appToken: '04ebd6de-69b7-43d1-9c4b-04a6ca3305af',
        promoId: '04ebd6de-69b7-43d1-9c4b-04a6ca3305af'
    },
    'Bounce': {
        appToken: 'bc72d3b9-8e91-4884-9c33-f72482f0db37',
        promoId: 'bc72d3b9-8e91-4884-9c33-f72482f0db37'
    },
    'Hide': {
        appToken: '4bf4966c-4d22-439b-8ff2-dc5ebca1a600',
        promoId: '4bf4966c-4d22-439b-8ff2-dc5ebca1a600'
    },
    'Pin': {
        appToken: 'd2378baf-d617-417a-9d99-d685824335f0',
        promoId: 'd2378baf-d617-417a-9d99-d685824335f0'
    },
    'Count': {
        appToken: '4bdc17da-2601-449b-948e-f8c7bd376553',
        promoId: '4bdc17da-2601-449b-948e-f8c7bd376553'
    },
    'Among': {
        appToken: 'daab8f83-8ea2-4ad0-8dd5-d33363129640',
        promoId: 'daab8f83-8ea2-4ad0-8dd5-d33363129640'
    },
    'Factory': {
        appToken: 'd02fc404-8985-4305-87d8-32bd4e66bb16',
        promoId: 'd02fc404-8985-4305-87d8-32bd4e66bb16'
    }

};

const urls = {
    login: 'https://api.gamepromo.io/promo/login-client',
    register: 'https://api.gamepromo.io/promo/register-event',
    createToken: 'https://api.gamepromo.io/promo/create-code'
}

const admin = '7070127929';

const sleep = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));


const commands = Object.keys(games).reduce((acc, game) => {
    const formattedGame = game.charAt(0).toLowerCase() + game.slice(1);
    acc[`/${formattedGame}`] = `${formattedGame.charAt(0).toUpperCase() + formattedGame.slice(1)}_keys.json`;
    return acc;
}, {});

const keysFiles = Object.values(commands);

async function ensureFileExists(filePath) {
    try {
        await fs.access(filePath);
    } catch {
        await fs.writeFile(filePath, '{}');
    }
}

const sleepDuration = 20;
const sleepUnit = sleepDuration >= 60
    ? (sleepDuration / 60).toFixed(2) > 1 ? 'minutes' : 'minute'
    : '';

module.exports = { games, urls, sleep, commands, keysFiles, sleepDuration, sleepUnit, ensureFileExists, admin };