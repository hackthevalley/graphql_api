module.exports = `
extend type Mutation {
    createHacker(email_address: String!, password: String!): Hacker
    updateHacker(id: String!, hacker: UpdateHackerInput!): Hacker
    sendHackerPasswordResetEmail(email_address: String!): Boolean
    resetHackerPassword(email_address: String!, code: String!, new_password: String!): Hacker
    createHackerToken(email_address: String!, password: String!, expire_after: Int): HackerToken
}
`;