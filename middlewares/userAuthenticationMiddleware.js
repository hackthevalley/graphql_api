const User = require('../models/User');
const UserToken = require('../models/UserToken');

module.exports = function (req, res, next) {
    if(req.header('authorization')){
        let auth_header = req.header('authorization').split(" ");
        if(auth_header[0].toLowerCase() === "bearer") {
            UserToken.findOne({ token_body: auth_header[1] })
                .then(token => {
                    if(token && token.expire_at.getTime() > new Date().getTime()){
                        return User.findOne({ _id: token.user_id })
                    } else {
                        throw new Error("InvalidToken");
                    }
                })
                .then(user => {
                    if(user) req.user = user;
                    next();
                })
                .catch(() => {
                    next();
                })
        } else {
            next();
        }
    } else {
        next();
    }
};
