const PedidoModel = require("../models/pedido.model.js");
//Seleciona todos os pedidos
exports.findAll = (req, res) => {
    PedidoModel.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro desconhecido!"
            });
        } else {
            res.send(data);
        }
    });
}
//Seleciona o pedido por ID
exports.findById = (req, res) => {
    PedidoModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(404).send({
                    message: "Pedido não encontrado. ID: " +
                        req.params.id
                });
            } else {
                res.status(500).send({
                    message: "Erro ao retornar o pedido com ID: " +
                        req.params.id
                });
            }
        } else {
            res.send(data);
        }
    });
}
//Cria novo pedido no banco
exports.create = (req, res) => {
    if (!req.body.hora || !req.body.status) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const pedido = new PedidoModel({
            hora: req.body.hora,
            status: req.body.status
        });
        PedidoModel.create(pedido, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                });
            } else {
                res.send(data);
            }
        });
    }
}
//Atualizar pedido por id
exports.update = (req, res) => {
    if (!req.body.hora || !req.body.status) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const pedido = new PedidoModel({
            hora: req.body.hora,
            status: req.body.status
        });
        PedidoModel.updateById(req.params.id, pedido, (err, data) => {
            if (err) {
                if (err.type == "not_found") {
                    res.status(404).send({
                        message: "Pedido não encontrado."
                    })
                } else {
                    res.status(500).send({
                        message: "Erro ao atualizar pedido."
                    })
                }
            } else {
                res.send(data);
            }
        });
    }
}
//Remover produpedido por id
exports.delete = (req, res) => {
    PedidoModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(404).send({
                    message: "Pedido não encontrado."
                })
            } else {
                res.status(500).send({
                    message: "Erro ao deletar pedido."
                })
            }
        } else {
            res.send({ message: "Pedido deletado com sucesso" });
        }
    })
}
//Remover todos os pedidos
exports.deleteAll = (req, res) => {
    PedidoModel.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Erro ao deletar pedido."
            })
        } else {
            res.send({
                message: "TODOS os Pedidos deletado com sucesso"
            });
        }
    })
}