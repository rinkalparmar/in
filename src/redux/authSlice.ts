import { createSlice } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  mobile: string;
  gender: string;
  city: string;
  hobbies: string[];
  password: string;
  role: string;
}

const existingUser = JSON.parse(localStorage.getItem("users1") || "[]");

const initialState = {
  users: existingUser,
  isAuthenticated: false,
  error: null as string | null,
  isSignup: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;

      const findUser = state.users.find(
        (u: User) => u.email === email && u.password === password,
      );

      if (!findUser) {
        state.error = "Wrong email or password";
      } else {
        ((state.isAuthenticated = true),
          (state.error = null),
          localStorage.setItem("currentUser1", JSON.stringify(findUser)));
      }
    },
    signup: (state, action) => {
      const newUser = {
        id: state.users.length ? state.users.length + 1 : 1,
        ...action.payload,
      };

      const alreadyEmail = state.users.find(
        (u: User) => u.email === newUser.email,
      );

      if (alreadyEmail) {
        state.error = "Email already exist";
      } else {
        state.users.push(newUser);
        state.error = null;
        localStorage.setItem("users1", JSON.stringify(state.users));
        state.isSignup = true;
      }
    },
  },
});

export const { login, signup } = authSlice.actions;
export default authSlice.reducer;
