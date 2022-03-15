const express = require('express');
const bodyParser = require('body-parser');
const config= require("config");
const router = require('./controller/fornecedores');

let app = express();

app.use(bodyParser.json());

app.use("/api/fornecedores", router);

app.listen(config.get("api.porta"), ()=>{
  console.log('Server is runing on port 3000');
});

