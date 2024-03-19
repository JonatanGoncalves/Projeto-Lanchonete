module.exports = app => {
    const usuarioController = require("../controllers/usuario.controller");

    app.post("/signup", usuarioController.signUp); //Rota para criar usuario
    app.post("/signin", usuarioController.signIn); //Rota para login
    app.get("/usuarios", usuarioController.findAll);
    app.get("/usuarios/:id", usuarioController.findById);
    app.put("/usuarios/:id", usuarioController.update);
    app.delete("/usuarios/:id", usuarioController.delete);
}