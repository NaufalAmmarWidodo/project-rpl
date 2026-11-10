import api from "./api";

export const serviceRequestService = {
  async getTypes() {
    const response = await api.get("/services/types");
    return response.data;
  },

  async getTickets(params = {}) {
    const response = await api.get("/services/tickets", { params });
    return response.data;
  },

  async createTicket(ticketData) {
    const response = await api.post("/services/tickets", ticketData);
    return response.data;
  },

  async updateTicket(id, updateData) {
    const response = await api.patch(`/services/tickets/${id}`, updateData);
    return response.data;
  },
};

export default serviceRequestService;
