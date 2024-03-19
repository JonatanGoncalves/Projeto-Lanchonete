const sql = require("../configs/db.js");
//Construtor
const PedidoModel = function (pedido) {
    this.hora = pedido.hora;
    this.status = pedido.status;
}
//Seleciona todos os pedidos
PedidoModel.getAll = result => {
    sql.query("SELECT * FROM pedidos", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        console.log("pedidos: ", res);
        result(null, res);
    })
}
//Seleciona o pedido por ID
PedidoModel.findById = (id, result) => {
    sql.query("SELECT * FROM pedidos WHERE idpedido = " + id, (err,
        res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("Pedido Encontrado", res[0]);
            result(null, res[0]);
        } else {
            result({ type: "not_found" }, null);
            console.log("Pedido não encontrado");
        }
    })
};
//Cria novo pedido no banco
PedidoModel.create = (pedido, result) => {
    sql.query("INSERT INTO pedidos SET ?", pedido, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }
        console.log("Pedido criado: ", {
            idpedido: res.insertId,
            ...pedido
        });
        result(null, { idpedido: res.insertId, ...pedido });
    })
};
//Atualizar pedido por id
PedidoModel.updateById = (id, pedido, result) => {
    sql.query("UPDATE pedidos SET hora = ?, status = ? WHERE idpedido= ?", [pedido.hora, pedido.status, id], (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ type: "not_found" }, null);
        }
        else {
            console.log("Pedido atualizado: ", {
                idpedido: id,
                ...pedido
            });
            result(null, { idpedido: id, ...pedido });
        }
    });
}
//Remover pedido por id
PedidoModel.remove = (id, result) => {
    sql.query("DELETE FROM pedidos WHERE idpedido = ?", id, (err,
        res) => {
        if (err) {
            console.log("erro: ", err);
            result(err, null);
        } else if (res.affectedRows == 0) {
            result({ type: "not_found" }, null);
        } else {
            result(null, res);
        }
    });
}
//Remover todos os produtos
PedidoModel.removeAll = (result) => {
    sql.query("DELETE FROM pedidos ", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err);
        } else {
            result(null);
        }
    });
}
module.exports = PedidoModel;