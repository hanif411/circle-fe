import type { FollowType } from "@/types/types";
import api from "../api";

export async function getFollowers() {
  try {
    const response = await api.get("follows")
    return response.data.data.followers;
  } catch (error) {}
}

export async function getFollowings() {
  try {
    const response = await api.get("follows/following")
    return response.data.data.followings;
  } catch (error) {}
}

export async function followUnfollow(data: FollowType) {

  try {
    const response = await api.post("/follows", data)
    return response.data.data;
  } catch (error) {}
}
