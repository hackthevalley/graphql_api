module.exports = `
"An answer to one of the question within an application."
type HackerApplicationAnswer {
    "Answer ID (Primary Key)"
    _id: String
    "Question this answer is for."
    question: ApplicationQuestion
    "The question's ID"
    question_id: String @deprecated(reason: "Please use question._id instead.")
    "A list of answers for this question."
    answer: [String] @deprecated(reason: "This field have been moved to 'answers'.")
    "A list of answers for this question."
    answers: [String]
}
`;
