import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import Usuarios from "./pages/Usuarios";
import Produtos from "./pages/Produtos";
import Produto from "./pages/Produto";
import Pedidos from "./pages/Pedidos";
import Pedido from "./pages/Pedido";
import Produtos_Pedidos from "./pages/Produtos_Pedidos";
import Produto_Pedido from "./pages/Produto_Pedido";

const LoginPage = () => <Login />;
const SignUpPage = () => <SignUp />;
const LogOutPage = () => <Logout />;
const UsuariosPage = () => <Usuarios />;
const ProdutosPage = () => <Produtos />;
const ProdutoPage = () => <Produto />;
const PedidosPage = () => <Pedidos />
const PedidoPage = () => <Pedido />
const Produtos_PedidosPage = () => <Produtos_Pedidos />
const Produto_PedidoPage = () => <Produto_Pedido />
const NotFoundPage = () => <h1>Página não encontrada.</h1>;
const AppPage = () => {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />;
    }
    return <MainPage />;
};
const Rotas = () => (
    <Router>
        <Routes>
            <Route path="/" element={<SignUpPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/logout" element={<LogOutPage />} />
            <Route path="/app" element={<AppPage />} />
            <Route path="/usuarios" element={<UsuariosPage />} />
            <Route path="/usuarios/:id" element={<SignUpPage />} />
            <Route path="/produtos" element={<ProdutosPage />} />
            <Route path="/produto" element={<ProdutoPage />} />
            <Route path="/produtos/:id" element={<ProdutoPage />} />
            <Route path="/pedidos" element={<PedidosPage />} />
            <Route path="/pedido" element={<PedidoPage />} />
            <Route path="/produtos_pedidos" element={<Produtos_PedidosPage />} />
            <Route path="/produto_pedido" element={<Produto_PedidoPage />} />
            <Route path="/produto_pedido/:id" element={<Produto_PedidoPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </Router>
);
export default Rotas;
