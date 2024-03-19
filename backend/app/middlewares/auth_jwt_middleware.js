const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const usuarioModel = require("../models/usuario.model");

verifyToken = (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);

    if (!authorization) {
        return res.status(403).send({
            message: "Não possui token para autenticação."
        });
    } else {
        const [, token] = authorization.split(' ');
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Acesso não autorizado. Credencial invalida."
                });
            } else {
                req.id = decoded.id;
                next();
            }
        })
    }
}

isAdmin = (req, res, next) => {
    usuarioModel.findById(req.id, (err, data) => {
        if (data.tipo == 1) {
            next();
        } else {
            res.status(403).send({
                message: "Você precisa ser administrador para executar a ação!"
            })
        }
    });
}

isBalcao = (req, res, next) => {
    usuarioModel.findById(req.id, (err, data) => {
        if (data.tipo == 1 || data.tipo == 2) {
            next();
        } else {
            res.status(403).send({
                message: "Você precisa ser do balcao de atendimento para executar a ação!"
            })
        }
    });
}
isCozinha = (req, res, next) => {
    usuarioModel.findById(req.id, (err, data) => {
        if (data.tipo == 1 || data.tipo == 3) {
            next();
        } else {
            res.status(403).send({
                message: "Você precisa ser da cozinha para executar a ação!"
            })
        }
    });
}
module.exports = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isBalcao: isBalcao,
    isCozinha: isCozinha
}


