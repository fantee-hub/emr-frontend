import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';

import { login, reset } from '../redux/features/auth/authSlice';
import {
  ADMIN_USER_ROLE,
  DOCTOR_USER_ROLE,
  LAB_USER_ROLE,
  PHARMACIST_USER_ROLE,
  RECEPTIONIST_USER_ROLE,
  XRAY_USER_ROLE,
  CASHIER_USER_ROLE
} from '../utils/constants';
import useForm from '../utils/formValidations/useForm';
import IntuitiveButton from '../common-components/IntuitiveButton';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isError, message } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  // const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const handleRoleBasedRouting = (user) => {
    if (user) {
      const userRole = user?.data?.role;
      switch (userRole) {
        case ADMIN_USER_ROLE:
          navigate(`/admin`);
          break;
        case RECEPTIONIST_USER_ROLE:
          navigate(`/receptionist`);
          break;
        case DOCTOR_USER_ROLE:
          navigate(`/doctor`);
          break;
        case LAB_USER_ROLE:
          navigate(`/lab`);
          break;
        case XRAY_USER_ROLE:
          navigate(`/xray`);
          break;
        case PHARMACIST_USER_ROLE:
          navigate(`/pharmacist`);
          break;
        case CASHIER_USER_ROLE:
          navigate(`/cashier`);
          break;
      }
      dispatch(reset());
      navigate(0);
    }
  };

  const handleLogin = () => {
    setIsLoading(true);
    const loginData = { username, password };
    dispatch(login(loginData));
    // TODO change if/else to try/catch and see if loading will work with intuitive button
    try {
      setIsLoading(false);
      handleRoleBasedRouting(user);
    } catch (error) {
      console.log(error);
    }
  };
  const { handleChange, values, errors, handleSubmit } = useForm(handleLogin);

  const { username, password } = values;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isError, message, user, isSuccess, dispatch]);

  useEffect(() => {
    handleRoleBasedRouting(user);
  }, [user]);

  return (
    !user && (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-3/5">
          <div className="flex flex-row items-center space-x-2 mb-2">
            <LoginIcon />
            <h1>Login</h1>
          </div>
          <Box
            fullWidth
            onSubmit={handleSubmit}
            component="form"
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <TextField
              fullWidth
              id="filled-username"
              label="Username"
              name="username"
              onChange={handleChange}
              error={errors.username ? true : false}
              helperText={errors.username}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              id="filled-password"
              label="Password"
              name="password"
              onChange={handleChange}
              error={errors.password ? true : false}
              helperText={errors.password}
              sx={{ mb: 2 }}
            />
            <Box fullWidth>
              <IntuitiveButton text="Login" isLoading={isLoading} />
            </Box>
          </Box>
        </div>
      </div>
    )
  );
  // return user && user.role === ADMIN_USER_ROLE ? (
  //   <Navigate to={`/admin//*`} />
  // ) : user ? (
  //   <Navigate to={`/${loggedInUser.user.role.toLowerCase()}`} />
  // ) : (
  // <div className="flex flex-col items-center justify-center h-screen">
  //   <div className="w-3/5">
  //     <h1 className="mb-3">Login</h1>
  //     <Box
  //       fullWidth
  //       onSubmit={handleSubmit}
  //       component="form"
  //       sx={{ display: 'flex', flexDirection: 'column' }}>
  //       <TextField
  //         fullWidth
  //         id="filled-username"
  //         label="Username"
  //         name="username"
  //         onChange={handleChange}
  //         error={errors.username ? true : false}
  //         helperText={errors.username}
  //         sx={{ mb: 2 }}
  //       />
  //       <TextField
  //         fullWidth
  //         id="filled-password"
  //         label="Password"
  //         name="password"
  //         onChange={handleChange}
  //         error={errors.password ? true : false}
  //         helperText={errors.password}
  //         sx={{ mb: 2 }}
  //       />
  //       <Box sx={{ position: 'relative' }} fullWidth>
  //         <Button
  //           disabled={isLoading}
  //           variant="contained"
  //           type="submit"
  //           className="p-3 w-full mt-1 bg-green-500 text-[#000]">
  //           Login
  //         </Button>
  //         {isLoading && (
  //           <CircularProgress
  //             color="success"
  //             size={24}
  //             sx={{
  //               position: 'absolute',
  //               top: '50%',
  //               left: '50%',
  //               zIndex: 1,
  //               marginTop: '-12px',
  //               marginLeft: '-12px'
  //             }}
  //           />
  //         )}
  //       </Box>
  //     </Box>
  //   </div>
  // </div>
  // );

  // if (userRole === ADMIN_USER_ROLE) {
  //   navigate(`/admin//*`);
  // } else if (userRole === RECEPTIONIST_USER_ROLE) {
  //   navigate(`/receptionist`);
  // } else if (userRole === DOCTOR_USER_ROLE) {
  //   navigate(`/doctor`);
  // } else if (userRole === LAB_USER_ROLE) {
  //   navigate(`/lab`);
  // } else if (userRole === XRAY_USER_ROLE) {
  //   navigate(`/xray`);
  // } else if (userRole === PHARMACIST_USER_ROLE) {
  //   navigate(`/pharmacist`);
  // }
  // navigate(0);
}

export default Login;
