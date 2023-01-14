/* eslint-disable no-unused-vars */
import * as React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import { ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaHospitalUser, FaUserNurse, FaDiagnoses } from 'react-icons/fa';
import { RiAdminLine } from 'react-icons/ri';
import { MdOutlineInventory, MdSick } from 'react-icons/md';
import AANU_OLU_HOSPITAL_LOGO from '../../assets/logo/aanu_olu_hospital_logo.jpg';

//admin routes
// import WorkerLoginDetails from '../pages/WorkerLoginDetails';
// import AdminLoginDetails from '../pages/AdminLoginDetails';
// import Inventory from '../pages/Inventory';
// import PatientsBiodata from '../pages/PatientsBiodata';
// import PatientDetails from '../pages/Patients';
// import Symptoms from '../pages/Symptoms';
// import Diagnosis from '../pages/Diagnosis';
import AccountMenu from '../../common-components/AccountMenu';
import { useCurrentUser } from '../../utils/hooks';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);

export default function AdminLayout() {
  const user = useCurrentUser();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let navigate = useNavigate();

  const handleDrawer = () => {
    setOpen(!open);
  };
  const handleNavigation = (index) => {
    if (index === 0) {
      navigate('/admin/worker-login');
    }
    if (index === 1) {
      navigate(`/admin/admin-login`);
    }
    if (index === 2) {
      navigate(`/admin/inventory`);
    }
    if (index === 3) {
      navigate(`/admin/patients-biodata`);
    }
    if (index === 4) {
      navigate(`/admin/symptoms`);
    }
    if (index === 5) {
      navigate(`/admin/diagnosis`);
    }
  };

  const navLinks = {
    0: '/admin/worker-login',
    1: `/admin/admin-login`,
    2: `/admin/inventory`,
    3: `/admin/patients-biodata`,
    4: `/admin/symptoms`,
    5: `/admin/diagnosis`
  };
  const navItems = [
    'Worker Login',
    'Admin Login',
    'Inventory',
    'Patients Bio-Data',
    'Symptoms',
    'Diagnosis'
  ];
  const navIcons = {
    0: <FaUserNurse />,
    1: <RiAdminLine />,
    2: <MdOutlineInventory />,
    3: <FaHospitalUser />,
    4: <MdSick />,
    5: <FaDiagnoses />
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ background: 'rgb(34 197 94)' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <div className="w-10 h-10 lg:w-10 lg:h-10 flex-1">
            <img
              src={AANU_OLU_HOSPITAL_LOGO}
              alt="aanu-olu hospital logo"
              width="auto"
              height="100%"
            />
          </div>
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((text, index) => (
            <ListItem
              key={text}
              component={NavLink}
              to={navLinks[index]}
              style={({ isActive }) => ({ backgroundColor: isActive ? '#dddee1' : '' })}
              disablePadding
              sx={{ display: 'block', color: 'inherit' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  width: 25,
                  height: 25
                }}
              // onClick={() => handleNavigation(index)}
              >
                <ListItemIcon
                  className={
                    (open ? 'mr-3' : 'auto') + ' justify-center min-w-0 text-green-500 text-2xl'
                  }
                >
                  {navIcons[index]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div className="mb-3">
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ mt: -1, mr: 2, justifySelf: 'end' }}
            >
              <span className="font-semibold">Admin</span> {user.data.fullName}
            </Typography>
          </Box>
        </div>
        <div>
          <Outlet />
        </div>
        {/* <Routes>
          <Route path="/worker-login" element={<WorkerLoginDetails />} />
          <Route path="/admin-login" element={<AdminLoginDetails />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/patients-biodata" element={<PatientsBiodata />} />
          <Route path="/patients-biodata/:id/:name" element={<PatientDetails />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
        </Routes> */}
      </Box>
    </Box>
  );
}
