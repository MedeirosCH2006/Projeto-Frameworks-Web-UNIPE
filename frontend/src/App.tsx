// App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa a Store que criamos
import store from './store/index'; 

// Componentes Futuros (rotas)
// import LoginComponent from './components/LoginComponent';
// import ItemListComponent from './components/ItemListComponent';


// Componente principal que define as rotas
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>Projeto Frameworks Web UNIPÊ</h1>
          {/* O componente Routes gerencia qual tela será exibida */}
          <Routes>
            {/* Rota para a tela de Login (futuro) */}
            {/* <Route path="/login" element={<LoginComponent />} /> */}
            
            {/* Rota para a tela principal (futuro) */}
            {/* <Route path="/" element={<ItemListComponent />} /> */}
            
            {/* Rota temporária de teste */}
            <Route path="/" element={<h2>Página Home Temporária</h2>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
