import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountMenu from './AccountMenu';
import AANU_OLU_HOSPITAL_LOGO from '../assets/logo/aanu_olu_hospital_logo.jpg'
// import BackButton from './BackButton';

function Nav() {
  return (
    <div>
      <AppBar position="sticky" style={{ background: 'rgb(34 197 94)' }}>
        <Toolbar>
          {/* <BackButton /> */}
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
    </div>
  );
}

export default Nav;
