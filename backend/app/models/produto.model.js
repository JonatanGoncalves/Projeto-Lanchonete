const sql = require("../configs/db.js");
//Construtor
const ProdutoModel = function (produto) {
    this.nome = produto.nome;
    this.valor = produto.valor;
}
//Cria novo produto no banco
ProdutoModel.create = (produto, result) => {
    sql.query("INSERT INTO produtos SET ?", produto, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }
        console.log("Produto criado: ", { idproduto: res.insertId, ...produto });
        result(null, { idproduto: res.insertId, ...produto });
    })

};
ProdutoModel.findById = (id, result) => {
    sql.query("SELECT * FROM produtos WHERE idproduto = " + id, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("Produto Encontrado", res[0]);
            result(null, res[0]);
        } else {
            result({ type: "not_found" }, null);
            console.log("Produto não encontrado");
        }
    })
};

//Seleciona todos os produtos
ProdutoModel.getAll = result => {
    sql.query("SELECT * FROM produtos", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        console.log("produtos: ", res);
        result(null, res);
    })
}

//Atualizar produto por id
ProdutoModel.updateById = (id, produto, result) => {
    sql.query("UPDATE produtos SET nome = ?, valor = ? WHERE idproduto= ?", [produto.nome, produto.valor, id], (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ type: "not_found" }, null);
        }
        else {
            console.log("Produto atualizado: ", {
                idproduto: id,
                ...produto
            });
            result(null, { idproduto: id, ...produto });
        }
    });
}

//Remover produto por id
ProdutoModel.remove = (id, result) => {
    sql.query("DELETE FROM produtos WHERE idproduto = ?", id, (err,
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
ProdutoModel.removeAll = (result) => {
    sql.query("DELETE FROM produtos ", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err);
        } else {
            result(null);
        }
    });
}

module.exports = ProdutoModel;