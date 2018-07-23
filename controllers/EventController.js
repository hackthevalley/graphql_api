const Event = require('../models/Event');

class EventController {
    /**
     * List all events based on filter
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static list(obj, args, context) {
        return new Promise((resolve, reject) => {
            return Event.find(args)
                .then(result => {
                    resolve(result);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }
}

module.exports = EventController;
