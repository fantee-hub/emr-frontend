import { createSlice } from '@reduxjs/toolkit';
const isPermitted = JSON.parse(localStorage.getItem('isAdminLoginPermitted'));

const initialState = {
  isPermitted: isPermitted ? isPermitted : false
};

export const adminPermissionSlice = createSlice({
  name: 'adminLoginPermission',
  initialState,
  reducers: {
    allowed: (state) => {
      state.isPermitted = true;
    },
    notAllowed: (state) => {
      state.isPermitted = false;
    }
  }
});

export default adminPermissionSlice.reducer;
export const { allowed, notAllowed } = adminPermissionSlice.actions;
