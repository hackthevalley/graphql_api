const EventController = require('../controllers/EventController');
const EventEmailSignupController = require('../controllers/EventEmailSignupController');
const HackerController = require('../controllers/HackerController');

module.exports =  {
    Query: {
        events: EventController.list
    },
    Mutation: {
        createEventEmailSignup: EventEmailSignupController.create,
        createHacker: HackerController.create
    }
};
