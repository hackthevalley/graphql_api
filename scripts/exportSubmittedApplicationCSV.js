const dotenv = require('dotenv');
dotenv.load();
const mongoose          = require('mongoose');
const Hacker            = require('../models/Hacker');
const HackerApplication = require('../models/HackerApplication');
const Application       = require('../models/Application');
const _                 = require('lodash');
const Json2csvParser    = require('json2csv').Parser;
const fs                = require('fs');


const APPLICATION_ID = '5bcdd88b6821ea3bb6e7a9cb'; // Application to export

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
    .then(() => console.log("Mongoose connected..."));

async function main() {
    let hackers               = await Hacker.find({});
    let application           = await Application.findOne({_id: APPLICATION_ID});
    let questionIDReadableMap = {};
    for (let question of application.questions) {
        questionIDReadableMap[question._id.toString()] = question.name;
    }

    let submittedApplications = [];
    for (let hacker of hackers) {
        // Find all submitted applications for this hacker.
        let hackerApplication = await HackerApplication.findOne({
            hacker_id: hacker._id,
            submitted_at: {$exists: true},
            application_id: APPLICATION_ID
        });
        if (hackerApplication) {
            let entry = {
                ...(_.pick(hacker, ['_id', 'email_address', 'description', 'dob', 'first_name', 'last_name', 'gender', 'github', 'linkedin', 'phone_number', 'school', 'website'])),
            };
            for (let answer of hackerApplication.answers) {
                entry[questionIDReadableMap[answer.question_id.toString()]] = answer.answer[0];
            }
            submittedApplications.push(entry);
        }

    }

    const json2csvParser = new Json2csvParser(_.keys(submittedApplications[0]));
    const csv            = json2csvParser.parse(submittedApplications);
    // console.log(csv);
    fs.writeFile("export.csv", csv, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

    console.log(submittedApplications.length, "applications found.");
}

main();