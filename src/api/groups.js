import api from "./client";

export const createGroup = async ({ name, description, members }) => {
  const res = await api.post(`/api/groups`, { name, description, members });
  return res.data?.data?.group;
};

export const getGroups = async () => {
  const res = await api.get(`/api/groups`);
  return res.data?.data?.groups || [];
};

export const getGroupById = async (groupId) => {
  const res = await api.get(`/api/groups/${groupId}`);
  return res.data?.data?.group;
};

export const updateGroup = async (groupId, payload) => {
  const res = await api.put(`/api/groups/${groupId}`, payload);
  return res.data?.data?.group;
};

export const addMembers = async (groupId, members) => {
  const res = await api.post(`/api/groups/${groupId}/members`, { members });
  return res.data?.data?.group;
};

export const removeMember = async (groupId, memberId) => {
  const res = await api.delete(`/api/groups/${groupId}/members/${memberId}`);
  return res.data?.data?.group;
};

export const leaveGroup = async (groupId) => {
  const res = await api.delete(`/api/groups/${groupId}/leave`);
  return res.data;
};


