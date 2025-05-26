import axios from "axios";
import { serverApi } from "../Api/server";
import { interestValue } from "../Types/interestValue";
import { MediaType } from "../Types/mediaType";
import { getAnimeFull } from "./jikan.service";
import { interestObject } from "../Types/interestObject";
import MediaStatus from "../Types/mediaStatus";
import { libraryObject } from "../Types/libraryObject";

export async function saveInterest(
  value: interestValue,
  mediaId: string | number | undefined,
  mediaType: MediaType
) {
  try {
    await saveMediaMongo(mediaId!);
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

export async function editInterest(
  value: interestValue,
  interestID: string | number | undefined
) {
  try {
    const response = await serverApi.patch(`/interest/${interestID}`, {
      value,
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

export async function removeInterest(interestID: string | number | undefined) {
  try {
    const response = await serverApi.delete(`/interest/${interestID}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Unknown Error";
      return { success: false, error: message };
    }

    return { success: false, error: "Unexpected Error." };
  }
}

export async function getInterest(mediaId: string | number) {
  try {
    const response: interestObject = await serverApi
      .get(`/interest/${mediaId}`)
      .then((res) => res.data);
    return { success: true, data: response };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Unknown Error";
      return { success: false, error: message };
    }
    return { success: false, error: "Unexpected Error." };
  }
}

export async function saveMediaMongo(mediaId: string | number) {
  try {
    const media = await getAnimeFull(mediaId);
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

export async function getMediaFromLibrary(mediaId: string | number) {
  try {
    const response: libraryObject = await serverApi
      .get(`/media/library/${mediaId}`)
      .then((res) => res.data);
    return { success: true, data: response };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Unknown Error";
      return { success: false, error: message };
    }
    return { success: false, error: "Unexpected Error." };
  }
}

export async function saveInLibrary(
  mediaId: string | number | undefined,
  status: MediaStatus,
  mediaType: MediaType,
  favorite: boolean
) {
  try {
    const response = await serverApi.post(`/media/library`, {
      mediaId,
      status,
      mediaType,
      favorite,
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
