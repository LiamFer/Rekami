import { interestValue } from "./interestValue";
import { MediaType } from "./mediaType";

export type interestObject = {
  id: number;
  mediaId: number | string;
  mediaType: MediaType;
  value: interestValue;
};
