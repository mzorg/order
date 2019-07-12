const uuidv1 = require('uuid/v1');

module.exports = (err, req, res, next) => {
    let id = uuidv1();
    //logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${id}  - ${err.stack}`);
    return res.status(err.status).json({
        ok: false,
        msj: err.message,
        id,
        errors: err,
        ...(process.env.DEBUG ? {stack: err.stack} : {}) // if DEBUG, print error stack
    });
};