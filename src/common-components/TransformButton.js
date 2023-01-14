/* eslint-disable react/prop-types */
import React from 'react';
import { Grow, Chip, CircularProgress, Box } from '@mui/material';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function TransformButton({ btnText, name, id, isSuccessful, isLoading }) {
  // state for changing button color when payment is approved

  return (
    <div>
      {!isSuccessful ? (
        <Box sx={{ position: 'relative' }}>
          <Button
            name={name}
            id={id}
            type="submit"
            disabled={isLoading}
            variant="contained"
            className="w-full p-3 mt-1 bg-green-500 text-[#000] ml-3"
          >
            {btnText}
          </Button>
          {isLoading && (
            <CircularProgress
              color="success"
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                zIndex: 1,
                marginTop: '-12px',
                marginLeft: '-12px'
              }}
            />
          )}
        </Box>
      ) : (
        <>
          <Grow in={isSuccessful}>
            <div className="flex flex-col">
              <Chip label="added successfully" icon={<CheckCircleIcon />} color="success" />
            </div>
          </Grow>
        </>
      )}
    </div>
  );
}

export default TransformButton;
