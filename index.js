const express = require('express');
const app = express();
var cors = require('cors')
const Razorpay  = require('razorpay')
const shortid = require('shortid') 
app.use(cors()) ;
app.use(express.json({limit:'1mb'}));


const razorpay = new Razorpay({
    key_id:'rzp_test_Rf4MoKgbOUCW3R',
    key_secret: '2UqwA9Rmt5KJsoJviV9PTJr4'
})
app.get('/',(req,res) =>{
    res.send('hello')
    console.log('hello');
})


app.post('/razorpay', async (req,res)=> {
    console.log(req.body.e);
    const options ={
        amount:req.body.e*100,
        currency:'INR', 
        receipt:shortid.generate(), 
        payment_capture:true
    }
    try{
        
        const response = await razorpay.orders.create(options)
        console.log(response);
        res.json({
            id:response.id,
            currency:'INR',
            amount:response.amount
        })
    }catch(error){
 console.log(error);
    }

})

app.listen(1337,() => {
    console.log('lustening on 1337');
})