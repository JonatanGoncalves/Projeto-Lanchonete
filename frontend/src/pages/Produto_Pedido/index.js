import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";
import Logo from "../../assets/senac.png";
import Navbar from "../../components/Navbar";
const Produto_Pedido = () => {
    const [produtos_idproduto, setIdProduto] = useState("");
    const [pedidos_idpedido, setIdPedido] = useState("");
    const [observacao, setObservacao] = useState("");
    const [produtos, setTableProdutos] = useState([]);
    const [pedidos, setTablePedidos] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        async function getSelect() {
            try {
                //Carrega combobox produtos
                let response = await api.get("/produtos");
                setTableProdutos(response.data);
                //Carrega combobox pedidos
                response = await api.get("/pedidos");
                setTablePedidos(response.data);
            } catch (err) {
                setError("Houve um problema ao carregar os selects: " + err);
            }
        }
        getSelect();
        if (!id) return;
        async function getData() {
            try {
                const { data } = await api.get(`/produtos_pedidos/${id}`);
                setIdProduto(data.produtos_idproduto);
                setIdPedido(data.pedidos_idpedido);
                setObservacao(data.observacao);
            } catch (err) {
                setError("Houve um problema ao carregar os dados do produto: " + err);
            }
        }
        getData();
    }, [id]);
    const handleProduto = async (e) => {
        e.preventDefault();
        if (!produtos_idproduto || !pedidos_idpedido || !observacao) {
            setError("Preencha todos os dados para cadastrar");
        } else {
            try {
                if (!id) {
                    await api.post("/produtos_pedidos", {
                        produtos_idproduto,
                        pedidos_idpedido,
                        observacao,
                    });
                    navigate("/produtos_pedidos");
                } else {
                    await api.put(`/produtos_pedidos/${id}`, {
                        produtos_idproduto,
                        pedidos_idpedido,
                        observacao,
                    });
                    navigate("/produtos_pedidos");
                }
            } catch (err) {
                console.log(err);
                setError("Ocorreu um erro ao cadastrar produtos_pedidos.");
            }
        }
    };
    return (
        <div>
            <Navbar />
            <Container>
                <Form onSubmit={handleProduto}>
                    {error && <p>{error}</p>}
                    <img src={Logo} alt="logo_senac" />
                    <select
                        onChange={(e) => setIdProduto(e.target.value)}
                        value={produtos_idproduto}
                    >
                        <option value="">Selecione um Produto</option>
                        {produtos.map((produto) => (
                            <option key={produto.idproduto} value={produto.idproduto}>
                                {produto.nome}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(e) => setIdPedido(e.target.value)}
                        value={pedidos_idpedido}
                    >
                        <option value="">Selecione um Pedido</option>
                        {pedidos.map((pedido) => (
                            <option key={pedido.idpedido} value={pedido.idpedido}>
                                {pedido.idpedido}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Observação"
                        value={observacao}
                        onChange={(e) => setObservacao(e.target.value)}
                    />
                    <button type="submit">Cadastro de Produtos_Pedidos</button>
                </Form>
            </Container>
        </div>
    );
};
export default Produto_Pedido;