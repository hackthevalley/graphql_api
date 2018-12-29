const ApplicationController = require('../../../controllers/ApplicationController');

module.exports = {
    Application: {
        event: ApplicationController.event
    },
    Mutation: {
        createEventApplication: ApplicationController.create,
        deleteEventApplication: ApplicationController.delete,
        updateEventApplication: ApplicationController.update,
        createEventApplicationQuestion: ApplicationController.createQuestion,
        updateEventApplicationQuestion: ApplicationController.updateQuestion,
        deleteEventApplicationQuestion: ApplicationController.deleteQuestion,
    }
};
