const Hacker = require('../../models/Hacker');
const HackerApplication = require('../../models/HackerApplication');

module.exports = class HackerController {
    static async exportAllJSON(req, res) {
        let hackers = await Hacker.find({});
        res.header('content-type', 'application/json');
        res.send(hackers);
    }

    static async exportAllApplicationJSON(req, res) {
        let applications;
        if(req.query.submitted === 'yes') {
            applications = await HackerApplication.find({submitted_at: {$exists: true}});
        } else {
            applications = await HackerApplication.find({});
        }
        res.header('content-type', 'application/json');
        res.send(applications);
    }

    static async getAllHackers(req, res) {
        let hackers = await Hacker.find({});
        res.render('admin/hackers', {hackers});
    }

    static async getAllHackerApplications(req, res) {
        let applications = await HackerApplication.find({});
        res.render('admin/applications', {applications})
    }
};
