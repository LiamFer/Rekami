import { FullAnime } from "./FullAnime";

export type LibraryMediaItem = {
  id: number;
  mediaid: number;
  mediatype: string;
  status: string;
  favorite: boolean;
  interested: string;
  _doc: FullAnime
};
