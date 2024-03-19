const ProdutoPedidoModel =
    require("../models/produto_pedido.model.js");
//Seleciona todos os produtos_pedidos
exports.findAll = (req, res) => {
    ProdutoPedidoModel.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro desconhecido!"
            });
        } else {
            res.send(data);
        }
    });
}
//Seleciona o produto_pedido por ID
exports.findById = (req, res) => {
    ProdutoPedidoModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(404).send({
                    message: "Produto_Pedido não encontrado. ID: " +
                        req.params.id
                });
            } else {
                res.status(500).send({
                    message: "Erro ao retornar o Produto_Pedido com ID: " + req.params.id
                });
            }
        } else {
            res.send(data);
        }
    });
}
//Cria novo produto_pedido no banco
exports.create = (req, res) => {
    if (!req.body.observacao || !req.body.produtos_idproduto ||
        !req.body.pedidos_idpedido) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const produto_pedido = new ProdutoPedidoModel({
            observacao: req.body.observacao,
            produtos_idproduto: req.body.produtos_idproduto,
            pedidos_idpedido: req.body.pedidos_idpedido
        });
        ProdutoPedidoModel.create(produto_pedido, (err, data) => {
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
//Atualizar produto_pedido por id
exports.update = (req, res) => {
    if (!req.body.observacao || !req.body.produtos_idproduto ||
        !req.body.pedidos_idpedido) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const produto_pedido = new ProdutoPedidoModel({
            observacao: req.body.observacao,
            produtos_idproduto: req.body.produtos_idproduto,
            pedidos_idpedido: req.body.pedidos_idpedido
        });
        ProdutoPedidoModel.updateById(req.params.id, produto_pedido,
            (err, data) => {
                if (err) {
                    if (err.type == "not_found") {
                        res.status(404).send({
                            message: "Produto não encontrado."
                        })
                    } else {
                        res.status(500).send({
                            message: "Erro ao atualizar produto."
                        })
                    }
                } else {
                    res.send(data);
                }
            });
    }
}
//Remover produto por id
exports.delete = (req, res) => {
    ProdutoPedidoModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(404).send({ message: "Produto_Pedido não encontrado." })
            } else {
                res.status(500).send({ message: "Erro ao deletar produto_pedido." })
            }
        } else {
            res.send({
                message: "Produto_Pedido deletado com sucesso"
            });
        }
    })
}
//Remover todos os produtos
exports.deleteAll = (req, res) => {
    ProdutoPedidoModel.removeAll((err, data) => {
        if (err) {
            res.status(500).send({ message: "Erro ao deletar Produto_Pedido." })
        } else {
            res.send({ message: "TODOS os Produto_Pedido deletado com sucesso" });
        }
    })
}