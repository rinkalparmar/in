import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const myUsers = JSON.parse(localStorage.getItem("myUsers1") || "[]");

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  mobile: string;
  gender: string;
}

const initialState = {
  error: null as string | null,
  myUsers: myUsers,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action) => {
      const newUser = {
        id: state.myUsers.length ? state.myUsers.length + 1 : 1,
        ...action.payload,
      };

      const alreadyEmail = state.myUsers.find(
        (u: any) => u.email === newUser.email,
      );

      if (alreadyEmail) {
        state.error = "Email already exist";
      } else {
        state.myUsers.push(newUser);
        state.error = null;
        localStorage.setItem("myUsers1", JSON.stringify(state.myUsers));
      }
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      if (id) {
        state.myUsers = state.myUsers.filter((u: any) => u.id !== id);

        localStorage.setItem("myUsers1", JSON.stringify(state.myUsers));
      }
    },
    getUsers: (state) => {
      state.myUsers = myUsers;
    },

    updateUser: (state, action: PayloadAction<User>) => {
      state.myUsers = state.myUsers.map((u: User) =>
        u.id === action.payload.id ? action.payload : u,
      );
      localStorage.setItem("myUsers1", JSON.stringify(state.myUsers));
    },
  },
});

export const { createUser, deleteUser, getUsers, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
