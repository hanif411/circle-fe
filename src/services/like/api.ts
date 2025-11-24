import type { LikeType } from "@/types/types";
import axios from "axios";


export async function like(data: LikeType) {
  const token = localStorage.getItem("token");
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
