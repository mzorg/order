
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