/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    register:function(req,res)
    {
        var username=req.body.name;
        var emailid=req.body.email;
        var password=req.body.password;
        var address=req.body.address;
        console.log("Registered  user's email-id is--->"+emailid);
        res.view('pages/register');
    },

    login:function(req,res)
    {
        var emailid=req.body.email;
        var password=req.body.password;
        console.log("Logged in user's email-id is--->"+emailid);
        res.view('pages/login');
    }



};

