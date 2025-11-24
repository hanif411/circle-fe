import type { LoginType, RegisterType } from "@/types/types";
import axios from "axios";

export interface Query {
  keyword: string;
}

export async function registerUser(data: RegisterType) {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/auth/register",
      data: {
        email: data.email,
        password: data.password,
        full_name: data.full_name,
      },
    });
    console.log(response.data.data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(data: LoginType) {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/auth/login",
      data,
    });
    console.log(response.data);

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 500) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getusers() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/api/v1/auth",
      withCredentials: true,
      headers: {
        token,
      },
    });
    if (response.status === 200) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    throw new Error("gagal get threads");
  }
}

export async function findUsers(queryparams: Query) {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/api/v1/auth/search",
      params: queryparams,
    });
    console.log(response.data);

    return response.data.data.users;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserById() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/api/v1/auth/user",
      withCredentials: true,
      headers: {
        token,
      },
    });
    if (response.status === 200) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    throw new Error("gagal get threads");
  }
}
