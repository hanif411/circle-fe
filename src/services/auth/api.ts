import type { LoginType, RegisterType } from "@/types/types";
import api from "../api";

export interface Query {
  keyword: string;
}

export async function registerUser(data: RegisterType) {
  try {
    const response = await api.post("/auth/register", {
      email: data.email,
      password: data.password,
      full_name: data.full_name,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error("gagal get user");
  }
}

export async function loginUser(data: LoginType) {
  try {
    const response = await api.post("/auth/login", data);
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
  try {
    const response = await api.get("/auth")
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
    const response = await api.get("/auth/search", {
      params:queryparams
    })

    return response.data.data.users;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserByLogin() {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get("/auth/user")
    if (response.status === 200) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    throw new Error("gagal get threads");
  }
}

export async function getUserById(params: number) {
  try {
    const response = await api.get(`/auth/user/${params}`)
    if (response.status === 200) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    throw new Error("gagal get threads");
  }
}

export async function editUser(formdata: FormData) {
  try {
    const response = await api.put("/auth", formdata)
    console.log(response.data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}
