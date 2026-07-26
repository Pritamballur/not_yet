import axiosClient from './axiosClient';

// ---- Auth --------------------------------------------------------------
export const authApi = {
  register: (payload) => axiosClient.post('/auth/register', payload),
  login: (payload) => axiosClient.post('/auth/login', payload),
  me: () => axiosClient.get('/auth/me'),
};

// ---- Stations ------------------------------------------------------------
export const stationApi = {
  getAll: (params) => axiosClient.get('/stations', { params }),
  getOne: (id) => axiosClient.get(`/stations/${id}`),
  getZones: () => axiosClient.get('/stations/meta/zones'),
  create: (payload) => axiosClient.post('/stations', payload),
  update: (id, payload) => axiosClient.put(`/stations/${id}`, payload),
  remove: (id) => axiosClient.delete(`/stations/${id}`),
};

// ---- Readings --------------------------------------------------------------
export const readingApi = {
  getForStation: (stationId, params) => axiosClient.get(`/readings/station/${stationId}`, { params }),
  create: (payload) => axiosClient.post('/readings', payload),
  remove: (id) => axiosClient.delete(`/readings/${id}`),
};

// ---- Alerts --------------------------------------------------------------
export const alertApi = {
  getAll: (params) => axiosClient.get('/alerts', { params }),
  acknowledge: (id) => axiosClient.patch(`/alerts/${id}/acknowledge`),
};

// ---- Dashboard --------------------------------------------------------------
export const dashboardApi = {
  getStats: () => axiosClient.get('/dashboard/stats'),
};
