import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

export default function useUser() {
  return useSelector((state: RootState) => state.user);
}
