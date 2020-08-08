

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
        let emailid=req.body.email;
        let password=req.body.password;


        let order = {
            userId: req.body.userId,
            sellerId: req.body.sellerId,
            orderQty: req.body.orderQty,
            productId: req.body.productId,
            userAdd: req.body.userAdd,
            orderTotal: req.body.orderTotal,
        }
        //authenticate user and set userId and userAdd to order object.

        
        res.view('pages/proceedOrder', {
            order: order
        });
    },
};

