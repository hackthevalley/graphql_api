const User = require('./models/User');
const uuid = require('uuid-v4');
const pbkdf2 = require('pbkdf2');
const dotenv = require('dotenv');
dotenv.load();
const mongoose = require('mongoose');
const util = require('util');
pbkdf2.pbkdf2 = util.promisify(pbkdf2.pbkdf2);

let salt, real_password;

// Begin the promise chain
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
    .then(() => {
        // Get user with username of admin
        return User.findOne({username: 'admin'});
    })
    .then(user => {
        if(!user) {
            // User does not exist, we create one
            salt = uuid();
            real_password = Math.random().toString(36).substring(2);
            // Hash the password
            return pbkdf2.pbkdf2(real_password, salt, 100000, 64, 'sha512');
        }
    })
    .then(password => {
        if(password) {
            let user = new User({
                salt,
                password: password.toString('hex'),
                username: 'admin',
                group: 'admin'
            });
            return user.save();
        }
    })
    .then(user => {
        if(user) console.log("Admin user created with username admin and password", real_password);
    })
    .catch(e => console.error(e));