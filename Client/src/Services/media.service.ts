import axios from "axios";
import { serverApi } from "../Api/server";
import { interestValue } from "../Types/interestValue";
import { mediaType } from "../Types/mediaType";
import { getAnimeFull } from "./jikan.service";

export async function saveInterest(
  value: interestValue,
  mediaId: string | number | undefined,
  mediaType: mediaType
) {
  try {
    await saveMediaMongo(mediaId!)
    const response = await serverApi.post(`/interest/add`, {
      mediaId,
      value,
      mediaType,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Unknown Error";
      return { success: false, error: message };
    }

    return { success: false, error: "Unexpected Error." };
  }
}

export async function saveMediaMongo(mediaId: string | number,
) {
  try {
    const media = await getAnimeFull(mediaId) 
    const response = await serverApi.post(`/media/add`, {
      data: media,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Unknown Error";
      return { success: false, error: message };
    }

    return { success: false, error: "Unexpected Error." };
  }
}
