module.exports = `
extend type Mutation {
    createEventApplication(event_id: String!, name: String!): Application
    updateEventApplication(application_id: String!, application: UpdateApplicationInput): Application
    deleteEventApplication(application_id: String!): String
    createEventApplicationQuestion(application_id: String!, question: CreateApplicationQuestionInput!): Application
    updateEventApplicationQuestion(application_id: String!, question_id: String!, question: UpdateApplicationQuestionInput!): Application
    deleteEventApplicationQuestion(application_id: String!, question_id: String!): String
    createHackerApplication(application_id: String!): HackerApplication
    updateHackerApplicationAnswer(hacker_application_id: String!, question_id: String!, answer: [String]!): HackerApplication
    submitHackerApplication(hacker_application_id: String!): HackerApplication
}
`;
