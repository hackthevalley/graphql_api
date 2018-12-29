module.exports = `
"An event application form for hackers to fill out."
type Application {
    "Application ID (Primary Key)"
    _id: String
    "Application display name."
    name: String
    "Application description."
    description: String
    "If application is accepting new submissions."
    open: Boolean
    "Event this application is related to."
    event: Event
    "List of questions within this application."
    questions: [ApplicationQuestion]
}
`;