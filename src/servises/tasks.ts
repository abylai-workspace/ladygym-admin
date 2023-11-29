import fetchClient from "./axiosInstance";

export default class TaskService {
  static async createTask(id: string, data: any) {
    return fetchClient.post(`/tasks/create/${id}`, data);
  }

  static async setStatus(id: string, status: "IN_PROGRESS" | "COMPLETED") {
    return fetchClient.post(`/tasks/status/${id}?status=${status}`, {});
  }
}
