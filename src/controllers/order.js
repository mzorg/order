const Order = require('../models/order');
const axios = require('axios');
let conf = require('../config/config');

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
    userId = req.user.userId; // get userId from token
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

// =====================
// Add product to order
// =====================
exports.addProductToOrder = async (req, res, next) => {
    let orderId = req.params.id; // orderId
    let body = req.body; // parse body request
    let newProduct = {
        _id: body.id, // productId
        quantity: parseInt(body.quantity, 10) //  productQty
    };
    let product;
    let order;
    let orig_stock;

    // Check Order status and Product stock
    try {
        order = await Order.findById(orderId);  // get order

        // If order is 'Closed', do not allow add product
        if (order.status === 'Closed') {
            throw new Error('Order is already Closed');
        }

        // Get product
        product = await axios.get(`http://${conf.PRODUCT_SVC_SERVICE_HOST}:${conf.PRODUCT_SVC_SERVICE_PORT}/products/${newProduct._id}`);
        product = product.data.data;

        // Check product stock, if not enough send error
        if ((product.stock - newProduct.quantity) < 0) {
            throw new Error('There is insufficient stock of Product');
        }

    } catch (err) {
        err.status = 500;
        next(err);
    }

    // Decrement stock and add product to order
    try {

        orig_stock = product.stock; // store original product qty
        product.stock -= newProduct.quantity;   // decrement product stock

        // Update product stock
        await axios.put(`http://${conf.PRODUCT_SVC_SERVICE_HOST}:${conf.PRODUCT_SVC_SERVICE_PORT}/products/${newProduct._id}`, {
            stock: product.stock
        });

        // Add product to order
        // if the Order already has that product increment the quantity
        if(order.items.id(newProduct._id)){
            order.items.id(newProduct._id).quantity += newProduct.quantity
        } else { // if not, add it to items
            order.items.push(newProduct);
        }

        // Save order
        let orderDB = await order.save();

        // Return updated order
        return res.json({
            ok: true,
            data: orderDB
        });
    
    } catch (err) {

        // Return original stock
        await axios.put(`http://${conf.PRODUCT_SVC_SERVICE_HOST}:${conf.PRODUCT_SVC_SERVICE_PORT}/products/${newProduct._id}`, {
            stock: orig_stock
        });

        // Return error response
        err.status = 500;
        next(err);
    }
};

// =====================
// Checkout order
// =====================
exports.checkoutOrder = async (req, res, next) => {
    var orderId = req.params.id;
    try {
        // Get order
        order = await Order.findById(orderId);

        // If order is 'Closed' do not checkout again
        if (order.status === 'Closed') {
            throw new Error('Order is already Closed');
        }

        let orderItems = order.items; // items in the order

        order.total = 0;
        let itemId;
        let itemQuantity;
        let itemPrice;
        
        // Get all products details included in the order
        let ids = orderItems.map((el) => el._id); // extract product items
        ids.toString(); // convert array to string
        let products = await axios.get(`http://${conf.PRODUCT_SVC_SERVICE_HOST}:${conf.PRODUCT_SVC_SERVICE_PORT}/products/?ids=${ids}`);
        products = products.data.data;
        
        // Iterate over each item in the Order
        for (const it of orderItems) {
            // Get item (product) quantity
            itemId = it._id;
            itemQuantity = it.quantity;

            // Find product price in array of products
            let prod = products.find(product => product._id == itemId);

            itemPrice = prod.price;

            // Accumulate to order total
            order.total += itemPrice * itemQuantity;
        };
        
        // Update order status and order close date
        order.status = 'Closed';
        order.closedDate = Date.now();

        // Save order
        let orderDB = await order.save();

        // Return updated order
        return res.json({
            ok: true,
            data: orderDB
        });

    } catch (err) {
        // Return error response
        err.status = 500;
        next(err);
    }
}