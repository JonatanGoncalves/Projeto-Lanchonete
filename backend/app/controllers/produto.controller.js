const produtoModel = require("../models/produto.model");

exports.create = (req, res) => {
    if (!req.body.nome || !req.body.valor) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const produto = new produtoModel({
            nome: req.body.nome,
            valor: req.body.valor
        });
        produtoModel.create(produto, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                });
            } else {
                res.send(data);
            }
        })
    }
}

exports.findAll = (req, res) => {
    produtoModel.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro desconhecido!"
            });
        } else {
            res.send(data);
        }
    });
}

//Seleciona o produto por ID
exports.findById = (req, res) => {
    produtoModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(404).send({
                    message: "Produto não encontrado. ID: " + req.params.id
                });
            } else {
                res.status(500).send({
                    message: "Erro ao retornar o produto com ID: " + req.params.id
                });
            }
        } else {
            res.send(data);
        }
    });
}

//Atualizar produto por id
exports.update = (req, res) => {
    if (!req.body.nome || !req.body.valor) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const produto = new produtoModel({
            nome: req.body.nome,
            valor: req.body.valor
        });
        produtoModel.updateById(req.params.id, produto, (err, data) => {
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
    produtoModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(404).send({
                    message: "Produto não encontrado."
                })
            } else {
                res.status(500).send({
                    message: "Erro ao deletar produto."
                })
            }
        } else {
            res.send({ message: "Produto deletado com sucesso" });
        }
    })
}

exports.deleteAll = (req, res) => {
    produtoModel.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Erro ao deletar produto."
            })
        } else {
            res.send({
                message: "TODOS os Produto deletado com sucesso"
            });
        }
    })
}
