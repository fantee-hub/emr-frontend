/* eslint-disable react/prop-types */
import { CircularProgress, Divider, Grid } from '@material-ui/core';
import { Circle } from '@mui/icons-material';
import { MdSick } from 'react-icons/md';

import React, { useEffect, useState } from 'react';
import { getSessionSymptoms, patientHistory } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

function SymptomsHistory({ user, sessionId, patientId }) {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [symptoms, setSymptoms] = useState({});

  const getSymptomsInSession = async () => {
    setIsLoading(true);
    const patient = patientId;
    const requestData = { patient };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getSessionSymptoms(sessionId, requestData);
      const res = await patientHistory(sessionId);
      console.log(res.data);
      // const filterSymptom = data.data.symptoms.filter((symp) => symp.symptom !== undefined);
      // console.log(filterSymptom);
      setIsLoading(false);
      if (data) {
        setSymptoms(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSymptomsInSession();
  }, []);

  return (
    <div className="p-10">
      <div className="flex flex-row items-center">
        <MdSick style={{ marginRight: 8, fontSize: 20 }} />
        <p className="text-xl font-bold text-wider">Symptoms</p>
      </div>
      <p className="font-semibold">
        {' '}
        Date:{' '}
        {symptoms && symptoms.symptoms
          ? new Date(symptoms.session.createdAt).toDateString()
          : 'N/A'}
      </p>
      <p className="font-semibold">
        Status: {symptoms && symptoms.symptoms ? symptoms.session.status : 'N/A'}
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
        ) : !symptoms ? (
          <p className="text-xl font-bold pl-3 mb-3 text-red-500">
            There are no symptoms for this session
          </p>
        ) : (
          symptoms &&
          symptoms.symptoms &&
          symptoms.symptoms.length &&
          symptoms.symptoms
            .filter((symp) => symp.symptom)
            .map((item, index) => {
              const { symptom } = item;
              console.log(symptoms.symptoms[symptoms.symptoms.length - 1]);
              return (
                <>
                  <Grid key={index} container spacing={2} style={{ padding: 8 }}>
                    <Grid item xs={6}>
                      <div className="flex flex-row items-center">
                        <Circle sx={{ color: 'rgb(34 197 94)', fontSize: '12px', mr: 1 }} />
                        {symptom.title}
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      {item.description}
                    </Grid>
                  </Grid>
                  {index !== symptoms.length - 1 ? (
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

export default SymptomsHistory;
