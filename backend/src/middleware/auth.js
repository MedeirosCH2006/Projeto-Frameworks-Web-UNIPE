const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        // Verifica se o cabeçalho Authorization está presente
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).send({ message: 'Acesso negado. Token não fornecido.' });
        }

        // Verifica o formato "Bearer <token>"
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).send({ message: 'Formato de token inválido. Use: Bearer <token>' });
        }
        
        const token = parts[1];

        // Verifica e decodifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'chave-secreta-padrao');
        
        // CRÍTICO: Anexa o ID do usuário à requisição (usado para autorização)
        req.userId = decoded.id; 
        
        next();
    } catch (error) {
        // Trata tokens inválidos ou expirados
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({ message: 'Token inválido ou malformado.' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ message: 'Token expirado. Faça login novamente.' });
        }
        console.error('Erro no middleware de autenticação:', error);
        return res.status(500).send({ message: 'Falha na autenticação do servidor.' });
    }
};

module.exports = auth;
