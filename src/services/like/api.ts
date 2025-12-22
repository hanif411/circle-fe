import type { LikeType } from "@/types/types";
import api from "../api";

export async function like(data: LikeType) {
  try {
    const response = await api.post("/like", data);
    console.log(response.data);
    return response.data;
  } catch (error) {}
}
