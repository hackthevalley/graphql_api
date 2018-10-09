const Event = require('../models/Event');
const Application = require('../models/Application');

class ApplicationController {
    /**
     * Create a new application
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static create(obj, args, context) {
        return new Promise((resolve, reject) => {
            if(!context.user || context.user.group !== 'admin') {
                return reject("NotAuthorized");
            } else {
                Event.findOne({_id: args.event_id})
                    .then(event => {
                        if(event) {
                            // Create the application
                            let app = new Application({event_id: args.event_id, name: args.name, open: false});
                            return app.save();
                        } else {
                            throw new Error("EventNotFound");
                        }
                    })
                    .then(app => {
                        resolve(app);
                    })
                    .catch(e => reject(e));
            }
        })
    }

    /**
     * Update an application
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static update(obj, args, context) {
        return new Promise((resolve, reject) => {
            if(!context.user || context.user.group !== 'admin') {
                return reject("NotAuthorized");
            } else {
                // First find the application
                Application.findOne({_id: args.application_id})
                    .then(app => {
                        if(app) {
                            app.set(args.application);
                            return app.save();
                        } else {
                            throw new Error("ApplicationNotFound");
                        }
                    })
                    .then(app => {
                        resolve(app);
                    })
                    .catch(e => reject(e));
            }
        })
    }

    /**
     * Delete an application
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static delete(obj, args, context) {
        return new Promise((resolve, reject) => {
            if(!context.user || context.user.group !== 'admin') {
                return reject("NotAuthorized");
            } else {
                // First find the application
                Application.findOne({_id: args.application_id})
                    .then(app => {
                        if(app) {
                            return app.remove();
                        } else {
                            throw new Error("ApplicationNotFound");
                        }
                    })
                    .then(() => {
                        resolve("Removed");
                    })
                    .catch(e => reject(e));
            }
        })
    }
}

module.exports = ApplicationController;
