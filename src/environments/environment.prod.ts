export const environment = {
  production: true,
  apiUrl: (window as any).env?.NG_APP_API_URL || 'http://127.0.0.1:8000/api'
};