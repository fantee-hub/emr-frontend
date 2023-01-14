import React, { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../utils/hooks';
import setAuthToken from '../../utils/setAuthToken';
import { getApprovedPaymentsForPatient } from '../../utils/api';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['Index', 'Title', 'Description'];

function XrayTests() {
  const classes = useStyles();
  const user = useCurrentUser();
  const { patientId, sessionId } = useParams();

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPatientsApprovedInvoice = async () => {
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getApprovedPaymentsForPatient(patientId, sessionId);
      setIsLoading(false);
      if (data) {
        setRows(data);
        console.log(data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error('an error occured');
    }
  };
  useEffect(() => {
    getPatientsApprovedInvoice();
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
            <p className="text-xs">Xray staff</p>
          </div>
          <h2 className="text-xl">{user.user.fullName} </h2>
        </div>
        <section>
          <Paper className="flex flex-col items-center flex-1 px-3">
            <h3>Tests</h3>
            {isLoading ? (
              <CircularProgress size={30} />
            ) : (
              <TableContainer component={Paper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header, key) => {
                        return (
                          <TableCell key={key} align="center" className="bg-green-500">
                            {header}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  {rows.tests && !rows.tests.length ? (
                    <tbody>
                      <tr>
                        <td className="text-lg pl-3 mb-3 text-red-500">
                          No tests in this invoice.
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    rows &&
                    rows.tests &&
                    rows.tests.map((test, index) => {
                      const { title, description, id } = test;
                      return (
                        <TableBody key={id}>
                          <Link
                            className="hover:bg-slate-400"
                            key={id}
                            to={`/xray-results/${id}/${title}/${description}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <TableRow>
                              <TableCell align="center">{index + 1}</TableCell>
                              <TableCell align="center">{title}</TableCell>
                              <TableCell align="center">{description}</TableCell>
                            </TableRow>
                          </Link>
                        </TableBody>
                      );
                    })
                  )}
                </Table>
              </TableContainer>
            )}
            <p className="flex self-end text-lg font-bold">
              Grand Total:&nbsp; <span>&#8358;</span>
            </p>
          </Paper>
        </section>
      </div>
    </>
  );
}

export default XrayTests;
