import axios from "axios";

const createNewUser = async (userData) => {
  const response = await axios.post("/api/users", userData);
  // this for open user registartion functionality
  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }
  return response.data;
};

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/admin/users", config);
  return response.data;
};

const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("/api/admin/users/" + id, config);
  return response.data;
};

const adminUserService = { getUsers, createNewUser, deleteUser };

export default adminUserService;
