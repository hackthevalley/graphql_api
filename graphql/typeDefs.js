module.exports = `
type Query {
    events: [Event],
    me: Hacker
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

type Mutation {
    createEventEmailSignup(event_id: String!, email: String!): EventEmailSignup
    createHacker(email_address: String!, password: String!): Hacker
    updateHacker(id: String!, hacker: UpdateHackerInput!): Hacker
    createHackerToken(email_address: String!, password: String!, expire_after: Int): HackerToken
    createUserToken(username: String!, password: String!, expire_after: Int): UserToken
}
`;