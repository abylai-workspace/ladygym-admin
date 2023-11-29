import fetchClient from "./axiosInstance";

export default class ClientService {
  static async getAllClients() {
    return fetchClient.get<any>("/user/all").then((res) => res?.data);
  }

  static async createClient(body) {
    return fetchClient.post("/user/create", body);
  }

  static async getAllPersonals() {
    return fetchClient.get("/user/personal").then((res) => res.data);
  }

  static async getCountVisits() {
    return fetchClient.get("/subscriptions/manage/all").then((res) => res.data);
  }

  static async getUserTasks() {
    return fetchClient.get("/user/personal").then((res) => res.data);
  }

  static async getMyTasks() {
    return fetchClient.get("/tasks/my").then((res) => res.data);
  }

  static async getAdminTasks() {
    return fetchClient.get("/tasks/admins").then((res) => res.data);
  }

  static async getTrainersTasks() {
    return fetchClient.get("/tasks/trainers").then((res) => res.data);
  }

  static async createPersonal(data) {
    return fetchClient.post("/user/create", data);
  }

  static async editPersonal(id: string, data) {
    return fetchClient.post(`/user/edit/${id}`, data);
  }

  static async deletePersonal(id: string) {
    return fetchClient.delete(`/user/delete/${id}`);
  }
}
