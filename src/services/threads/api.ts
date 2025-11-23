import axios from "axios";
const token = localStorage.getItem("token");

export async function getThreadByUser() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/thread/user",
      {
        headers: {
          token,
        },
      }
    );
    console.log(response.data.data);

    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    throw new Error("gagal get threads");
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
