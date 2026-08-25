import axios from "axios";

// "localhost" ne fonctionne que depuis le PC lui-même : sur un téléphone
// connecté au même Wi-Fi, "localhost" désigne le téléphone, pas le PC qui
// héberge le backend. On reconstruit donc l'adresse à partir de l'hôte
// utilisé pour charger la page (IP locale, domaine, etc.), sauf si
// VITE_API_URL est explicitement défini (ex: en production).
const baseURL =
  import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:5000/api`;

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("uniwe_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
