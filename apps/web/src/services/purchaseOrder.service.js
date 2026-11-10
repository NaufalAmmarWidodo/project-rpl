import api from "./api";

export const purchaseOrderService = {
  async getAll(params = {}) {
    const response = await api.get("/purchase-orders", { params });
    return response.data;
  },

  async create(poData) {
    const response = await api.post("/purchase-orders", poData);
    return response.data;
  },

  async ship(id, trackingData) {
    const response = await api.patch(`/purchase-orders/${id}/ship`, trackingData);
    return response.data;
  },

  async receive(id) {
    const response = await api.patch(`/purchase-orders/${id}/receive`);
    return response.data;
  },
};

export default purchaseOrderService;
