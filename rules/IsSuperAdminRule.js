const Rule = require('./Rule');

class IsSuperAdminRule extends Rule {
    static async pass(context) {
        return !!context.isSuperAdmin;
    }
}

module.exports = IsSuperAdminRule;
