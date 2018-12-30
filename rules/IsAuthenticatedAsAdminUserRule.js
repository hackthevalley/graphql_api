const Rule = require('./Rule');

class IsAuthenticatedAsAdminUserRule extends Rule {
    static async pass(context) {
        return context.user && (context.user.group === 'ADMIN');
    }
}

module.exports = IsAuthenticatedAsAdminUserRule;
