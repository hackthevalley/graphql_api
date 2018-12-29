const HackerTokenController = require('../../../controllers/HackerTokenController');

module.exports = {
    Mutation: {
        createHackerToken: HackerTokenController.create,
    }
};
