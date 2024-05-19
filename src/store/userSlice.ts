import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from 'src/services/authApi';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: any) => {
    try {
      const res = await authApi.login(user);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

interface UserState {
  user: any;
}

const initialState: UserState = {
  user: {
    accessToken: {
      token: 'hello',
    },
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      console.log('logout', initialState);
      state.user = initialState.user;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {});
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.user = action.payload || initialState.user;
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

//reducers
const userReducer = userSlice.reducer;
export default userReducer;

//action
export const { logoutUser } = userSlice.actions;
