const HackerApplicationAnswerController = require('../../../controllers/HackerApplicationAnswerController');

module.exports = {
    HackerApplicationAnswer: {
        question: HackerApplicationAnswerController.getQuestion,
        answers: obj => obj.answer
    }
};
