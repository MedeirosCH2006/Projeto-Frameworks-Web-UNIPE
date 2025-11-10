import React, { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Importa o nosso axios configurado
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Item, fetchItems, addItem, deleteItem, toggleItemPurchase } from '../store/shoppingListSlice';

// Tipagem de estado para o novo item
interface NewItem {
  name: string;
  quantity: number;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.shoppingList.items);
  const loading = useAppSelector((state) => state.shoppingList.loading);
  const error = useAppSelector((state) => state.shoppingList.error);

  const [newItem, setNewItem] = useState<NewItem>({ name: '', quantity: 1 });
  const [localError, setLocalError] = useState<string | null>(null);

  const username = localStorage.getItem('username') || 'usuário';

  // Efeito para buscar a lista de compras quando o componente é montado
  useEffect(() => {
    // A chamada dispatch(fetchItems()) usa o api.ts configurado.
    dispatch(fetchItems());
  }, [dispatch]);

  // Função para adicionar novo item
  const handleAddItem = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!newItem.name.trim() || newItem.quantity <= 0) {
      setLocalError('Nome do item e quantidade válida são obrigatórios.');
      return;
    }

    try {
      await dispatch(addItem(newItem)).unwrap();
      setNewItem({ name: '', quantity: 1 }); // Limpa o formulário
    } catch (err) {
      // O erro vindo do Redux já deve ter a mensagem da API
      setLocalError(`Erro ao adicionar item: ${err.message || 'Verifique o Terminal 1.'}`);
    }
  };

  // Função para lidar com exclusão
  const handleDeleteItem = (id: string) => {
    dispatch(deleteItem(id));
  };

  // Função para lidar com compra (toggle)
  const handleTogglePurchase = (item: Item) => {
    dispatch(toggleItemPurchase({ id: item._id, purchased: !item.purchased }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-400">Lista de Compras</h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg text-gray-400">{username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Seção Adicionar Novo Item */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Adicionar Novo Item</h2>
          <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Nome do Item (Ex: Leite, Pão)"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="flex-grow p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
              className="w-full sm:w-20 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
              disabled={loading}
            >
              {loading ? 'Adicionando...' : 'Adicionar'}
            </button>
          </form>
          {(error || localError) && (
            <p className="mt-4 text-red-400 text-center font-medium">
              Erro de conexão com o Backend. O servidor Node (Terminal 1) está ligado?
              <br />
              Detalhe: {localError || error}
            </p>
          )}
        </div>

        {/* Seção Itens na Lista */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Itens na Lista ({items.length})</h2>

          {loading && <p className="text-center text-lg text-blue-400">Carregando lista...</p>}

          {!loading && items.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">A lista está vazia. Adicione um item!</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item._id}
                  className={`flex justify-between items-center p-4 rounded-lg shadow-md transition duration-300 ${
                    item.purchased ? 'bg-green-900 border-l-4 border-green-500 opacity-70' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex-grow cursor-pointer" onClick={() => handleTogglePurchase(item)}>
                    <p className={`text-xl font-medium ${item.purchased ? 'line-through text-gray-300' : 'text-white'}`}>
                      {item.name}
                    </p>
                    <p className={`text-sm ${item.purchased ? 'text-gray-400' : 'text-gray-400'}`}>
                      Quantidade: {item.quantity}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleTogglePurchase(item)}
                      className={`font-semibold py-1 px-3 rounded-full text-sm transition duration-300 ${
                        item.purchased
                          ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {item.purchased ? 'Desmarcar' : 'Comprar'}
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold w-8 h-8 flex items-center justify-center rounded-full transition duration-300"
                      aria-label="Deletar item"
                    >
                      &times;
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
