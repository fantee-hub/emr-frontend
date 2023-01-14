/* eslint-disable react/prop-types */
import React from 'react';

import { Button, Box, CircularProgress } from '@mui/material';

export default function IntuitiveButton({ onClick, isBackgroundRed = false, text, isLoading }) {
  return (
    <div>
      <Box sx={{ position: 'relative' }}>
        <Button
          type="submit"
          onClick={onClick}
          variant="contained"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: 12,
            backgroundColor: isBackgroundRed ? '#DC143C' : 'rgb(34 197 94)',
            color: '#000'
          }}
          // className="w-full p-3 mt-1 bg-green-500 text-[#000]"
        >
          {text}
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
    </div>
  );
}
