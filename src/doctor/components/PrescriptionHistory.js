/* eslint-disable react/prop-types */
import { Divider, Grid, CircularProgress } from '@material-ui/core';
import { Circle, Healing } from '@mui/icons-material';
import React from 'react';

function PrescriptionHistory({ prescription, isLoading }) {
  const { Prescriptions, createdAt, status } = prescription;
  const date = !prescription ? 'N/A' : new Date(createdAt).toDateString();
  const sessionStatus = !prescription ? 'N/A' : status;
  return (
    <div className="p-10">
      <div className="flex flex-row items-center">
        <Healing sx={{ mr: 1 }} />
        <p className="text-xl font-bold text-wider">Prescription</p>
      </div>
      <p className="font-semibold"> Date: {date}</p>
      <p className="font-semibold">Status: {sessionStatus}</p>
      <div className="grid-header">
        <Grid container spacing={2} style={{ fontWeight: 'bold' }}>
          <Grid item xs={2}>
            Drug
          </Grid>
          <Grid item xs={2}>
            Quantity
          </Grid>
          <Grid item xs={2}>
            Days
          </Grid>
          <Grid item xs={4}>
            Note
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
        ) : Prescriptions && !Prescriptions.length ? (
          <p className="text-xl font-bold pl-3 mb-3 text-red-500">
            There are no prescriptions for this session
          </p>
        ) : (
          Prescriptions &&
          Prescriptions.map((item, index) => {
            const { quantity, note, days, drug, doctor } = item;
            return (
              <>
                <Grid key={index} container spacing={2} style={{ padding: 8 }}>
                  <Grid item xs={2}>
                    <div className="flex flex-row items-center">
                      <Circle sx={{ color: 'rgb(34 197 94)', fontSize: '12px', mr: 1 }} />
                      {drug.name}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    {quantity}
                  </Grid>
                  <Grid item xs={2}>
                    {days}
                  </Grid>
                  <Grid item xs={4}>
                    {note}
                  </Grid>
                  <Grid item xs={2} style={{ color: '#808080' }}>
                    {doctor.fullName}
                  </Grid>
                </Grid>
                {index !== Prescriptions.length - 1 ? (
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

export default PrescriptionHistory;
