
/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const axios = require('axios');
const MY_KART_BACKEND_URL = "http://localhost:3000";

//Login 
async function AuthenticateUser(req, res) {
    try {
        let temp = await axios.post(URL_TO_BE_UPDATE, {
            "emailid": req.body.email,
            "password": req.body.password
        });
        if (temp.status == 200) {
            console.log("successful log in");
        }
    } catch (err) {
        if (err.status == 404) {
            console.log("Error while Performing LOgin operation-->" + err);
        }

        return undefined;
    }
}

// Login and proceed for order.
//Login 
async function loginAndProceedForOrder(req, res) {
    let order = {
        userId: req.body.userId,
        sellerId: req.body.sellerId,
        orderQty: req.body.orderQty,
        productId: req.body.productId,
        userAdd: req.body.userAdd,
        orderTotal: req.body.orderTotal,
    };

    try {
           
        let temp = await axios.post(MY_KART_BACKEND_URL+ '/login', {
            "emailid": req.body.email,
            "password": req.body.password
        });
        if (temp.status == 200) {
            let user = temp.data[0];
            order.userId = user.id;
            order.userAdd = user.address;

            res.view('pages/proceedOrder', {
                order: order
            });
        }
    } catch (err) {
        console.log("Error while login: " + err);
        res.view('pages/login', {
            errorMessage: true,
            order: order
        });
        return undefined;
    }
}


//Registration 
async function RegisterUser(req, res) {
    try {
        let temp = await axios.post(URL_TO_BE_UPDATE, {
            "emailid": req.body.email,
            "password": req.body.password,
          "username": req.body.name,
           "address": req.body.address
        });
        if (temp.status == 200) {
            console.log("successful Registration");
        }
    } catch (err) {
        if (err.status == 404) {
            console.log("Error while Performing LOgin operation-->" + err);
        }
        if(err.status == 512)
        {
            console.log("Email-id exist in the data base")
        }
        return undefined;
    }
}

function sendError(res, message) {
    res.view('pages/error', {
        message: message
    });
}



module.exports = {

    register: function (req, res) {
        var username = req.body.name;
        var emailid = req.body.email;
        var password = req.body.password;
        var address = req.body.address;
        console.log("Registered  user's email-id is--->" + emailid);
        res.view('pages/register');
    },

    login: function (req, res) {
        AuthenticateUser(req, res)
        var emailid = req.body.email;
        var password = req.body.password;
        console.log("Logged in user's email-id is--->" + emailid);
        res.view('pages/login');
    },
    
    loginPage:function(req,res)
    {
        console.log("Redirect to login page to authenticate user.");
        console.log(req.body);
        let order = {
            sellerId: req.body.sellerId,
            orderQty: req.body.orderQty,
            productId: req.body.productId,
            orderTotal: req.body.orderTotal,
        }
        order.orderTotal = order.orderTotal * order.orderQty;
        res.view('pages/login',{
            order: order
        });
    },

    orderLogin:function(req,res)
    {

        return loginAndProceedForOrder(req, res);
    },
};

