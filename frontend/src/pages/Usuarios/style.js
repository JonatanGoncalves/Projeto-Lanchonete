import styled from "styled-components";
import { Link } from "react-router-dom";
export const UsuarioContainer = styled.div`
 margin-top: 20px;
 div {
 display: flex;
 align-items: center;
 justify-content: space-between;
 padding: 5px 0;
 }
 div + div {
 border-top: 1px solid #eee;
 }
 span {
 display: flex;
 align-items: center;
 justify-content: space-between;
 padding: 5px 0;
 }
`;
export const NovoUsuario = styled(Link)`
 display: block;
 padding: 20px 0 10px 0;
`;