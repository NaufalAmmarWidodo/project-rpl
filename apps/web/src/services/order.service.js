import api from "./api";

export const orderService = {
  async getAll(params = {}) {
    const response = await api.get("/orders", { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async create(orderData) {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  async updateStatus(id, statusData) {
    const response = await api.patch(`/orders/${id}/status`, statusData);
    return response.data;
  },
};

export default orderService;
