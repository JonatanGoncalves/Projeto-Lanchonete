import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaWindowClose, FaExclamation } from "react-icons/fa";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import { Container } from "./style";
const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        async function getData() {
            const response = await api.get("/pedidos");
            setPedidos(response.data);
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
            response = await api.delete(`/pedidos/${id}`);
            const novosPedidos = [...pedidos];
            novosPedidos.splice(index, 1);
            setPedidos(novosPedidos);
        } catch (err) {
            setError("Houve um problema ao excluir os dados: " + response);
        }
    };
    return (
        <div>
            <Navbar />
            <h1>Listagem de Pedidos</h1>
            {error && <p>{error}</p>}
            <Container>
                <div>
                    <span>ID</span>
                    <span>Hora</span>
                    <span>Status</span>
                    <span>Editar</span>
                    <span>Excluir</span>
                </div>
                {pedidos.map((pedido, index) => (
                    <div key={String(pedido.idpedido)}>
                        <span>{pedido.idpedido}</span>
                        <span>{pedido.hora}</span>
                        <span>{pedido.status}</span>
                        <Link to={`/pedidos/${pedido.idpedido}`}>
                            <FaEdit size={16} />
                        </Link>
                        <Link onClick={handleDeleteAsk} to={`/pedido/${pedido.idpedido}`}>
                            <FaWindowClose size={16} />
                        </Link>
                        <FaExclamation
                            size={16}
                            display="none"
                            cursor="pointer"
                            onClick={(e) => handleDelete(e, pedido.idpedido, index)}
                        />
                    </div>
                ))}
            </Container>
        </div>
    );
};
export default Pedidos;