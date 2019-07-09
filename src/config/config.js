
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
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// ============================
//  Services 
// ============================

// Product service
let PRODUCT_SVC_SERVICE_HOST = process.env.PRODUCT_SVC_SERVICE_HOST;
let PRODUCT_SVC_SERVICE_PORT = process.env.PRODUCT_SVC_SERVICE_PORT;

// Account service
let ACCOUNT_SVC_SERVICE_HOST = process.env.ACCOUNT_SVC_SERVICE_HOST;
let ACCOUNT_SVC_SERVICE_PORT = process.env.ACCOUNT_SVC_SERVICE_PORT;

// User service
let USER_SVC_SERVICE_HOST = process.env.USER_SVC_SERVICE_HOST;
let USER_SVC_SERVICE_PORT = process.env.USER_SVC_SERVICE_PORT;

