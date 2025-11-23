import type { QueryParams } from "@/types/types";
import axios from "axios";

const token = localStorage.getItem("token");

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
