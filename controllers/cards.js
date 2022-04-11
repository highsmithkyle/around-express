const path = require('path');
const { readFile } = require('../helpers');

const USERS_PATH = path.join(__dirname, '../data/cards.json');

const getCards = (req, res) => {
    readFile(USERS_PATH)
        .then((cards) => res.send({ data: JSON.parse(cards) }))
        .catch(() => res.send({ message: `An error has occured on the server` }));
};

module.exports = {
    getCards,
}