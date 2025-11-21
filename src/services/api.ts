import axios from "axios";

export interface LoginType {
  email: string;
  password: string;
}
export interface RegisterType extends LoginType {
  full_name: string;
}

export interface QueryParams {
  thread_id: number;
}

export interface LikeType {
  tweet_id: number;
}

const token = localStorage.getItem("token");

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

export async function getThreadById(id: number) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/thread/${id}`
    );
    console.log(response.data.data);

    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    throw new Error("gagal get threads");
  }
}

export async function getAllThreads() {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/thread");
    if (response.status === 200) {
      console.log(response.data.data.threads);
      return response.data.data.threads;
    }
  } catch (error) {
    throw new Error("gagal get threads");
  }
}

export async function postThread(formdata: FormData) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/thread",
      data: formdata,
      withCredentials: true,
      headers: {
        token,
      },
    });
    console.log(response.data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getRepliesByThreadId(queryparams: QueryParams) {
  const params = queryparams;
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/api/v1/reply",
      params,
    });
    console.log(response.data);

    return response.data.data.replies;
  } catch (error) {
    console.error(error);
  }
}

export async function postReply(queryparams: QueryParams, formdata: FormData) {
  const params = queryparams;
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/reply",
      params,
      data: formdata,
      withCredentials: true,
      headers: {
        token,
      },
    });
    console.log(response.data);

    return response.data.data.replies;
  } catch (error) {
    console.error(error);
  }
}

export async function like(data: LikeType) {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/like",
      data: data,
      withCredentials: true,
      headers: {
        token,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {}
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
