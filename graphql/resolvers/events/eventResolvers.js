const EventController = require('../../../controllers/EventController');

module.exports = {
    Query: {
        events: EventController.list,
    },
    Event: {
        applications: EventController.applications
    },
};
