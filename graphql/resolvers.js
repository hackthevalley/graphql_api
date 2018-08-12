const EventController = require('../controllers/EventController');
const EventEmailSignupController = require('../controllers/EventEmailSignupController');
const HackerController = require('../controllers/HackerController');
const HackerTokenController = require('../controllers/HackerTokenController');

module.exports =  {
    Query: {
        events: EventController.list,
        me: HackerController.me
    },
    Mutation: {
        createEventEmailSignup: EventEmailSignupController.create,
        createHacker: HackerController.create,
        createHackerToken: HackerTokenController.create
    }
};
