const jwt = require("jsonwebtoken");

module.exports.authenticate = (request, response, next) => {
    jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            response.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}

module.exports.isAdmin = (request, response, next) => {
    jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            response.status(401).json({ verified: false });
        } else {
            if (payload.isAdmin) {
                console.log(payload);
                console.log(payload.isAdmin);
                next();
            } else {
                response.status(401).json({ verified: false });
            }
        }
    });
}

module.exports.isAgent = (request, response, next) => {
    jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            response.status(401).json({ verified: false, msg:"1" });
        } else {
            if (payload.isAgent) {
                console.log(payload);
                console.log(payload.isAgent);
                next();
            } else {
                response.status(401).json({ verified: false });
            }
        }
    });
}