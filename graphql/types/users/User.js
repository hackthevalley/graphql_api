module.exports = `
"Object represents a hackathon organizer user."
type User {
    "User ID (Primary Key)"
    _id: String
    "Username (Primary Key)"
    username: String
    "Group this user belongs to."
    group: UserGroup
}
`;
