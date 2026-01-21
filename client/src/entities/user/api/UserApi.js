import axiosInstance from "../../../shared/lib/axiosInstance";

const API_AUTH_URL = "/api/auth";

export default class UserApi {
  static async signup(userData) {
    const res = await axiosInstance.post(API_AUTH_URL + "/signup", userData);
    return res;
  }

  static async login(userData) {
    const res = await axiosInstance.post(API_AUTH_URL + "/login", userData);
    return res;
  }

  static async logout() {
    const res = await axiosInstance(API_AUTH_URL + "/logout");
    return res;
  }
}
