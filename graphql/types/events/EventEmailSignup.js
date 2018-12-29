module.exports = `
"An event newsletter signup entry."
type EventEmailSignup {
    "Signup transaction ID (Primary Key)"
    _id: String
    "Email address signedup."
    email: String
    "Signup time."
    created_at: String
}
`;