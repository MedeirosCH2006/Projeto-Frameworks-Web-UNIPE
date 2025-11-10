import React from 'react';

// Componente de Spinner de Carregamento simples
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div 
        className="w-10 h-10 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
        style={{ borderTopColor: 'transparent' }}
      ></div>
      <p className="ml-3 text-lg text-blue-400">Carregando...</p>
    </div>
  );
};

export default LoadingSpinner;
