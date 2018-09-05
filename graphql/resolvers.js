const EventController = require('../controllers/EventController');
const EventEmailSignupController = require('../controllers/EventEmailSignupController');
const HackerController = require('../controllers/HackerController');
const HackerTokenController = require('../controllers/HackerTokenController');
const UserTokenController = require('../controllers/UserTokenController');

module.exports =  {
    Query: {
        events: EventController.list,
        me: HackerController.me
    },
    Mutation: {
        createEventEmailSignup: EventEmailSignupController.create,
        createHacker: HackerController.create,
        updateHacker: HackerController.update,
        createHackerToken: HackerTokenController.create,
        createUserToken: UserTokenController.create
    }
};
