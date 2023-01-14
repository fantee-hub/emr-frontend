/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import Papa from 'papaparse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditWorkerForm from '../components/EditWorkerForm';
import DeleteDialog from '../components/DeleteDialog';
import { addNewStaff, getAllStaff } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import InputDetailsForm from '../components/InputDetailsForm';
import useForm from '../../utils/formValidations/useForm';
import { CircularProgress } from '@material-ui/core';
import { useCurrentUser } from '../../utils/hooks';
import StaffShift from '../components/StaffShift';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = [
  'Name',
  'Username',
  'Role',
  'Clock In',
  'Clock Out',
  'Set Shift',
  'Edit',
  'Delete'
];

function WorkerLoginDetails() {
  const user = useCurrentUser();

  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingStaff, setIsAddingStaff] = useState(false);

  const handleCsvChange = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        // console.log(results.data);
        if (rows.length === 0) {
          rows.push(...results.data);
          console.log(rows);
        } else if (rows.length > 0) {
          rows.push(...results.data);
          console.log(rows);
        }
      }
    });
  };
  const addStaff = async () => {
    setIsAddingStaff(true);
    const staffFormData = { fullName, username, password, role};
    if (user) {
      setAuthToken(user.token);
    }
    try {
      await addNewStaff(staffFormData);
      setIsAddingStaff(false);
      toast.success('Staff created successfully');
      getStaff();
    } catch (error) {
      setIsAddingStaff(false);
      toast.error(error.message);
    }
  };

  const getStaff = async () => {
    setIsLoading(true);
    const page = 0;
    const size = 20;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getAllStaff(page, size);
      setIsLoading(false);
      if (data) {
        if (data.message) {
          toast.error(data.message)
        }
        setRows(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);

    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  const { handleChange, values, errors, handleSubmit } = useForm(addStaff);

  const { fullName, username, password, role } = values;

  const formInputDetails = [
    {
      name: 'fullName',
      id: 'fullname',
      label: 'fullname'
    },
    {
      name: 'username',
      id: 'username',
      label: 'Username'
    },
    {
      name: 'password',
      id: 'password',
      label: 'Password'
    },
    {
      name: 'role',
      id: 'role',
      label: 'Role'
    }
  ];
  return (
    <>
      <h2 className="text-lg mb-3">Worker Login Details</h2>
      <InputDetailsForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        handleCsvChange={handleCsvChange}
        isLoading={isAddingStaff}
        formDetails={formInputDetails}
        errors={errors}
        btnText="Add new worker"
      />
      <section>
        {isLoading ? (
          <CircularProgress size={30} />
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
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
              {!isLoading && !rows.length ? (
                <tbody>
                  <tr>
                    <td className="text-lg pl-3 mb-3 text-red-500">
                      Staff list is empty. Enter staff details above to add to list
                    </td>
                  </tr>
                </tbody>
              ) : (
                <TableBody>
                  {rows.map((row, key) => (
                    <TableRow key={key} className="odd:bg-white even:bg-slate-50">
                      <TableCell align="center">{row.fullName}</TableCell>
                      <TableCell align="center">{row.username}</TableCell>
                      <TableCell align="center">{row.role}</TableCell>
                      <TableCell align="center">
                        <input
                          type="time"
                          name="clockIn"
                          className="text-base"
                          defaultValue={row.clockIn || '09:00'}
                          readOnly
                        />
                      </TableCell>
                      <TableCell align="center">
                        <input
                          type="time"
                          name="clockOut"
                          className="text-base"
                          defaultValue={row.clockOut || '00:00'}
                          readOnly
                        />
                      </TableCell>
                      <TableCell align="center">
                        <StaffShift
                          name={row.fullName}
                          getStaff={getStaff}
                          user={user}
                          selectedStaff={row}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <EditWorkerForm
                          selectedWorker={row}
                          // setRows={setRows}
                          // delete these and make like DeleteDialog
                          // rows={rows}
                          getStaff={getStaff}
                          user={user}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <DeleteDialog id={row.staff_id} getUpdatedList={() => getStaff()} item={row.fullName} role="staff" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        )}
      </section>
    </>
  );
}
export default WorkerLoginDetails;
