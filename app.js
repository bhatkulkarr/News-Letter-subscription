const express = require("express");
const bodyparser = require("body-parser");
const requestpck = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));


app.get("/", function(req, res){

  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req,res){

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status:"subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname

        }
      }
    ]
  };

  const url = "https://us10.api.mailchimp.com/3.0/lists/4863177a99"
  const jsonData = JSON.stringify(data);

  const options = {
    method: "POST",
    auth: "Rajat:fff20ce6a15ba0cbe3e6037893b56400d-us10",
  }
     const request = https.request(url, options, function(response){

       if(response.statusCode === 200){
         res.sendFile(__dirname + "/sucess.html");
       }else{
         res.sendFile(__dirname + "/failure.html");
       }
    response.on("data", function(data){
      console.log(JSON.parse(data));

    })

  })
  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){

  res.redirect("/");

});

app.listen(process.env.PORT || 3000,function(req,res){

  console.log("Server running At port 3000");

});

// ff20ce6a15ba0cbe3e6037893b56400d-us10
// 4863177a99
