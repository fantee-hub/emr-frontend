import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { patientHistoryWithPid } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import { CircularProgress, Divider, Grid } from '@material-ui/core';
import { Circle, Healing, Biotech } from '@mui/icons-material';
import { MdSick } from 'react-icons/md';
import { FaDiagnoses, FaBone } from 'react-icons/fa';

function History() {
  const user = JSON.parse(localStorage.getItem('user'));
  let { regId } = useParams();
  const [isHistory, setIsHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  const getHistory = async () => {
    setIsHistory(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await patientHistoryWithPid(regId.split(' ').join('/'));
      console.log(regId.split(' ').join('/'));
      console.log(data);
      setIsHistory(false);
      if (data) {
        setHistoryData(data.data);
      }
    } catch (error) {
      toast.error('an error occured');
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const calcTotalPrescriptionAmount = (prescription) => {
    return (
      prescription &&
      prescription.length &&
      prescription
        .map((item) => item.quantity * item.drugId.price)
        .reduce((prev, curr) => prev + curr, 0)
    );
  };
  const grandTotalPrescription =
    historyData && historyData.prescription
      ? calcTotalPrescriptionAmount(historyData.prescription)
      : 0;

  const calcTotalTestsAmount = (tests) => {
    return tests && tests.map((item) => item.test.price).reduce((prev, curr) => prev + curr, 0);
  };
  const calcTotalXraysAmount = (xrays) => {
    return xrays && xrays.map((item) => item.test.price).reduce((prev, curr) => prev + curr, 0);
  };

  const grandTotalTests =
    historyData && historyData.tests ? calcTotalTestsAmount(historyData.tests) : 0;
  const grandTotalXrays =
    historyData && historyData.xrays ? calcTotalXraysAmount(historyData.xrays) : 0;
  return (
    <>
      <div className="px-10 pb-8">
        <h1 className="">Patient History</h1>
        <Paper>
          <div className="p-10">
            <div className="flex flex-row items-center">
              <MdSick style={{ marginRight: 8, fontSize: 20 }} />
              <p className="text-xl font-bold text-wider">Symptoms</p>
            </div>

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
              {isHistory ? (
                <CircularProgress size={30} />
              ) : !historyData.symptoms ? (
                <p className="text-xl font-bold pl-3 mb-3 text-red-500">
                  There are no symptoms for this session
                </p>
              ) : (
                historyData &&
                historyData.symptoms &&
                historyData.symptoms.length &&
                historyData.symptoms
                  .filter((symp) => symp.symptom)
                  .map((item, index) => {
                    const { symptom } = item;

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
                        {index !== historyData.symptoms.length - 1 ? (
                          <Divider variant="fullWidth" orientation="horizontal" />
                        ) : null}
                      </>
                    );
                  })
              )}
            </div>
            <div className=" mt-10 mb-10 w-full border-4 border-solid border-green-500"></div>
          </div>

          <div className="p-10">
            <div className="flex flex-row items-center">
              <FaDiagnoses style={{ marginRight: 8, fontSize: 20 }} />
              <p className="text-xl font-bold text-wider">Diagnosis</p>
            </div>

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
              {isHistory ? (
                <CircularProgress size={30} />
              ) : !historyData.diagnosis ? (
                <p className="text-xl font-bold pl-3 mb-3 text-red-500">
                  There are no diagnosis for this session
                </p>
              ) : (
                historyData &&
                historyData.diagnosis &&
                historyData.diagnosis.length &&
                historyData.diagnosis
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
                        {index !== historyData.diagnosis.length - 1 ? (
                          <Divider variant="fullWidth" orientation="horizontal" />
                        ) : null}
                      </>
                    );
                  })
              )}
            </div>
            <div className=" mt-10 mb-10 w-full border-4 border-solid border-green-500"></div>
          </div>

          <div className="p-10">
            <div className="flex flex-row items-center">
              <Healing sx={{ mr: 1 }} />
              <p className="text-xl font-bold text-wider">Prescription</p>
            </div>

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
              {isHistory ? (
                <CircularProgress size={30} />
              ) : !historyData.prescription ? (
                <p className="text-xl font-bold pl-3 mb-3 text-red-500">
                  There are no prescriptions for this session
                </p>
              ) : (
                historyData &&
                historyData.prescription &&
                historyData.prescription.length &&
                historyData.prescription.map((item, index) => {
                  const { quantity, note, days, drugId, doctor } = item;
                  return (
                    <>
                      <Grid key={index} container spacing={2} style={{ padding: 8 }}>
                        <Grid item xs={2}>
                          <div className="flex flex-row items-center">
                            <Circle sx={{ color: 'rgb(34 197 94)', fontSize: '12px', mr: 1 }} />
                            {drugId.name}
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
                      {index !== historyData.prescription.length - 1 ? (
                        <Divider variant="fullWidth" orientation="horizontal" />
                      ) : null}
                    </>
                  );
                })
              )}
            </div>
            <p className="flex self-end text-lg font-bold">
              Total:&nbsp; <span>&#8358;</span> {grandTotalPrescription.toLocaleString()}
            </p>
            <div className=" mt-10 mb-10 w-full border-4 border-solid border-green-500"></div>
          </div>

          <div className="p-10">
            <div className="flex flex-row items-center">
              <Biotech sx={{ mr: 1 }} />
              <p className="text-xl font-bold text-wider">Lab Tests</p>
            </div>

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
              {isHistory ? (
                <CircularProgress size={30} />
              ) : !historyData.tests ? (
                <p className="text-xl font-bold pl-3 mb-3 text-red-500">
                  There are no tests for this session
                </p>
              ) : (
                historyData &&
                historyData.tests &&
                historyData.tests.length &&
                historyData.tests
                  .filter((test) => test.test)
                  .map((item, index) => {
                    const { name } = item.test;
                    const { result, description } = item.result
                      ? item.result
                      : { result: '', description: '' };
                    const { fullName } = item.doctor;
                    return (
                      <>
                        <Grid key={index} container spacing={2} style={{ padding: 8 }}>
                          <Grid item xs={2}>
                            <div className="flex flex-row items-center">
                              <Circle sx={{ color: 'rgb(34 197 94)', fontSize: '12px', mr: 1 }} />
                              {name}
                            </div>
                          </Grid>
                          <Grid item xs={2}>
                            {item.description}
                          </Grid>
                          <Grid item xs={2}>
                            {result}
                          </Grid>
                          <Grid item xs={4}>
                            {description}
                          </Grid>

                          <Grid item xs={2} style={{ color: '#808080' }}>
                            {fullName}
                          </Grid>
                        </Grid>
                        {index !== historyData.tests.length - 1 ? (
                          <Divider variant="fullWidth" orientation="horizontal" />
                        ) : null}
                      </>
                    );
                  })
              )}
            </div>
            <p className="flex self-end text-lg font-bold">
              Total:&nbsp; <span>&#8358;</span> {grandTotalTests.toLocaleString()}
            </p>
            <div className=" mt-10 mb-10 w-full border-4 border-solid border-green-500"></div>
          </div>

          <div className="p-10">
            <div className="flex flex-row items-center">
              <FaBone style={{ marginRight: '1rem' }} />
              <p className="text-xl font-bold text-wider">Xrays</p>
            </div>

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
              {isHistory ? (
                <CircularProgress size={30} />
              ) : !historyData.xrays ? (
                <p className="text-xl font-bold pl-3 mb-3 text-red-500">
                  There are no tests for this session
                </p>
              ) : (
                historyData &&
                historyData.xrays &&
                historyData.xrays.length &&
                historyData.xrays
                  .filter((test) => test.test)
                  .map((item, index) => {
                    const { name } = item.test;
                    const { result, description } = item.result
                      ? item.result
                      : { result: '', description: '' };
                    const { fullName } = item.doctor;
                    return (
                      <>
                        <Grid key={index} container spacing={2} style={{ padding: 8 }}>
                          <Grid item xs={2}>
                            <div className="flex flex-row items-center">
                              <Circle sx={{ color: 'rgb(34 197 94)', fontSize: '12px', mr: 1 }} />
                              {name}
                            </div>
                          </Grid>
                          <Grid item xs={2}>
                            {item.description}
                          </Grid>
                          <Grid item xs={2}>
                            {result}
                          </Grid>
                          <Grid item xs={4}>
                            {description}
                          </Grid>

                          <Grid item xs={2} style={{ color: '#808080' }}>
                            {fullName}
                          </Grid>
                        </Grid>
                        {index !== historyData.xrays.length - 1 ? (
                          <Divider variant="fullWidth" orientation="horizontal" />
                        ) : null}
                      </>
                    );
                  })
              )}
            </div>
            <p className="flex self-end text-lg font-bold">
              Total:&nbsp; <span>&#8358;</span> {grandTotalXrays.toLocaleString()}
            </p>
            <div className=" mt-10 mb-10 w-full border-4 border-solid border-green-500"></div>
          </div>
        </Paper>
      </div>
    </>
  );
}

export default History;
