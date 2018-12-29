module.exports = `
"Type representing an event."
type Event {
    "Event ID (Primary Key)"
    _id: String
    "Event display name."
    name: String
    "List of email newsletter signups for this event."
    email_signups: [EventEmailSignup]
    "List of application templates for this event."
    applications: [Application]
    "Event creation time."
    created_at: String
    "Event update time."
    updated_at: String
}
`;