module.exports = `
input CreateApplicationQuestionInput {
    question_type: String!
    name: String!
    description: String
    required: Boolean!
    choices: [String]
    max_characters: Int
}
`;