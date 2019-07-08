const Order = require('../models/order');

// =====================
// Get all orders
// =====================
exports.getOrders = (req, res, next) => {
    Order.find()
        .then(orders => {
            // Return orders
            return res.json({
                ok: true,
                data: orders
            });
        })
        .catch(err => {
            // If there was a error
            return res.status(500).json({
                ok: false,
                msj: 'Error getting Order',
                errors: err
            });
        });
};

// =====================
// Create a order
// =====================
exports.createOrder = (req, res, next) => {
    let body = req.body; // parse body request
    // Create a new Order
    //let userId = req.user.id;
    userId = 1; // TODO: DELETE ME WHEN ADD AUTH
    let order = new Order({
        userId
    });
    // Save created order
    order.save(
        (err, orderDB) => {
        // if there was a error
        if (err)
            return res.status(500).json({
                ok: false,
                msj: 'Error creating order',
                errors: err
            });
        // return created order
        return res.json({
            ok: true,
            data: orderDB
        });
    });
};

// =====================
// Delete a order
// =====================
exports.deleteOrder = (req, res, next) => {
    let id = req.params.id;
    Order.findByIdAndDelete(id)
        .then(order => {
            // Return deleted order
            return res.json({
                ok: true,
                data: order
            });
        })
        .catch(err => {
            // If there was a error
            return res.status(500).json({
                ok: false,
                msj: 'Error deleting Order',
                errors: err
            });
        });
};