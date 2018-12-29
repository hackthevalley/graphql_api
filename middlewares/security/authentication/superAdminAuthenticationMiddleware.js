module.exports = function (req, res, next) {
    if(req.header('authorization')){
        let auth_header = req.header('authorization').split(" ");
        if(auth_header[0].toLowerCase() === "superadmin") {
            if(auth_header[1] === process.env.ADMIN_PASSWORD) {
                req.isSuperAdmin = true;
            }
        }
        next();
    } else {
        next();
    }
};