export const environment = {
  production: window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1',
  apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://127.0.0.1:8000/api'
    : 'https://projeto-telaprodutos-laravel.onrender.com/api'
};