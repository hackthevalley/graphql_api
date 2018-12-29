const RESOLVER_LIST = []
    .concat(require('./applications'))
    .concat(require('./events'))
    .concat(require('./hackers'))
    .concat(require('./users'));

let resolvers = {};

for(let resolverSet of RESOLVER_LIST) {
    // Loop through keys within the set
    for(let key in resolverSet) {
        if(resolvers[key]) {
            // Merge two sets
            resolvers[key] = {
                ...resolvers[key],
                ...resolverSet[key]
            }
        } else {
            // Create new entry
            resolvers[key] = resolverSet[key];
        }
    }
}

module.exports = resolvers;
