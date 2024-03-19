module.exports = app => {
    const produtoController = 
    require("../controllers/produto.controller");
    const auth = require("../middlewares/auth_jwt_middleware");

    //Rota para criar um produto
    app.post("/produtos", [auth.verifyToken, auth.isAdmin], produtoController.create);
    app.get("/produtos", [auth.verifyToken, auth.isBalcao], produtoController.findAll);
    app.get("/produtos/:id", [auth.verifyToken, auth.isBalcao], produtoController.findById);
    app.put("/produtos/:id", [auth.verifyToken, auth.isAdmin], produtoController.update);
    app.delete("/produtos/:id", [auth.verifyToken, auth.isAdmin], produtoController.delete);
    app.delete("/produtos", [auth.verifyToken, auth.isAdmin], produtoController.deleteAll);
}