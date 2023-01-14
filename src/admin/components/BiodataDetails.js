import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

// eslint-disable-next-line react/prop-types
function BiodataDetails({ info }) {
  console.log(info)
  const arr = ['age', 'sex', 'genoType', 'address', 'bloodGroup', 'registration', 'occupation'];
  return (
    <List component="li" disablePadding className="grid grid-cols-2 gap-4">
      {arr.map((item, index) => {
        return (
          <ListItem key={index} className="col-span-1">
            <ListItemIcon>{<FolderSharedIcon />}</ListItemIcon>
            <ListItemText primary={item.toUpperCase()} secondary={info[item]} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default BiodataDetails;
