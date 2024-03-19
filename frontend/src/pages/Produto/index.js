import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";
import Logo from "../../assets/senac.png";
const Produto = () => {
    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        async function getData(){
            try{
                const { data } = await api.get(`/produtos/${id}`);
                setNome(data.nome);
                setValor(data.valor);
            }catch(err){
                setError("Houve um problema ao carregar os dados do usuario: "+err);
            }
        }
        getData();
    }, [id]);

    const handleProduto = async e => {
        e.preventDefault();
        if (!nome || !valor) {
            setError("Preencha todos os dados para se cadastrar");
        } else {
            try {
                if (!id){
                    await api.post("/produtos", { nome, valor });
                } else {
                    await api.put(`/produtos/${id}`, { nome, valor });
                }
                navigate(-1);
            } catch (err) {
                console.log(err);
                setError("Ocorreu um erro ao cadastra produto.")
            }
        }
    }

    const handleCancel = () => {
        navigate(-1); // Navega para a página anterior
    };

    return (
        <Container>
            <Form onSubmit={handleProduto}>
                {error && <p>{error}</p>}
                <img src={Logo} alt="logo_senac" />
                <input
                    value={nome}
                    type="text"
                    placeholder="Nome"
                    onChange={e => setNome(e.target.value)}
                />
                <input
                    value={valor}
                    type="text"
                    placeholder="Valor"
                    onChange={e => setValor(e.target.value)}
                />
                <button type="submit">Salvar</button>
                <button type="button" onClick={handleCancel}>Cancelar</button>
            </Form>
        </Container>
    )
}
export default Produto;