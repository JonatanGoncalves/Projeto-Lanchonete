const sql = require("../configs/db.js");
//Construtor
const ProdutoPedidoModel = function (produtos_pedidos) {
    this.observacao = produtos_pedidos.observacao;
    this.produtos_idproduto = produtos_pedidos.produtos_idproduto;
    this.pedidos_idpedido = produtos_pedidos.pedidos_idpedido;
}
//Seleciona todos os produtos
ProdutoPedidoModel.getAll = result => {
    sql.query("SELECT * FROM produtos_pedidos", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        console.log("produtos_pedidos: ", res);
        result(null, res);
    })
}
//Seleciona o produto por ID
ProdutoPedidoModel.findById = (id, result) => {
    sql.query("SELECT * FROM produtos_pedidos WHERE idproduto_pedido = " + id, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("Produto_Pedido Encontrado", res[0]);
            result(null, res[0]);
        } else {
            result({ type: "not_found" }, null);
            console.log("Produto_Pedido não encontrado");
        }
    })
};
//Cria novo produto no banco
ProdutoPedidoModel.create = (produtos_pedidos, result) => {
    sql.query("INSERT INTO produtos_pedidos SET ?", produtos_pedidos,
        (err, res) => {
            if (err) {
                console.log("Erro: ", err);
                result(err, null);
                return;
            }
            console.log("Produto_Pedido criado: ", {
                idproduto_pedido:
                    res.insertId, ...produtos_pedidos
            });
            result(null, {
                idproduto_pedido: res.insertId,
                ...produtos_pedidos
            });
        })
};
//Atualizar produto por id
ProdutoPedidoModel.updateById = (id, produtos_pedidos, result) => {
    sql.query("UPDATE produtos_pedidos SET observacao = ?, produtos_idproduto = ?, pedidos_idpedido = ? WHERE idproduto_pedido= ?", [produtos_pedidos.observacao, produtos_pedidos.produtos_idproduto,
    produtos_pedidos.pedidos_idpedido, id], (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ type: "not_found" }, null);
        }
        else {
            console.log("Produto_Pedido atualizado: ",
                { idproduto_pedido: id, ...produtos_pedidos });
            result(null, {
                idproduto_pedido: id,
                ...produtos_pedidos
            });
        }
    });
}
//Remover produto por id
ProdutoPedidoModel.remove = (id, result) => {
    sql.query("DELETE FROM produtos_pedidos WHERE idproduto_pedido = ?", id, (err, res) => {
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
ProdutoPedidoModel.removeAll = (result) => {
    sql.query("DELETE FROM produtos_pedidos ", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err);
        } else {
            result(null);
        }
    });
}
module.exports = ProdutoPedidoModel;