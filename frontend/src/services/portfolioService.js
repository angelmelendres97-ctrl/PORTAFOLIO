import api from './apiClient';

export const fetchProjects = async () => {
  const { data } = await api.get('/projects');
  return data;
};

export const fetchSiteConfig = async () => {
  const { data } = await api.get('/config');
  return data;
};

export const submitChatMessage = async (payload) => {
  const { data } = await api.post('/chat', payload);
  return data;
};

export const adminFetchMessages = async () => {
  const { data } = await api.get('/chat');
  return data;
};

export const adminUpsertConfig = async (payload) => {
  const { data } = await api.put('/config', payload);
  return data;
};

export const adminCreateProject = async (payload) => {
  const { data } = await api.post('/projects', payload);
  return data;
};

export const adminUpdateProject = async (id, payload) => {
  const { data } = await api.put(`/projects/${id}`, payload);
  return data;
};

export const adminDeleteProject = async (id) => {
  await api.delete(`/projects/${id}`);
};
