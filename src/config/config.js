
// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://matias:contra10@cluster0-jssy7.mongodb.net/orders?retryWrites=true';
    process.env.DEBUG = true;
} else {
    urlDB = process.env.MONGO_URI;
    process.env.DEBUG = false;

}
process.env.URLDB = urlDB;

// ============================
//  Services 
// ============================

// Product service
module.exports = { 
    PRODUCT_SVC_SERVICE_HOST: process.env.PRODUCT_SVC_SERVICE_HOST,
    PRODUCT_SVC_SERVICE_PORT: process.env.PRODUCT_SVC_SERVICE_PORT,

    // Account service
    ACCOUNT_SVC_SERVICE_HOST: process.env.ACCOUNT_SVC_SERVICE_HOST,
    ACCOUNT_SVC_SERVICE_PORT: process.env.ACCOUNT_SVC_SERVICE_PORT,

    // User service
    USER_SVC_SERVICE_HOST: process.env.USER_SVC_SERVICE_HOST,
    USER_SVC_SERVICE_PORT: process.env.USER_SVC_SERVICE_PORT,
}

