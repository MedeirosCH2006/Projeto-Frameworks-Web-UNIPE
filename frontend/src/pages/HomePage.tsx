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
        } else {
            fetchItems();
        }
    }, [token, navigate]);

    // Função para buscar itens (COM AGREGAÇÃO PARA RESOLVER DUPLICAÇÃO)
    const fetchItems = async () => {
        if (!token || !API_BASE_URL) {
            setLoading(false);
            setError('ERRO CRÍTICO: Token ou URL da API não definidos.');
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/shopping/items`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            // LÓGICA DE AGREGAÇÃO: Agrupa itens pelo nome para somar quantidades
            const aggregatedItems = response.data.reduce((acc: any, currentItem: ShoppingItem) => {
                const existingItem = acc.find((item: ShoppingItem) => item.name === currentItem.name);
                
                if (existingItem) {
                    existingItem.quantity += currentItem.quantity;
                } else {
                    acc.push({ ...currentItem });
                }
                return acc;
            }, []);

            setItems(aggregatedItems);
            setLoading(false);
            setError('');
        } catch (error) {
            console.error("Erro ao buscar itens:", error);
            setError('Falha ao buscar itens da API.');
            setLoading(false);
        }
    };

    // Função para adicionar item (COMPLETA)
    const addItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token || !newItemName.trim()) return;

        try {
            await axios.post(`${API_BASE_URL}/shopping/items`, {
                name: newItemName.trim(),
                quantity: newItemQuantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setNewItemName('');
            setNewItemQuantity(1);
            fetchItems(); // Recarrega a lista
        } catch (error) {
            console.error("Erro ao adicionar item:", error);
            setError('Falha ao adicionar item.');
        }
    };

    // 🗑️ FUNÇÃO PARA DECREMENTAR A QUANTIDADE (Remove APENAS 1 unidade)
    const handleRemoveOne = async (itemName: string) => {
        try {
            // Chama a rota /removeOne no Backend
            await axios.post(`${API_BASE_URL}/shopping/items/removeOne`, { 
                name: itemName 
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchItems(); // Recarrega a lista
        } catch (error) {
            console.error("Erro ao remover uma unidade:", error);
            setError('Falha ao remover uma unidade do item.');
        }
    };

    // 🗑️ FUNÇÃO PARA REMOVER TODAS AS UNIDADES DE UM ITEM (Zerar Item)
    const handleDeleteAll = async (itemName: string) => {
        if (!window.confirm(`ATENÇÃO! Tem certeza que deseja zerar TODAS as unidades de '${itemName}'?`)) return;
        
        try {
            // Chama a nova rota de exclusão total no Backend
            await axios.post(`${API_BASE_URL}/shopping/items/deleteAllByName`, { 
                name: itemName 
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchItems(); // Recarrega a lista para remover o item zerado
        } catch (error) {
            console.error("Erro ao zerar item:", error);
            setError('Falha ao zerar item.');
        }
    };


    // Função de Logout
    const handleLogout = () => {
        dispatch(clearToken());
    };

    if (loading) return <div className="home-container">Carregando itens...</div>;

    // =======================================================
    // RENDERIZAÇÃO
    // =======================================================
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Lista de Compras 🛒</h1>
                <button onClick={handleLogout} className="logout-button">Sair</button>
            </header>

            {error && <p className="error-message">{error}</p>}
            
            <section className="item-form">
                <form onSubmit={addItem} className="add-item-form">
                    <input
                        type="text"
                        placeholder="Nome do Item"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Qtd"
                        value={newItemQuantity}
                        onChange={(e) => setNewItemQuantity(Math.max(1, parseInt(e.target.value === '' ? '0' : e.target.value) || 1))}
                        min="0" // Permite o zero (ou campo vazio) no browser!
                        required
                    />
                    <button type="submit" className="add-button">Adicionar</button>
                </form>
            </section>

            <section className="item-list-section">
                <h2>Meus Itens</h2>
                <div className="item-list">
                    {items.length === 0 ? (
                        <p>Sua lista está vazia. Adicione um item!</p>
                    ) : (
                        items.map((item) => (
                            <div key={item.name} className="item-row"> 
                                <span className="item-name">{item.name} ({item.quantity}x)</span>
                                
                                {/* 🗑️ BOTÃO 1: EXCLUSÃO FINA (-1) */}
                                <button 
                                    className="delete-button"
                                    onClick={() => handleRemoveOne(item.name)} 
                                >
                                    –1
                                </button>
                                
                                {/* 🗑️ BOTÃO 2: EXCLUSÃO BRUTA (Zerar Item) */}
                                <button 
                                    className="delete-all-button" 
                                    onClick={() => handleDeleteAll(item.name)} 
                                >
                                    Zerar Item
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
