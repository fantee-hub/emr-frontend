/* eslint-disable react/prop-types */
import { Box, TextField, Divider, Paper } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { FaFileCsv } from 'react-icons/fa';
import IntuitiveButton from '../../common-components/IntuitiveButton';

function InputDetailsForm({
  onSubmit,
  onChange,
  handleCsvChange,
  isLoading,
  formDetails,
  btnText,
  isDateRequired,
  errors
}) {
  const inputRef = useRef(null);
  const [dateType, setDateType] = useState("text");

  return (
    <div>
      <Box
        component={Paper}
        style={{
          marginBottom: '16px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          spacing: 2
        }}
      >
        <form onSubmit={onSubmit}>
          <div className="flex flex-row justify-center space-x-4 w-full">
            {formDetails.map((detail, key) => {
              return (
                <TextField
                  key={key}
                  name={detail.name}
                  label={detail.label}
                  variant="standard"
                  onChange={onChange}
                  ref={inputRef}
                  id={detail.id}
                  error={errors[`${detail.name}`] ? true : false}
                  helperText={errors[`${detail.name}`]}
                  sx={{ mr: 3 }}
                />
              );
            })}
            {isDateRequired ? (
              <input
                name="dob"
                placeholder="date of birth"
                type={dateType}
                onFocus={() => setDateType("date")}
                onBlur={() => setDateType("text")} 
                id="dob"
                max={new Date().toISOString().substring(0, 10)}
                onChange={onChange}
                required
                className="p-3 border-0 border-b-[1px] pb-0 text-base"
              />
            ) : null}
          </div>
          <div className="flex justify-center mt-2 mb-2">
            <div className="w-1/2">
              <IntuitiveButton text={btnText} isLoading={isLoading} />
            </div>
          </div>
        </form>
        <Divider className="mt-2 mb-2" orientation="horizontal" variant="fullWidth" />
        <form className="flex flex-row mt-2 justify-center">
          <div className="p-3 bg-green-500 hover:bg-green-600 rounded-md cursor-pointer">
            <label htmlFor="csvFile" className="cursor-pointer">
              Import a csv files <FaFileCsv className="text-[30px] mb-[-5px]" />
              <input
                type={'file'}
                id="csvFile"
                accept={'.csv'}
                onChange={handleCsvChange}
                className="hidden cursor-pointer"
              />
            </label>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default InputDetailsForm;
