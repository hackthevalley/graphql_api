class UserController {
    /**
     * Get current authenticated user
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static user(obj, args, context) {
        return new Promise((resolve, reject) => {
            if(context.user) {
                resolve(context.user);
            } else {
                reject("NotAuthenticated");
            }
        })
    }
}

module.exports = UserController;
