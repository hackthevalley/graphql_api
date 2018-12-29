module.exports = `
extend type Mutation {
    createUserToken(username: String!, password: String!, expire_after: Int): UserToken
    
    "Create a new user, you must be authenticated as super admin to use this mutation."
    createUser(
        "Username (Primary Key)"
        username: String!,
        "Optional email address used for communication."
        email_address: String,
        "Password for the user."
        password: String!,
        "User group."
        group: UserGroup!
    ): User
}
`;