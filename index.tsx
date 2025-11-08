// src/pages/Home/index.tsx (Lista de Compras Simples)

import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../auth/actions';

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); // Redireciona para o login após sair
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                <h1>🛍️ Lista de Compras UNIPÊ</h1>
                <button 
                    onClick={handleLogout}
                    style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
                >
                    Sair
                </button>
            </div>

            <h2>Bem-vindo(a)!</h2>
            <p>Se você vê esta tela, o login foi bem-sucedido. A API está rodando corretamente.</p>

            <div style={{ marginTop: '30px' }}>
                <h3>Itens da Lista (Interface de Exemplo)</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}>Pão Integral (Comprado)</li>
                    <li style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}>Leite Desnatado (Pendente)</li>
                    <li style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}>Ovos (Pendente)</li>
                </ul>
            </div>
            
        </div>
    );
};

export default HomePage;
