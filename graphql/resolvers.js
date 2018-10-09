const EventController = require('../controllers/EventController');
const EventEmailSignupController = require('../controllers/EventEmailSignupController');
const HackerController = require('../controllers/HackerController');
const HackerTokenController = require('../controllers/HackerTokenController');
const UserTokenController = require('../controllers/UserTokenController');
const UserController = require('../controllers/UserController');
const ApplicationController = require('../controllers/ApplicationController');

module.exports =  {
    Query: {
        events: EventController.list,
        me: HackerController.me,
        user: UserController.user
    },
    Event: {
        applications: EventController.applications
    },
    Mutation: {
        createEventEmailSignup: EventEmailSignupController.create,
        createEventApplication: ApplicationController.create,
        deleteEventApplication: ApplicationController.delete,
        updateEventApplication: ApplicationController.update,
        createHacker: HackerController.create,
        updateHacker: HackerController.update,
        createHackerToken: HackerTokenController.create,
        createUserToken: UserTokenController.create,
    }
};
