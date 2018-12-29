const EventEmailSignupController = require('../../../controllers/EventEmailSignupController');

module.exports = {
    Mutation: {
        createEventEmailSignup: EventEmailSignupController.create,
    }
};
