import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaWindowClose, FaExclamation } from "react-icons/fa";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import { ProdutoContainer } from "./style";
const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getData() {
            const response = await api.get("/produtos");
            setProdutos(response.data);
        }
        getData();
    }, []);

    const handleDeleteAsk = (e) => {
        e.preventDefault();
        const exclamation = e.currentTarget.nextSibling;
        exclamation.setAttribute("display", "block");
        e.currentTarget.remove();
    };
    const handleDelete = async (e, id, index) => {
        e.persist();
        let response = "";
        try {
            response = await api.delete(`/produtos/${id}`);
            const novosProdutos = [...produtos];
            novosProdutos.splice(index, 1);
            setProdutos(novosProdutos);
        } catch (err) {
            setError("Houve um problema ao excluir os dados: " + response);
        }
    };
    return (
        <div>
            <Navbar />
            <h1>Listagem de Produtos</h1>
            {error && <p>{error}</p>}
            <ProdutoContainer>
                <div>
                    <span>ID</span>
                    <span>Nome</span>
                    <span>Valor</span>
                    <span>Editar</span>
                    <span>Excluir</span>
                </div>
                {produtos.map((produto, index) => (
                    <div key={String(produto.idproduto)}>
                        <span>{produto.idproduto}</span>
                        <span>{produto.nome}</span>
                        <span>{produto.valor}</span>
                        <Link to={`/produtos/${produto.idproduto}`}>
                            <FaEdit size={16} />
                        </Link>
                        <Link
                            onClick={handleDeleteAsk}
                            to={`/produtos/${produto.idproduto}`}
                        >
                            <FaWindowClose size={16} />
                        </Link>
                        <FaExclamation
                            size={16}
                            display="none"
                            cursor="pointer"
                            onClick={(e) => handleDelete(e, produto.idproduto, index)}
                        />
                    </div>
                ))}
            </ProdutoContainer>
        </div>
    );
};
export default Produtos;
