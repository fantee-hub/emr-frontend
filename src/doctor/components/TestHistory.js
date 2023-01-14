/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Biotech, Circle } from '@mui/icons-material';
import { Divider, Grid, CircularProgress } from '@material-ui/core';
import React from 'react';

function TestHistory({ tests, isLoading }) {
  const { LabTests, createdAt } = tests;
  const date = !tests ? 'N/A' : new Date(createdAt).toDateString();
  const sessionStatus = !tests ? 'N/A' : status;

  return (
    <div className="p-10">
      <div className="flex flex-row items-center">
        <Biotech sx={{ mr: 1 }} />
        <p className="text-xl font-bold text-wider">Lab Tests</p>
      </div>
      <p className="font-semibold"> Date: {date}</p>
      <p className="font-semibold">Status: {sessionStatus}</p>
      <div className="grid-header">
        <Grid container spacing={2} style={{ fontWeight: 'bold' }}>
          <Grid item xs={2}>
            Title
          </Grid>
          <Grid item xs={2}>
            Description
          </Grid>
          <Grid item xs={2}>
            Result
          </Grid>
          <Grid item xs={4}>
            Result description
          </Grid>
          <Grid item xs={2} style={{ color: '#808080' }}>
            Prescribed By
          </Grid>
        </Grid>
        <Divider variant="fullWidth" orientation="horizontal" />
      </div>
      <div className="grid-body">
        {isLoading ? (
          <CircularProgress size={30} />
        ) : LabTests && !LabTests.length ? (
          <p className="text-xl font-bold pl-3 mb-3 text-red-500">
            There are no tests for this session
          </p>
        ) : (
          LabTests &&
          LabTests.map((item, index) => {
            const { title, description, result, resultDescription, doctor } = item;
            return (
              <>
                <Grid key={index} container spacing={2} style={{ padding: 8 }}>
                  <Grid item xs={2}>
                    <div className="flex flex-row items-center">
                      <Circle sx={{ color: 'rgb(34 197 94)', fontSize: '12px', mr: 1 }} />
                      {title}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    {description}
                  </Grid>
                  <Grid item xs={2}>
                    {result}
                  </Grid>
                  <Grid item xs={4}>
                    {resultDescription}
                  </Grid>
                  <Grid item xs={2} style={{ color: '#808080' }}>
                    {doctor.fullName}
                  </Grid>
                </Grid>
                {index !== LabTests.length - 1 ? (
                  <Divider variant="fullWidth" orientation="horizontal" />
                ) : null}
              </>
            );
          })
        )}
      </div>
      <div className=" mt-10 mb-10 w-full border-4 border-solid border-green-500"></div>
    </div>
  );
}

export default TestHistory;
