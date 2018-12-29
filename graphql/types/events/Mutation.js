module.exports = `
extend type Mutation {
    createEventEmailSignup(event_id: String!, email: String!): EventEmailSignup
}
`;
