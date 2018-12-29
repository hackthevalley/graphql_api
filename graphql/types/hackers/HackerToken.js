module.exports = `
"An authentication token for a hacker account."
type HackerToken {
    "Token ID (Primary Key)"
    _id: String
    "The account."
    hacker: Hacker
    "Body of the token (Primary Key)"
    token_body: String
    "Time of expiry for this token."
    expire_at: String
    "Time of creation."
    created_at: String
    "Time of update."
    updated_at: String
}
`;
