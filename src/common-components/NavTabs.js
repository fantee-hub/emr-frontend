/* eslint-disable react/prop-types */
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from '@mui/material/Link';

function LinkTab(props) {
  return (
    <Tab
      style={{ marginRight: 10 }}
      component={Link}
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function NavTabs({ tabs, currentTab, handleTabChange }) {
  return (
    <Tabs value={currentTab} onChange={handleTabChange} aria-label="nav tabs">
      {tabs.map((tab) => {
        return <LinkTab key={tab.index} label={tab.label} />;
      })}
    </Tabs>
  );
}
