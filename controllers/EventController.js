const Event = require('../models/Event');
const Application = require('../models/Application');

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

    /**
     * Get all applications
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static applications(obj, args, context) {
        return new Promise((resolve, reject) => {
            Application.find({ event_id: obj._id })
                .then(applications => resolve(applications))
                .catch(e => reject(e));
        })
    }
}

module.exports = EventController;
