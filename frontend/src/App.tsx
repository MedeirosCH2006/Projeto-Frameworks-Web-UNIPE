import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
// O ProtectedRoute foi removido para evitar o erro de <Router> aninhado e dependências ausentes.

function App() {
  return (
    <Routes>
      {/* Rota raiz redireciona para Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Rota de Login */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* CRÍTICO: Rota Home agora é acessível diretamente (O Login/Token fará a proteção) */}
      <Route path="/home" element={<HomePage />} />

      {/* Rota 404 agora redireciona para o Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
