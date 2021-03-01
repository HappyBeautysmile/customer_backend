const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = require("http").Server(app);
const path = require("path");
const Config = require("./db")

app.use(cors());
app.use("*",(req,res,next)=>{
  let expires = new Date(new Date().valueOf() + 30 * 24 * 60 * 60 * 1000);
  res.cookie('cookie1', 'value1', { sameSite: 'lax',httpOnly : true ,expires :expires ,path : "/" });   next(); });
app.use(express.static('./client'));
app.use(express.static('./client/customer_frontend_build'));
app.use(bodyParser.json({limit: "15360mb", type:'application/json'}));
app.use(bodyParser.urlencoded({ extended: true }));
  

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/customer_frontend_build/index.html'));  
});

server.listen(Config.PORT, () => {
  console.log(`Started server on => http://localhost:${Config.PORT}`);
});