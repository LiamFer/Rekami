import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  id: string;
  name: string;
  email: string;
  picture?: string;
  token: string;
}

interface UserState {
  user: UserData | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    updateToken(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.token = action.payload;
      }
    },
    clearUser(state) {
      state.user = null;
    },
    updateUserPicture(state, action) {
      if (state.user) {
        console.log(`PICTURE IS ${JSON.stringify(action.payload)}`)
        state.user.picture = action.payload;
      }
    },
  },
});

export const { setUser, clearUser, updateToken,updateUserPicture } = userSlice.actions;
export default userSlice.reducer;
