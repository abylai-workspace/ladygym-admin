import { AxiosResponse } from "axios";
import { decode as atob, encode as btoa } from "base-64";
import fetchClient from "./axiosInstance";

export enum AuthStatus {
  UNAUTHORIZED = "UNAUTHORIZED",
}

export default class AuthService {
  static async loginInstance(username: string, password: string) {
    const credentials = `${username}:${password}`;
    const base64Credentials = btoa(credentials);
    const headers = {
      Authorization: `Basic ${base64Credentials}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch("https://ladygymapp.kz/gym/auth/login", {
        method: "POST",
        headers,
      });

      if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        return;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  }

  static async getUserInfo(): Promise<any> {
    return fetchClient.get<any>("/user/info").then((res) => {
      return res?.data;
    });
  }
}

export const loginNew = (
  username: string,
  password: string
): Promise<AxiosResponse<any>> => {
  const credentials = `${username}:${password}`;
  const base64Credentials = btoa(credentials);
  const headers = {
    Authorization: `Basic ${base64Credentials}`,
    "Content-Type": "application/json",
  };
  console.log(1123);
  return fetchClient.post<any>("/auth/login", null, { headers });
};
