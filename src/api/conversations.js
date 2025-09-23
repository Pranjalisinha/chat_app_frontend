import api from "./client";

export const getConversations = async ({ page = 1, limit = 20 } = {}) => {
  const res = await api.get(`/api/conversations`, { params: { page, limit } });
  return res.data?.data?.conversations || [];
};

export const getOrCreateConversation = async (userId) => {
  const res = await api.post(`/api/conversations/${userId}`);
  return res.data?.data?.conversation;
};

export const getConversation = async (conversationId) => {
  const res = await api.get(`/api/conversations/${conversationId}`);
  return res.data?.data?.conversation;
};

export const markAsRead = async (conversationId) => {
  const res = await api.put(`/api/conversations/${conversationId}/read`);
  return res.data;
};

export const deleteConversation = async (conversationId) => {
  const res = await api.delete(`/api/conversations/${conversationId}`);
  return res.data;
};

export const getConversationMessages = async (conversationId, { page = 1, limit = 50 } = {}) => {
  const res = await api.get(`/api/conversations/${conversationId}/messages`, { params: { page, limit } });
  return res.data?.data?.messages || [];
};


