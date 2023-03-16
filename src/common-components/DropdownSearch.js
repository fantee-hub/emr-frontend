/* eslint-disable react/prop-types */
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function DropdownSearch({ btnText, menuItems, handleCheckboxChange }) {
  if (!menuItems) return;
  console.log(menuItems);
  const items = !menuItems.data
    ? menuItems.map((item) => item.name)
    : menuItems.data.map((item) => item.title);

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="checkboxes-tags"
      options={items}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            value={option}
            onChange={handleCheckboxChange}
          />
          {option}
        </li>
      )}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={btnText} placeholder="select..." />}
    />
  );
}
