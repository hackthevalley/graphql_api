module.exports = `
type Query {
    events: [Event],
    me: Hacker,
    user: User
}

type Event {
    _id: String
    name: String
    email_signups: [EventEmailSignup]
    applications: [Application]
    created_at: String
    updated_at: String
}

type Application {
    _id: String
    name: String
    description: String
    open: Boolean
    questions: [ApplicationQuestion]
}

type HackerApplication {
    _id: String
    application: Application
    submitted_at: String,
    answers: [HackerApplicationAnswers]
}

type HackerApplicationAnswers {
    _id: String
    question: ApplicationQuestion
    answer: [String]
}

type ApplicationQuestion {
    _id: String
    name: String
    question_type: String
    description: String
    required: Boolean
    choices: [String]
    max_characters: Int
}

type Hacker {
    _id: String,
    email_address: String,
    first_name: String,
    last_name: String,
    gender: String,
    dob: String,
    school: String,
    github: String,
    linkedin: String,
    website: String,
    description: String,
    avatar: String,
    applications: [HackerApplication],
    promo_email: String,
    created_at: String,
    updated_at: String
}

input UpdateHackerInput {
    first_name: String,
    last_name: String,
    gender: String,
    dob: String,
    school: String,
    github: String,
    linkedin: String,
    website: String,
    description: String,
    promo_email: String
}

type HackerToken {
    _id: String,
    hacker: Hacker,
    token_body: String,
    expire_at: String,
    created_at: String,
    updated_at: String
}

type EventEmailSignup {
    _id: String
    email: String
    created_at: String
}

type User {
    username: String
    group: String
}

type UserToken {
    _id: String,
    user: User,
    token_body: String,
    expire_at: String,
    created_at: String,
    updated_at: String   
}

input UpdateApplicationInput {
    name: String
    description: String
    open: Boolean
}

input CreateApplicationQuestionInput {
    question_type: String!
    name: String!
    description: String
    required: Boolean!
    choices: [String]
    max_characters: Int
}

input UpdateApplicationQuestionInput {
    question_type: String
    name: String
    description: String
    required: Boolean
    choices: [String]
    max_characters: Int
}

type Mutation {
    createEventEmailSignup(event_id: String!, email: String!): EventEmailSignup
    createEventApplication(event_id: String!, name: String!): Application
    updateEventApplication(application_id: String!, application: UpdateApplicationInput): Application
    deleteEventApplication(application_id: String!): String
    createEventApplicationQuestion(application_id: String!, question: CreateApplicationQuestionInput!): Application
    updateEventApplicationQuestion(application_id: String!, question_id: String!, question: UpdateApplicationQuestionInput!): Application
    deleteEventApplicationQuestion(application_id: String!, question_id: String!): String
    createHacker(email_address: String!, password: String!): Hacker
    updateHacker(id: String!, hacker: UpdateHackerInput!): Hacker
    createHackerToken(email_address: String!, password: String!, expire_after: Int): HackerToken
    createUserToken(username: String!, password: String!, expire_after: Int): UserToken
    createHackerApplication(application_id: String!): HackerApplication
    updateHackerApplicationAnswer(hacker_application_id: String!, question_id: String!, answer: [String]!): HackerApplication
}
`;
