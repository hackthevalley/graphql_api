const HackerController = require('../../../controllers/HackerController');

module.exports = {
    Query: {
        me: HackerController.me,
        hackers: HackerController.list
    },
    Hacker: {
        applications: HackerController.applications,
    },
    Mutation: {
        createHacker: HackerController.create,
        updateHacker: HackerController.update,
        sendHackerPasswordResetEmail: HackerController.sendPasswordResetEmail,
        resetHackerPassword: HackerController.resetPassword,
    }
};