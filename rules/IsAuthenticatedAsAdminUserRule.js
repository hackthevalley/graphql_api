const Rule = require('./Rule');

class IsAuthenticatedAsAdminUserRule extends Rule {
    static async pass(context) {
        return context.user && (context.user.group === 'admin');
    }
}

module.exports = IsAuthenticatedAsAdminUserRule;
