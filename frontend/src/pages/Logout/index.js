import React from 'react';
import { Navigate } from 'react-router-dom';
import { Container } from './style';
import { logout } from "../../services/auth";
const Logout = () => {
    logout();
    return (
        <Container>
            <Navigate to="/" replace />
        </Container>
    );
}
export default Logout;