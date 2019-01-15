module.exports = `
"A hacker account."
type Hacker {
    "Hacker ID (Primary Key)"
    _id: String
    "Hacker email (Primary Key)"
    email_address: String
    "Hacker's first name."
    first_name: String
    "Hacker's last name."
    last_name: String
    "Hacker's phone number."
    phone_number: String
    "Hacker's gender."
    gender: String
    "Hacker's date of birth."
    dob: String
    "Hacker's school."
    school: String
    "Hacker's GitHub profile link."
    github: String
    "Hacker's LinkedIn profile link."
    linkedin: String
    "Hacker's website link."
    website: String
    "A short bio for the hacker."
    description: String
    "Avatar link for the hacker."
    avatar: String
    "List of applications started by this hacker."
    applications(submitted: Boolean = null): [HackerApplication]
    promo_email: String
    "Hacker's resume in base64 format."
    resume: String
    "Time of creation."
    created_at: String
    "Time of update."
    updated_at: String
}
`;
