/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const axios = require('axios');


//Login 
async function AuthenticateUser(req, res) {
    console.log("inside function")
    try {
        let temp = await axios.post('http://localhost:3000/login', {
            "emailid": req.body.email,
            "password": req.body.password
        });
        if (temp.status == 200) {
            console.log("successful log in");
        }
        else
        {           
            console.log("wrong");
        }
    } catch (err) {
        console.log(err.response.status);

        if (err.status == 404) {
            console.log("Error while Performing LOgin operation-->" + err);
        }

        return undefined;
    }
}


//Registration 
async function RegisterUser(req, res) {
    try {
        let temp = await axios.post('http://localhost:3000/register', {
            "emailid": req.body.email,
            "password": req.body.password,
          "username": req.body.name,
           "address": req.body.address
        });
        if (temp.status == 200) {
            console.log("successful Registration");
        }
    } catch (err) {
     //   console.log(err.response.status);
        if (err.response.status == 404) {
            console.log("Error while Performing LOgin operation-->" + err);
        }
        if(err.response.status == 412)
        {
            console.log("Email-id exist in the data base")
        }
        return undefined;
    }
}



module.exports = {

    register: function (req, res) {
        RegisterUser(req,res);
      //  var username = req.body.name;
        // var emailid = req.body.email;
        // var password = req.body.password;
        // var address = req.body.address;
        // console.log("Registered  user's email-id is--->" + emailid);
        // res.view('pages/register');
    },

    login: function (req, res) {
        AuthenticateUser(req, res)
        // var emailid = req.body.email;
        // var password = req.body.password;
        // console.log("Logged in user's email-id is--->" + emailid);
        // res.view('pages/login');
    }




};

