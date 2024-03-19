const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');

const app = express();

//parser para requisições content-type:
//application/x-www-form-urlencoded-json
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    app.use(cors());
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));  

//Linhas das rotas
require("./app/routes/produto.routes") (app);
require("./app/routes/pedido.routes.js")(app);
require("./app/routes/produto_pedido.routes.js")(app);
require("./app/routes/usuario.routes.js")(app);

app.get("/", (req, res) =>{
    res.json({
        message: "Bem vindo à API MVC do SENAC"
    });
});
app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});
