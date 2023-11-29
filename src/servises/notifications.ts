import fetchClient from "./axiosInstance";

export default class NotificationService {
  static async getClientNotifications() {
    return fetchClient
      .get(`/notification/clients?page=0&size=10`)
      .then((res) => res.data);
  }

  static async getPersonalNotifications() {
    return fetchClient.get(`/notification/personal`).then((res) => res.data);
  }

  static async getReviewStats() {
    return fetchClient.get(`/trainer/review/all`).then((res) => res.data);
  }
}
