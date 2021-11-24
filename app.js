const express  = require("express");
const app     =   express();
const request = require("request");
const bodyParser = require("body-parser");
const https =       require("https");




app.use(express.static("src"));
app.use(express.urlencoded({encoded: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req , res){

    const name = req.body.name ;
    const password = req.body.password;
    const mail = req.body.mail
    

     const data = {
         members:[{
             email_address:mail,
             status :"subscribed",
             merge_fileds:{
                FNAME: name,
                LNAME:password,
             }
        }
    ]
    
     }
     const jsondata = JSON.stringify(data)

     const url =" https://us20.api.mailchimp.com/3.0/lists/1e74b40811"

     const options ={
         method:"POST",
         auth:"rst:cc7bd34c70e4e6c5502f0f4b608647c2-us20"
     }

   


    const request = https.request( url , options , function(response){
        if (response.statusCode ===2000){
            res.sendFile(__dirname + "/success.html")
        } else{
            res.sendFile(__dirname + "/faliure.html")
        }
       
        response.on("data" ,function(data){

            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata)
    request.end()
})
app.post("/faliure" ,function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT|| 3000, function(){
    console.log("server is running")
})


//api = cc7bd34c70e4e6c5502f0f4b608647c2-us20

//audience id= 1e74b40811