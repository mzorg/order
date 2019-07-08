let jwt = require('jsonwebtoken');

// =====================
// Verify Token
// =====================
module.exports = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                msj: 'Invalid token',
                errors: err
            });
        }
        req.user = decoded; // add the decoded user to request
        next(); // if valid the next
    });
};