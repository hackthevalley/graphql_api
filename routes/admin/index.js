const express = require('express');
const basicAuth = require('express-basic-auth');
const {DashboardController, HackerController} = require('../../controllers/admin');

module.exports = (app) => {
    // Apply admin middleware
    let router = express.Router();
    router.use(basicAuth({
        users: { 'admin': process.env.ADMIN_PASSWORD },
        challenge: true,
        realm: 'Imb4T3st4pp'
    }));

    router.get('/', DashboardController.getMainPage);
    router.get('/hackers/json', HackerController.exportAllJSON);
    router.get('/hackers/applications', HackerController.getAllHackerApplications);
    router.get('/hackers', HackerController.getAllHackers);
    router.get('/hackers/applications/json', HackerController.exportAllApplicationJSON);

    app.use('/admin', router);
};
