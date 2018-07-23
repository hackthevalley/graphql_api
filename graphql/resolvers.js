const EventController = require('../controllers/EventController');
const EventEmailSignupController = require('../controllers/EventEmailSignupController');


module.exports =  {
    Query: {
        events: EventController.list
    },
    Mutation: {
        createEventEmailSignup: EventEmailSignupController.create
    }
};
