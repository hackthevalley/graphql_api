module.exports = `
"A question within an application form."
type ApplicationQuestion {
    "Question ID (Primary Key)"
    _id: String
    "Question display name."
    name: String
    "Type of the question, can be short, long, radio or checkbox"
    question_type: String
    "Question description."
    description: String
    "If this question must be filled out before submitting."
    required: Boolean
    "List of choices available, only required if type is radio or checkbox."
    choices: [String]
    "Maximum character limit, only useful if type is short or long."
    max_characters: Int
}
`;