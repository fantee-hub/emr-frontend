/* eslint-disable react/prop-types */
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function DropdownButton({ menuItems, onChange, choice }) {
  return (
    <div>
      <TextField
        fullWidth
        id="outlined-select-staff"
        select
        required
        name="select"
        label="select"
        value={choice}
        onChange={onChange}
      >
        {menuItems.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
