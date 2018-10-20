const EventController = require('../controllers/EventController');
const EventEmailSignupController = require('../controllers/EventEmailSignupController');
const HackerController = require('../controllers/HackerController');
const HackerTokenController = require('../controllers/HackerTokenController');
const UserTokenController = require('../controllers/UserTokenController');
const UserController = require('../controllers/UserController');
const ApplicationController = require('../controllers/ApplicationController');
const HackerApplicationController = require('../controllers/HackerApplicationController');


module.exports =  {
    Query: {
        events: EventController.list,
        me: HackerController.me,
        user: UserController.user
    },
    Application: {
        event: ApplicationController.event
    },
    Event: {
        applications: EventController.applications
    },
    Hacker: {
        applications: HackerController.applications
    },
    HackerApplication: {
        application: HackerApplicationController.application
    },
    Mutation: {
        createEventEmailSignup: EventEmailSignupController.create,
        createEventApplication: ApplicationController.create,
        deleteEventApplication: ApplicationController.delete,
        updateEventApplication: ApplicationController.update,
        createEventApplicationQuestion: ApplicationController.createQuestion,
        updateEventApplicationQuestion: ApplicationController.updateQuestion,
        deleteEventApplicationQuestion: ApplicationController.deleteQuestion,
        createHacker: HackerController.create,
        updateHacker: HackerController.update,
        createHackerToken: HackerTokenController.create,
        createUserToken: UserTokenController.create,
        createHackerApplication: HackerApplicationController.create,
        updateHackerApplicationAnswer: HackerApplicationController.updateAnswer
    }
};
