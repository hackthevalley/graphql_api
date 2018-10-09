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

    /**
     * Create a new question
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static createQuestion(obj, args, context) {
        return new Promise((resolve, reject) => {
            if(!context.user || context.user.group !== 'admin') {
                return reject("NotAuthorized");
            } else {
                let app;
                // First find the application
                Application.findOne({_id: args.application_id})
                    .then(result => {
                        app = result;
                        if(!app) {
                            throw new Error("ApplicationNotFound");
                        }
                    })
                    .then(() => {
                        if(!args.question.question_type.match(/^email|short|long|date|checkbox|choice|radio$/)) {
                            throw new Error("InvalidQuestionType");
                        }
                        if(args.question.question_type === 'choice' && (!args.question.choices || args.question.choices.length === 0)) {
                            throw new Error("MustHaveAtLeastOneChoice");
                        }
                        if(args.question.question_type === 'radio' && (!args.question.choices || args.question.choices.length === 0)) {
                            throw new Error("MustHaveAtLeastOneChoice");
                        }
                        app.questions.push(args.question);
                        return app.save();
                    })
                    .then(app => {
                        resolve(app);
                    })
                    .catch(e => reject(e));
            }
        })
    }

    /**
     * Update an existing question
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static updateQuestion(obj, args, context) {
        return new Promise((resolve, reject) => {
            if(!context.user || context.user.group !== 'admin') {
                return reject("NotAuthorized");
            } else {
                let app, question;
                // First find the application
                Application.findOne({_id: args.application_id})
                    .then(result => {
                        app = result;
                        if(!app) {
                            throw new Error("ApplicationNotFound");
                        }
                        question = app.questions.id(args.question_id);
                        if(!question) {
                            throw new Error("QuestionNotFound");
                        }
                    })
                    .then(() => {
                        if(args.question.question_type) {
                            // We are changing question type
                            if(!args.question.question_type.match(/^email|short|long|date|checkbox|choice|radio$/)) {
                                throw new Error("InvalidQuestionType");
                            }
                            if(args.question.question_type === 'choice' && (!args.question.choices || args.question.choices.length === 0)) {
                                throw new Error("MustHaveAtLeastOneChoice");
                            }
                            if(args.question.question_type === 'radio' && (!args.question.choices || args.question.choices.length === 0)) {
                                throw new Error("MustHaveAtLeastOneChoice");
                            }
                        } else {
                            // Not changing question type
                            if(question.question_type === 'choice' || question.question_type === 'radio') {
                                if(args.question.choices && args.question.choices.length === 0) {
                                    throw new Error("MustHaveAtLeastOneChoice");
                                }
                            }
                        }
                        question.set(args.question);
                        return app.save();
                    })
                    .then(app => {
                        resolve(app);
                    })
                    .catch(e => reject(e));
            }
        })
    }


    /**
     * Remove a question
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static deleteQuestion(obj, args, context) {
        return new Promise((resolve, reject) => {
            if(!context.user || context.user.group !== 'admin') {
                return reject("NotAuthorized");
            } else {
                let app, question;
                // First find the application
                Application.findOne({_id: args.application_id})
                    .then(result => {
                        app = result;
                        if(!app) {
                            throw new Error("ApplicationNotFound");
                        }
                        question = app.questions.id(args.question_id);
                        if(!question) {
                            throw new Error("QuestionNotFound");
                        }
                    })
                    .then(() => {
                        question.remove();
                        return app.save();
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
