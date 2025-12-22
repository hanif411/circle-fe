import type { QueryParams } from "@/types/types";
import api from "../api";

export async function getRepliesByThreadId(queryparams: QueryParams) {
  try {
    const response = await api.get("/reply", { params: queryparams });
    console.log(response.data);

    return response.data.data.replies;
  } catch (error) {
    console.error(error);
  }
}

export async function postReply(queryparams: QueryParams, formdata: FormData) {
  try {
    const response = await api.post("/reply", {
      params: queryparams,
      data: formdata,
    });
    console.log(response.data);

    return response.data.data.replies;
  } catch (error) {
    console.error(error);
  }
}
