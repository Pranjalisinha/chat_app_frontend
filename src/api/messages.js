import api from "./client";

export const sendPrivateMessage = async ({ recipientId, content }) => {
  const res = await api.post(`/api/messages`, { recipientId, content });
  return res.data?.data?.message;
};

export const sendGroupMessage = async ({ groupId, content }) => {
  const res = await api.post(`/api/messages`, { groupId, content });
  return res.data?.data?.message;
};

export const getPrivateMessages = async (userId) => {
  const res = await api.get(`/api/messages/private/${userId}`);
  return res.data?.data?.messages || [];
};

export const getGroupMessages = async (groupId) => {
  const res = await api.get(`/api/messages/group/${groupId}`);
  return res.data?.data?.messages || [];
};


