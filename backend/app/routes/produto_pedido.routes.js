module.exports = app => {
    const produto_pedidoController =
        require("../controllers/produto_pedido.controller.js");
    app.post("/produtos_pedidos", produto_pedidoController.create);
    app.get("/produtos_pedidos", produto_pedidoController.findAll);
    app.get("/produtos_pedidos/:id", produto_pedidoController.findById);
    app.put("/produtos_pedidos/:id", produto_pedidoController.update);
    app.delete("/produtos_pedidos/:id", produto_pedidoController.delete);
    app.delete("/produtos_pedidos", produto_pedidoController.deleteAll);
}
