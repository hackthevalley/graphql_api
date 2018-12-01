module.exports = class DashboardController {
    static getMainPage(req, res) {
        res.render('admin/dashboard');
    }
};
