import styled from 'styled-components';
export const Nav = styled.nav`
 background-color: #1E90FF;
 padding: 10px 20px;
 display: flex;
 justify-content: space-between;
 align-items: center;
 @media (max-width: 768px) {
 flex-direction: column;
 align-items: flex-start; // Certifique-se de que os itens estejam alinhados à esquerda por padrão
 }
`;
export const NavItems = styled.div`
 display: flex;
 gap: 20px;
 @media (max-width: 768px) {
 display: ${props => (props.show ? 'flex' : 'none')};
 flex-direction: column;
 gap: 10px;
 }
`;
export const ToggleButton = styled.button`
 display: none;
 @media (max-width: 768px) {
 display: block;
 align-self: flex-end; // Alinha o botão à direita
 }
`;
