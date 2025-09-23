import api from "./client";

export const login = async ({ email, password }) => {
  const res = await api.post("/api/users/login", { email, password });
  return res.data?.data;
};

export const register = async ({ username, email, password }) => {
  const res = await api.post("/api/users/register", { username, email, password });
  return res.data?.data;
};

export const updateProfile = async (payload) => {
  const res = await api.put("/api/users/profile", payload);
  return res.data?.data;
};

export const listUsers = async () => {
  const res = await api.get("/api/users");
  return res.data?.data?.users || [];
};


