const Hacker = require('../models/Hacker');
const HackerToken = require('../models/HackerToken');

module.exports = function (req, res, next) {
    if(req.header('authorization')){
        let auth_header = req.header('authorization').split(" ");
        if(auth_header[0].toLowerCase() === "bearer") {
            HackerToken.findOne({ token_body: auth_header[1] })
                .then(token => {
                    if(token && token.expire_at.getTime() > new Date().getTime()){
                        return Hacker.findOne({ _id: token.hacker_id })
                    } else {
                        throw new Error("InvalidToken");
                    }
                })
                .then(hacker => {
                    if(hacker) req.hacker = hacker;
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