/* eslint-disable react/prop-types */
import { CircularProgress, Divider, Grid } from '@material-ui/core';
import { Circle } from '@mui/icons-material';
import { FaDiagnoses } from 'react-icons/fa';

import React, { useEffect, useState } from 'react';
import { getSessionDiagnosis } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

function DiagnosisHistory({ user, sessionId }) {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState({});

  console.log(diagnosis);
  const getDiagnosisInSession = async () => {
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getSessionDiagnosis(sessionId);
      setIsLoading(false);
      if (data) {
        setDiagnosis(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDiagnosisInSession();
  }, []);
  return (
    <div className="p-10">
      <div className="flex flex-row items-center">
        <FaDiagnoses style={{ marginRight: 8, fontSize: 20 }} />
        <p className="text-xl font-bold text-wider">Diagnosis</p>
      </div>
      <p className="font-semibold">
        {' '}
        Date:{' '}
        {diagnosis && diagnosis.diagnosis
          ? new Date(diagnosis.session.createdAt).toDateString()
          : 'N/A'}
      </p>
      <p className="font-semibold">
        Status: {diagnosis && diagnosis.diagnosis ? diagnosis.session.status : 'N/A'}
      </p>
      <div className="grid-header">
        <Grid container spacing={2} style={{ fontWeight: 'bold' }}>
          <Grid item xs={6}>
            Title
          </Grid>
          <Grid item xs={6}>
            Description
          </Grid>
        </Grid>
        <Divider variant="fullWidth" orientation="horizontal" />
      </div>
      <div className="grid-body">
        {isLoading ? (
          <CircularProgress size={30} />
        ) : !diagnosis ? (
          <p className="text-xl font-bold pl-3 mb-3 text-red-500">
            There are no diagnosis for this session
          </p>
        ) : (
          diagnosis &&
          diagnosis.diagnosis &&
          diagnosis.diagnosis.length &&
          diagnosis.diagnosis
            .filter((diagnose) => diagnose.diagnosis)
            .map((item, index) => {
              const { diagnosis, note } = item;
              console.log(item);
              return (
                <>
                  <Grid key={index} container spacing={2} style={{ padding: 8 }}>
                    <Grid item xs={6}>
                      <div className="flex flex-row items-center">
                        <Circle sx={{ color: 'rgb(34 197 94)', fontSize: '12px', mr: 1 }} />
                        {diagnosis.title}
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      {note}
                    </Grid>
                  </Grid>
                  {index !== diagnosis.length - 1 ? (
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

export default DiagnosisHistory;
