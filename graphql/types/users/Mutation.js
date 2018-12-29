module.exports = `
extend type Mutation {
    createUserToken(username: String!, password: String!, expire_after: Int): UserToken
}
`;