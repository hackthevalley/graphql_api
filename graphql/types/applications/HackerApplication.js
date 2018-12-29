module.exports = `
"A working copy of an application."
type HackerApplication {
    "Working copy ID (Primary Key)"
    _id: String
    "Application this is associated to."
    application: Application
    "When is this submitted at, if null, then the application is not submitted."
    submitted_at: String,
    "List of answers within this application."
    answers: [HackerApplicationAnswer]
}
`;