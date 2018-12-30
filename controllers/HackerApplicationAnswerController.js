const Application = require('../models/Application');

class HackerApplicationAnswerController {
    /**
     * @gqlresolves HackerApplicationAnswer.question
     * @param {{question_id: string}} obj
     * @returns {Promise<Mixed>}
     */
    static async getQuestion(obj) {
        // TODO: This needs to be optimized, O(N*M) with O(N) space
        let applications = await Application.find({});
        for(let application of applications) {
            for(let question of application.questions) {
                if(question._id.toString() === obj.question_id.toString()) {
                    return question;
                }
            }
        }
    }
}

module.exports = HackerApplicationAnswerController;
