const HackerApplication = require('../models/HackerApplication');
const Application = require('../models/Application');

class HackerApplicationController {
    /**
     * Start a new application
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static create(obj, args, context) {
        return new Promise((resolve, reject) => {
            // First check if we are authorized as a hacker
            if(context.hacker) {
                let app;
                // Find the application
                Application.findOne({_id: args.application_id})
                    .then(result => {
                        app = result;
                        if(!app) {
                            throw new Error("ApplicationNotFound");
                        }
                        if(!app.open) {
                            throw new Error("ApplicationNotOpen");
                        }
                    })
                    .then(() => {
                        // Find if we already have an application saved
                        return HackerApplication.findOne({application_id: app._id});
                    })
                    .then(hackerApp => {
                        if(hackerApp) {
                            throw new Error("ApplicationAlreadyExist");
                        }
                    })
                    .then(() => {
                        let hackerApp = new HackerApplication({application_id: app.id, hacker_id: context.hacker._id, questions: []});
                        return hackerApp.save();
                    })
                    .then(hackerApp => {
                        resolve(hackerApp);
                    })
                    .catch(e => {
                        reject(e);
                    })
            } else {
                reject("NotAuthorized");
            }
        });
    }

    /**
     * Get event application associated with this app
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static application(obj, args, context) {
        return new Promise((resolve, reject) => {
            Application.findOne({_id: obj.application_id})
                .then(app => resolve(app))
                .catch(e => reject(e));
        })
    }
}

module.exports = HackerApplicationController;
