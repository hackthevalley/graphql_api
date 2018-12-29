const NotImplementedError = require('../errors/NotImplementedError');

class Rule {
    static async pass() {
        throw new NotImplementedError("Rule pass() method must be implemented before it can be used.");
    }
}

module.exports = Rule;
