module.exports = `
type Query {
    events: [Event]
}

type Event {
    _id: String
    name: String
    email_signups: [EventEmailSignup]
    created_at: String
    updated_at: String
}

type EventEmailSignup {
    _id: String
    email: String
    created_at: String
}

type Mutation {
    createEventEmailSignup(event_id: String!, email: String!): EventEmailSignup
}
`;