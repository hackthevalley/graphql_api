module.exports = `
extend type Query {
    me: Hacker
    "List all hackers within the system."
    hackers(
        _id: String
        email_address: String,
        school: String,
        first_name: String,
        last_name: String
    ): [Hacker]
}
`;