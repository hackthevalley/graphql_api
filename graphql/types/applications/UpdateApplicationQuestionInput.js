module.exports = `
input UpdateApplicationQuestionInput {
    question_type: String
    name: String
    description: String
    required: Boolean
    choices: [String]
    max_characters: Int
}
`;
