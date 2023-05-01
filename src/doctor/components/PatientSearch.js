/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { InputAdornment } from '@material-ui/core';
import { getAllPatients } from '../../utils/api';
import { Link } from 'react-router-dom';

function PatientSearchBar({ setSearchQuery, label }) {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (event) => {
    const searchWord = event.target.value;
    setSearchValue(searchWord);

    if (!searchValue) {
      setFilteredData([]);
    } else {
      const filteredItems = suggestions.filter((item) => {
        return Object.values(item).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchWord.toLowerCase());
          }
          return false;
        });
      });
      setFilteredData(filteredItems);
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    setSearchQuery(searchValue);
  };
  const patientSearch = async () => {
    const { data } = await getAllPatients();
    if (data) {
      setSuggestions(data.data);
    }
  };
  useEffect(() => {
    patientSearch();
  }, []);

  console.log(filteredData);

  return (
    <div>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={submitForm}>
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
        {filteredData.length !== 0 && searchValue && (
          <div className="data-result bg-[#F6F7FA] mt-[5px] shadow-lg shadow-[rgba(0,0,0,0.35) 0px  5px 15px] h-[200px] overflow-hidden overflow-y-auto">
            {filteredData.map((value, key) => (
              <div
                className="w-full h-[50px] flex items-center hover:bg-[lightgrey] cursor-pointer"
                key={key}>
                <Link to={`/history/patient/${value.PID.split('/').join(' ')}`}>
                  <p className="ml-[10px] ">{value.name}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
        {/* <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: 'blue' }} />
        </IconButton> */}
      </Box>
    </div>
  );
}

export default PatientSearchBar;
