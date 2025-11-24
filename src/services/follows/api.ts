import type { FollowType } from "@/types/types";
import axios from "axios";

export async function getFollowers() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/api/v1/follows",
      withCredentials: true,
      headers: {
        token,
      },
    });
    return response.data.data.followers;
  } catch (error) {}
}

export async function getFollowings() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/api/v1/follows/following",
      withCredentials: true,
      headers: {
        token,
      },
    });
    return response.data.data.followings;
  } catch (error) {}
}

export async function followUnfollow(data: FollowType) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/follows",
      withCredentials: true,
      data,
      headers: {
        token,
      },
    });
    return response.data.data;
  } catch (error) {}
}
