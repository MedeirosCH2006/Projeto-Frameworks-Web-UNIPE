// ItemListComponent.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Importa a tipagem da Store e as Action Creators
import { RootState } from '../store/index';
import { fetchItemsRequest, addItem, deleteItem } from '../store/items/actions';
import { logout } from '../store/auth/actions';

const ItemListComponent: React.FC = () => {
  const dispatch = useDispatch();
  
  // Lê o estado dos módulos no Redux Store
  const { list: items, loading, error } = useSelector(
    (state: RootState) => state.items
  );
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [newItemName, setNewItemName] = useState('');

  // 1. Efeito para buscar itens (simulação) quando o componente carrega
  useEffect(() => {
    // Busca os itens APENAS se o usuário estiver logado e a lista estiver vazia
    if (isLoggedIn && items.length === 0) {
      dispatch(fetchItemsRequest());
    }
  }, [dispatch, isLoggedIn, items.length]);

  // Se o usuário não estiver logado, redireciona para a tela de login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 2. Lógica para adicionar um novo item
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      // Simula a criação de um ID único para o novo item
      const newItem = {
        id: Date.now().toString(), 
        name: newItemName.trim(),
      };
      dispatch(addItem(newItem));
      setNewItemName('');
    }
  };

  // 3. Lógica para excluir um item
  const handleDeleteItem = (id: string) => {
    dispatch(deleteItem(id));
  };

  // 4. Lógica de Logout
  const handleLogout = () => {
    dispatch(logout());
  };


  if (loading) return <h2>Carregando Itens...</h2>;
  if (error) return <h2 style={{ color: 'red' }}>Erro ao Carregar Itens: {error}</h2>;

  return (
    <div className="item-list-container">
      <h1>Lista de Itens (Home)</h1>
      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
        Sair (Logout)
      </button>

      {/* Formulário para Adicionar Item */}
      <form onSubmit={handleAddItem} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Nome do novo item"
        />
        <button type="submit">Adicionar Item</button>
      </form>

      {/* Lista de Itens */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDeleteItem(item.id)} style={{ marginLeft: '10px' }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
      
      {items.length === 0 && !loading && <p>Nenhum item na lista.</p>}

    </div>
  );
};

export default ItemListComponent;
