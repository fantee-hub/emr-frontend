/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { getPatientBiodata } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import { useCurrentUser } from '../../utils/hooks';
import { CircularProgress } from '@mui/material';
import BiodataDetails from '../../admin/components/BiodataDetails';

function PatientInfo({ patientId }) {
  const user = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState(null);

  const getBiodata = async () => {
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getPatientBiodata(patientId);
      setIsLoading(false);
      setInfo(data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      // toast.error('an error occured');
    }
  };

  useEffect(() => {
    getBiodata();
  }, []);
  return (
    <>
      <div className="px-10 pb-8">
        <h1>Patients Information and Biodata</h1>
        <Paper className="p-3 w-full">
          {isLoading ? (
            <CircularProgress size={30} />
          ) : !info ? (
            <p>This patient has no biodata details</p>
          ) : (
            <BiodataDetails info={info} />
          )}
        </Paper>
      </div>
    </>
  );
}

export default PatientInfo;
