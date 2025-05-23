import MediaStatus from "./mediaStatus";
import { MediaType } from "./mediaType";

export type libraryObject = {
  id: number;
  mediaId: number;
  mediaType: MediaType;
  status: MediaStatus;
  favorite: boolean;
};
