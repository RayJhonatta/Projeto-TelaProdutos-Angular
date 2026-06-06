const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

export const environment = {
  production: isProduction,
  apiUrl: isProduction 
    ? 'https://projeto-telaprodutos-laravel-production.up.railway.app/api' 
    : 'http://127.0.0.1:8000/api'
};