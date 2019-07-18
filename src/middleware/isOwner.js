const Order = require('../models/order');

// =====================
// Verify Order ownership
// =====================
module.exports = async (req) => {
    return new Promise( (resolve, reject) =>{
        let userId = req.user.id;
        let orderId = req.params.id;
        // Verify if order belongs to logged user
        Order.findById(orderId, (err, order) => {
                if (err) {
                    return reject(err);
                }
                if (!order) {
                    let err = new Error('The order does not exists');
                    err.status = 404;
                    return reject(err);
                }
                if (order.userId == userId) {
                    return resolve(true);
                }
                // If logued userId is equals to order userId
                if (order.userId == userId) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            })
    });
};
