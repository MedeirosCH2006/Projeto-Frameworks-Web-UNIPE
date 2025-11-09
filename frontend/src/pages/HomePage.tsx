import React from 'react';
// Importa o componente da lista de itens, presumindo que esta em components/ItemListComponent.tsx
import ItemListComponent from '../components/ItemListComponent'; 

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Lista de Compras (Protegida)</h1>
      <ItemListComponent />
    </div>
  );
};

export default HomePage;
