const HackerApplication = require('../models/HackerApplication');
const Application = require('../models/Application');
const validator = require('validator');

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
                        return HackerApplication.findOne({application_id: app._id, hacker_id: context.hacker._id});
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

    /**
     * Update an application answer for the hacker
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static updateAnswer(obj, args, context) {
        return new Promise((resolve, reject) => {
            // First check if hacker is loggedin
            if(!context.hacker) {
                reject("NotAuthenticated");
            } else {
                let hackerApp, app, question;
                // Find the application
                HackerApplication.findOne({_id: args.hacker_application_id})
                    .then(result => {
                        hackerApp = result;
                        if(!hackerApp) {
                            throw new Error("HackerApplicationNotFound");
                        }
                        if(hackerApp.hacker_id.toString() !== context.hacker._id.toString()) {
                            throw new Error("NotAuthenticated");
                        }
                        // Fetch event application
                        return Application.findOne({_id: hackerApp.application_id});
                    })
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
                        // Check if the answer is valid for this question
                        if(question.question_type === 'short' || question.question_type === 'long' || question.question_type === 'email') {
                            // Text question cannot have more than 1 answers
                            if(args.answer.length > 1) {
                                throw new Error("InvalidAnswer");
                            }
                            // If it is a text question, then it might have length constraints
                            if(question.max_characters && question.max_characters < args.answer[0].length) {
                                throw new Error("AnswerTooLong");
                            }
                            if(question.question_type === 'email' && args.answer[0] && !validator.isEmail(args.answer[0])) {
                                throw new Error("InvalidEmail");
                            }
                        }
                        if(question.question_type === 'radio' || question.question_type === 'checkbox') {
                            // Loop through choices, and see if it is within the choices list
                            args.answer.forEach(answerStr => {
                                if(question.choices.indexOf(answerStr) < 0) {
                                    throw new Error("InvalidChoice");
                                }
                            });

                            // If the type is radio, then we can only have maximum of 1 choice
                            if(question.question_type === 'radio' && args.answer.length > 1) {
                                throw new Error("TooManyChoices");
                            }
                        }
                    })
                    .then(() => {
                        // Try to find an existing answer for that question
                        let index = -1;
                        for(let i = 0; i < hackerApp.answers.length; i++) {
                            if (hackerApp.answers[i].question_id.toString() === args.question_id.toString()) {
                                index = i;
                                break;
                            }
                        }
                        if(index >= 0) {
                            hackerApp.answers[index].remove();
                        }
                        hackerApp.answers.push({
                            question_id: question._id,
                            answer: args.answer
                        });
                        return hackerApp.save();
                    })
                    .then(app => {
                        resolve(app);
                    })
                    .catch(e => reject(e));
            }
        });
    }
}

module.exports = HackerApplicationController;
