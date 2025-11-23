import axios from "axios";

const token = localStorage.getItem("token");

export async function getFollowers() {
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
