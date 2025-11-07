// App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa a Store que criamos
import store from './store/index'; 

// Componentes das Rotas (CORRIGIDOS)
import LoginComponent from './components/LoginComponent'; 
import ItemListComponent from './components/ItemListComponent'; 


// Componente principal que define as rotas
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>Projeto Frameworks Web UNIPÊ</h1>
          {/* O componente Routes gerencia qual tela será exibida */}
          <Routes>
            {/* Rota para a tela de Login */}
            <Route path="/login" element={<LoginComponent />} /> 
            
            {/* Rota para a tela principal (Home) */}
            <Route path="/" element={<ItemListComponent />} /> 
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
