import { interestValue } from "./interestValue";
import { mediaType } from "./mediaType";

export type interestObject = {
  id: number;
  mediaId: number | string;
  mediaType: mediaType;
  value: interestValue;
};
