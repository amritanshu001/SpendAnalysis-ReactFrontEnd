import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

const themeModeSlice = createSlice({
  name: "accent-mode",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const themeModeAction = themeModeSlice.actions;

export default themeModeSlice.reducer;
