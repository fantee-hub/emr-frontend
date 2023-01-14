import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import adminLoginPermissionReducer from './features/others/admin/adminPermissionSlice';
import prescriptionSlice from './features/others/prescriptionSlice';

const customizedMiddleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false
});
export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminLoginPermission: adminLoginPermissionReducer,
    prescription: prescriptionSlice,
    middleware: customizedMiddleware
  }
});
