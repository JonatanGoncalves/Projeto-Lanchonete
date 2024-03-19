import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";
import Logo from "../../assets/senac.png";
const SignUp = () => {
    const { id } = useParams();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        async function getData(){
            try{
                const { data } = await api.get(`/usuarios/${id}`);
                setEmail(data.email);
                setSenha(data.senha);
                setTipo(data.tipo);
            }catch(err){
                setError("Houve um problema ao carregar os dados do usuario: "+err);
            }
        }
        getData();
    }, [id]);

    const handleSignUp = async e => {
        e.preventDefault();
        if (!email || !senha || !tipo) {
            setError("Preencha todos os dados para se cadastrar");
        } else {
            try {
                if (!id){
                    await api.post("/signup", { email, senha, tipo });
                    navigate("/");
                } else {
                    await api.put(`/usuarios/${id}`, { email, senha, tipo });
                    navigate(-1);
                }
                
            } catch (err) {
                console.log(err);
                setError("Ocorreu um erro ao registrar sua conta.")
            }
        }
    }
    return (
        <Container>
            <Form onSubmit={handleSignUp}>
                {error && <p>{error}</p>}
                <img src={Logo} alt="logo_senac" />
                <input
                    value={email}
                    type="email"
                    placeholder="Endereço de email"
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    value={senha}
                    type="password"
                    placeholder="Senha"
                    onChange={e => setSenha(e.target.value)}
                />
                <input
                    value={tipo}
                    type="number"
                    placeholder="Tipo de Acesso"
                    onChange={e => setTipo(e.target.value)}
                />
                <button type="submit">Cadastro de Usuário</button>
                <Link to="/">Fazer Login</Link>
            </Form>
        </Container>
    )
}
export default SignUp;