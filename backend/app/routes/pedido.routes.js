module.exports = app => {
    const pedidoController =
        require("../controllers/pedido.controller.js");
    app.post("/pedidos", pedidoController.create);
    app.get("/pedidos", pedidoController.findAll);
    app.get("/pedidos/:id", pedidoController.findById);
    app.put("/pedidos/:id", pedidoController.update);
    app.delete("/pedidos/:id", pedidoController.delete);
    app.delete("/pedidos", pedidoController.deleteAll);
}