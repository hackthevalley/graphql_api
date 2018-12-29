const Rule = require('./Rule');

class IsAuthenticatedAsUserRule extends Rule {
    static async pass(context) {
        return !!context.user;
    }
}

module.exports = IsAuthenticatedAsUserRule;
