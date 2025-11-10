import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../store';
import './Home.scss';

// Interface para o item de compra
interface ShoppingItem {
    _id: string;
    name: string;
    quantity: number;
    userId: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HomePage: React.FC = () => {
    const [items, setItems] = useState<ShoppingItem[]>([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    // Função para buscar itens
    const fetchItems = async () => {
        if (!token || !API_BASE_URL) {
            setLoading(false);
            setError('ERRO CRÍTICO: Token ou URL da API não definidos.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_BASE_URL}/shopping/items`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setItems(response.data);
        } catch (err) {
            console.error('Erro ao buscar itens (Axios):', err);
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                dispatch(clearToken());
                navigate('/login');
            }
            setError('Falha ao carregar a lista. Verifique o servidor Backend.');
        } finally {
            setLoading(false);
        }
    };

    // Função para adicionar um novo item (AGORA COMPLETA)
    const addItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token || !newItemName.trim()) return;

        setError(''); // Limpa erros
        try {
            // Requisição POST para o Backend
            await axios.post(`${API_BASE_URL}/shopping/items`, 
                { 
                    name: newItemName.trim(), 
                    quantity: newItemQuantity 
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            // Limpa o formulário e recarrega a lista
            setNewItemName('');
            setNewItemQuantity(1);
            fetchItems(); 
        } catch (err) {
            console.error('Erro ao adicionar item:', err);
            setError('Falha ao adicionar item. Verifique o log do Backend.');
        }
    };

    // Logout
    const handleLogout = () => {
        dispatch(clearToken());
        navigate('/login');
    };

    useEffect(() => {
        fetchItems();
    }, [token]);

    if (loading) return <div className="home-container">Carregando lista...</div>;
    if (error) return <div className="home-container error-message">{error}</div>;

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Minha Lista de Compras - Unipê</h1>
                <button className="logout-button" onClick={handleLogout}>Sair</button>
            </header>
            
            <form className="add-item-form" onSubmit={addItem}>
                <input
                    type="text"
                    placeholder="Nome do Item (Ex: Arroz)"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Qtd"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                    min="1"
                    required
                />
                <button type="submit">Adicionar Item</button>
            </form>

            <section className="shopping-list">
                <h2>Itens na Lista</h2>
                {items.length === 0 ? (
                    <p>A sua lista está vazia! Adicione o primeiro item acima.</p>
                ) : (
                    <ul>
                        {items.map((item) => (
                            <li key={item._id} className="shopping-item">
                                <span>{item.name}</span>
                                <span className="quantity">{item.quantity}x</span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default HomePage;
