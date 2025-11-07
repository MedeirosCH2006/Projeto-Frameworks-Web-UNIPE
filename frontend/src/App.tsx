// App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import store from './store/index'; 
import LoginComponent from './components/LoginComponent'; 
import ItemListComponent from './components/ItemListComponent'; 


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>Projeto Frameworks Web UNIPÊ</h1>
          <Routes>
            <Route path="/login" element={<LoginComponent />} /> 
            <Route path="/" element={<ItemListComponent />} /> 
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
