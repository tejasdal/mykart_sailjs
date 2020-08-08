
const axios = require('axios');

const MY_KART_BACKEND_URL = "http://localhost:3000";

async function placeOrder(order, res) {

    console.log('Placing an order from My kart front-end.');
    try {
        let response = await axios.post(MY_KART_BACKEND_URL + '/order', order);
        if (response.status === 200) {

            res.redirect('/orders');
            return;
        }
    } catch (err) {
        console.log('Error while placing an order, error: ' + err);
        sendError(res, 'Error while placing an order: ' + err.response.data);
        return null;
    }
}

async function fetchOrderHistory( res) {

    console.log('Fetching order history.');
    try {
        let response = await axios.get(MY_KART_BACKEND_URL + '/orders');
        if (response.status === 200) {

            res.view('orderHistory', { orders: response.data});
            return;
        }
    } catch (err) {
        console.log('Error while fetching order history, error: ' + err);
        sendError(res, 'Error while fetching order history: ' + err.response.data);
        return null;
    }
}



function sendError(res, message) {
    res.view('pages/error', {
        message: message
    });
}

module.exports = {

    newOrder: function (req, res) {
        let order = {
            userId: req.body.userId,
            sellerId: req.body.sellerId,
            orderQty: req.body.orderQty,
            productId: req.body.productId,
            userAdd: req.body.userAdd,
            orderTotal: req.body.orderTotal,
        }
        return placeOrder(order, res);
    },

    getOrderHistory: function(req, res) {

        return fetchOrderHistory(res);
    },

    
};

