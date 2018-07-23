const Event = require('../models/Event');
const EventEmailSignup = require('../models/EventEmailSignup');

function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

class EventEmailSignupController {
    /**
     * Create a new event email signup
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static create(obj, args, context) {
        return new Promise((resolve, reject) => {
            let event;
            return Event.findOne({_id: args.event_id})
                .then(result => {
                    if(result){
                        event = result;
                    } else {
                        throw new Error("EventNotFound");
                    }
                })
                .then(() => {
                    if(validateEmail(args.email)){
                        return EventEmailSignup.findOne({
                            event_id: event._id,
                            email: args.email
                        })
                    } else {
                        throw new Error("EmailNotValid");
                    }
                })
                .then(record => {
                    if(!record){
                        let new_record = new EventEmailSignup({
                            event_id: event._id,
                            email: args.email
                        });
                        return new_record.save();
                    } else {
                        throw new Error("ConflictRecord");
                    }
                })
                .then(result => {
                    resolve(result);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }
}

module.exports = EventEmailSignupController;
