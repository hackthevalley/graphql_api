const UserController = require('../../../controllers/UserController');

module.exports = {
    Query: {
        user: UserController.user
    },
    Mutation: {
        createUser: UserController.create
    }
};
