/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { InputAdornment } from '@material-ui/core';

function PatientSearchBar({ setSearchQuery, label }) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event) => {
    if (!event.target.value) {
      setSearchQuery('');
    } else {
      setSearchValue(event.target.value);
    }
  };
  return (
    <div>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          id="search-bar"
          className="text"
          onChange={handleChange}
          label={label}
          variant="outlined"
          placeholder="Search..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchQuery(searchValue)}>
                  <SearchIcon style={{ fill: '#1769aa' }} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {/* <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: 'blue' }} />
        </IconButton> */}
      </Box>
    </div>
  );
}

export default PatientSearchBar;
