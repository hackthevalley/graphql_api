const UserTokenController = require('../../../controllers/UserTokenController');

module.exports = {
    Mutation: {
        createUserToken: UserTokenController.create
    }
};