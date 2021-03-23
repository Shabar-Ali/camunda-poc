const express = require("express"),
      bodyparser = require("body-parser"),
      app = express();

const PORT = process.env.PORT || '3000';


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + "/public"));

//Requiring routes
const routes  = require("./routes/router");
app.use(routes);


app.listen(PORT, process.env.IP, ()=>{
    console.log("server is running on port", PORT);
});