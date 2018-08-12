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
    promo_email: String,
    created_at: String,
    updated_at: String
}

type EventEmailSignup {
    _id: String
    email: String
    created_at: String
}

type Mutation {
    createEventEmailSignup(event_id: String!, email: String!): EventEmailSignup
    createHacker(email_address: String!, password: String!): Hacker
}
`;