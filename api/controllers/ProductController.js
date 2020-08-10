
const axios = require('axios');

const MY_KART_BACKEND_URL = "https://q7m3gl0cj2.execute-api.us-east-1.amazonaws.com/mykart-cloud-project";

async function fetchProducts(res) {

    console.log('Fetching products.');
    try {
        let response = await axios.get(MY_KART_BACKEND_URL + '/products');
        if (response.status === 200) {

            res.view('pages/products', { products: response.data});
            return;
        }
    } catch (err) {
        console.log('Error while fetching products, error: ' + err);
        sendError(res, 'Error while fetching products: ' + err.response.data);
        return null;
    }
}

function sendError(res, message) {
    res.view('pages/error', {
        message: message
    });
}

module.exports = {
  
    getProducts: function(req, res){
        return fetchProducts(res);
    },  
};

