/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import IntuitiveButton from '../../common-components/IntuitiveButton';

function BiodataForm({ handleSubmit, formInputDetails, handleChange }) {
   const [dateType, setDateType] = useState("text");
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {formInputDetails.map((detail) => {
            const { name, id, label, isSelectInput, options, defaultValue } = detail;
            return (
              <div key={id} className="col-span-1">
                {isSelectInput ? (
                  <>
                    <TextField
                      required
                      fullWidth
                      defaultValue={options[0].value}
                      onChange={handleChange}
                      select
                      options={options}
                      label={label}
                      name={name}
                      id={name}
                      type="text"
                      variant="outlined"
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  </>
                ) : (
                  <>
                    <TextField
                      required
                      fullWidth
                      defaultValue={defaultValue}
                      onChange={handleChange}
                      label={label}
                      name={name}
                      id={name}
                      type="text"
                      variant="outlined"
                    />
                  </>
                ) }
              </div>
            );
          })}
          <input
            name="registration"
            placeholder="date of registration"
            type={dateType}
            onFocus={() => setDateType("date")}
            onBlur={() => setDateType("text")}
            id="registration"
            max={new Date().toISOString().substring(0, 10)}
            onChange={handleChange}
            required
            className="p-3 py-4 border border-solid border-['#666666']"
          />        
          </div>
        <div className="flex mt-6 flex-1 flex-row justify-end">
          <div className="w-1/4">
            <IntuitiveButton text="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default BiodataForm;
