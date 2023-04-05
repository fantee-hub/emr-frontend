/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { Person } from '@mui/icons-material';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import { getSessionPrescriptions, getSessionTests, getPendingPayments } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import ApprovePayment from '../components/ApprovePayment';
import { useCurrentUser } from '../../utils/hooks';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
const drugHeaders = [
  'Index',
  'Name',
  'Quantity prescribed',
  'Dosage period',
  'Price',
  'Note',
  'Amount'
];
const testHeaders = ['Index', 'Title', 'Description', 'Price'];
function PatientInvoice() {
  const user = useCurrentUser();

  const { sessionId, patientId } = useParams();
  const [prescription, setPrescription] = useState([]);
  const [tests, setTests] = useState([]);

  const classes = useStyles();

  let total;
  const calcTotalPrescriptionAmount = (prescription) => {
    return (
      prescription &&
      prescription
        .filter((item) => !item.paid)
        .map((item) => item.quantity * item.drugId.price)
        .reduce((prev, curr) => prev + curr, 0)
    );
  };
  const calcTotalTestsAmount = (tests) => {
    return (
      tests &&
      tests
        .filter((item) => !item.paid)
        .map((item) => item.test.price)
        .reduce((prev, curr) => prev + curr, 0)
    );
  };

  const getPrescriptionsInSession = async () => {
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getPendingPayments(patientId);
      const prescriptions = data.data.prescription.filter((presc) => presc.drugId !== null);
      if (data) {
        setPrescription(prescriptions);

        console.log(prescriptions);
        const drugs = prescription.map((item) => item.drug);
        calcTotalPrescriptionAmount(drugs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTestsInSession = async () => {
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getPendingPayments(patientId);
      console.log(data);
      const labTests = data.data.test.labs.filter(
        (labTest) => labTest.test !== undefined && labTest.test !== null
      );

      if (data) {
        setTests(labTests);
        calcTotalTestsAmount(labTests);
        console.log(labTests);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(tests[tests.length - 1].test._id);
  const grandTotalPrescription = calcTotalPrescriptionAmount(prescription);
  const grandTotalTests = calcTotalTestsAmount(tests);

  useEffect(() => {
    getPrescriptionsInSession();
    getTestsInSession();
  }, []);

  return (
    <>
      <div className="p-8">
        <h1>Patient Invoice</h1>
        <div className="flex space-x-2 mb-3">
          <div className="flex flex-col space-y-1">
            <Avatar className="bg-green-500 mt-1" variant="circular">
              <Person />
            </Avatar>
            <p className="text-xs">Cashier</p>
          </div>
          <h2 className="text-xl">{user.data.fullName} </h2>
        </div>
        <section className="flex flex-col space-y-3">
          <Paper className="flex flex-col items-center flex-1 px-3">
            <h3>Drugs</h3>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {drugHeaders.map((header, key) => {
                      return (
                        <TableCell key={key} align="center" className="bg-green-500">
                          {header}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prescription && !prescription.length ? (
                    <tr>
                      <td className="text-lg pl-3 mb-3 text-red-500">No drugs in this invoice. </td>
                    </tr>
                  ) : (
                    prescription
                      .filter((item) => !item.paid && item.drugId.type === 'drug')
                      .map((item, index) => {
                        const { drugId, note, quantity, days } = item;
                        const total = quantity * drugId.price;
                        return (
                          <TableRow key={index}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{drugId.name}</TableCell>
                            <TableCell align="center">{quantity}</TableCell>
                            <TableCell align="center">{days} days</TableCell>
                            <TableCell align="center">
                              <span>&#8358;</span> {drugId.price}
                            </TableCell>
                            <TableCell align="center">{note}</TableCell>
                            <TableCell align="center">
                              <span>&#8358;</span> {total.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        );
                      })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <p className="flex self-end text-lg font-bold">
              Total:&nbsp; <span>&#8358;</span> {grandTotalPrescription.toLocaleString()}
            </p>
            <div className="w-1/3 flex self-end">
              <ApprovePayment
                user={user}
                amount={grandTotalPrescription}
                sessionId={sessionId}
                patientId={patientId}
                types={
                  prescription && !prescription.length
                    ? prescription
                    : prescription[prescription.length - 1].drugId.type
                }
                labId={
                  prescription && !prescription.length
                    ? prescription
                    : prescription[prescription.length - 1]._id
                }
                labTests={prescription && !prescription.length ? prescription : prescription}
              />
            </div>
          </Paper>
          <Paper className="flex mt-4 flex-col items-center flex-1 px-3">
            <h3>Tests</h3>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {testHeaders.map((header, key) => {
                      return (
                        <TableCell key={key} align="center" className="bg-green-500">
                          {header}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tests && !tests.length ? (
                    <tr>
                      <td className="text-lg pl-3 mb-3 text-red-500">No tests in this invoice. </td>
                    </tr>
                  ) : (
                    tests
                      .filter((test) => !test.paid)
                      .map((test, index) => {
                        const { name, description, price } = test.test;
                        return (
                          <TableRow key={index}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{name}</TableCell>
                            <TableCell align="center">{description}</TableCell>
                            <TableCell align="center">{price}</TableCell>
                          </TableRow>
                        );
                      })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <p className="flex self-end text-lg font-bold">
              Total:&nbsp; <span>&#8358;</span> {grandTotalTests.toLocaleString()}
            </p>
            <div className="w-1/3 flex self-end">
              <ApprovePayment
                user={user}
                amount={grandTotalTests}
                sessionId={sessionId}
                patientId={patientId}
                types={tests && !tests.length ? tests : tests[tests.length - 1].test.type}
                labId={tests && !tests.length ? tests : tests[tests.length - 1]._id}
                labTests={tests && !tests.length ? tests : tests}
              />
            </div>
          </Paper>
        </section>
      </div>
    </>
  );
}

export default PatientInvoice;
