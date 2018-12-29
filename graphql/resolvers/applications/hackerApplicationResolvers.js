const HackerApplicationController = require('../../../controllers/HackerApplicationController');

module.exports = {
    HackerApplication: {
        application: HackerApplicationController.application
    },
    Mutation: {
        createHackerApplication: HackerApplicationController.create,
        submitHackerApplication: HackerApplicationController.submit,
        updateHackerApplicationAnswer: HackerApplicationController.updateAnswer
    }
};
