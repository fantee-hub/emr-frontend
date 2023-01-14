import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteDialog from '../components/DeleteDialog';
import EditPatientForm from '../components/EditPatientForm';
import InputDetailsForm from '../components/InputDetailsForm';
import { addNewPatients, getAllPatients } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import useForm from '../../utils/formValidations/useForm';
import { CircularProgress } from '@material-ui/core';
import { useCurrentUser } from '../../utils/hooks';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['Index', 'ID', 'Name', 'Email', 'Phone No', 'DOB', 'Edit', 'Delete'];

function PatientsBiodata() {
  const user = useCurrentUser();

  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handlePatientNameClick = (id, name) => {
    navigate(`/admin/patient/${id}/${name}`);
  };

  const handleCsvChange = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
        //push Parsed Data Response to rows array
        // rows.push(...results.data);
        // console.log(rows);
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
  const addPatient = async () => {
    setIsAddingPatient(true);
    const patientFormData = { name, email, phoneNumber, dob, PID };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      await addNewPatients(patientFormData);
      setIsAddingPatient(false);
      toast.success('Patient added successfully');
      // if (rows.length > 0) {
      //   setRows([...rows, patientFormData]);
      // }
      // if (rows.length === 0) {
      //   setRows([patientFormData]);
      // }
      getPatients();
    } catch (error) {
      setIsAddingPatient(false);
      toast.error(error.message);
    }
  };
  const getPatients = async () => {
    setIsLoading(true);
    const page = 0;
    const size = 20;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getAllPatients(page, size);
      setIsLoading(false);
      if (data) {
        setRows(data.data);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('an error occured');
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  const { handleChange, values, errors, handleSubmit } = useForm(addPatient);

  const { name, email, phoneNumber, dob, PID } = values;

  const formInputDetails = [
    {
      name: 'name',
      id: 'name',
      label: 'Fullname'
    },
    {
      name: 'email',
      id: 'email',
      label: 'Email'
    },
    {
      name: 'phoneNumber',
      id: 'PhoneNumber',
      label: 'Phone No.'
    },
    {
      name: 'PID',
      id: 'PID',
      label: 'Patient ID'
    }
  ];

  return (
    <div>
      <h2 className="text-lg mb-3">Patients Biodata</h2>
      <InputDetailsForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        handleCsvChange={handleCsvChange}
        isLoading={isAddingPatient}
        formDetails={formInputDetails}
        errors={errors}
        btnText="Add new patient"
        isDateRequired={true}
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
                      Patients list is empty. Add new Patients above
                    </td>
                  </tr>
                </tbody>
              ) : (
                <TableBody>
                  {rows.map((row, index) => {
                    const dob = new Date(row.dob).toDateString();
                    return (
                      <TableRow key={row.name}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row.PID}</TableCell>
                        <TableCell
                          align="center"
                          onClick={() => handlePatientNameClick(row.patient_id, row.name)}
                          className="cursor-pointer hover:shadow-md underline decoration-orange-500"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.phoneNumber}</TableCell>
                        <TableCell align="center">{dob}</TableCell>
                        <TableCell align="center">
                          <EditPatientForm
                            selectedPatient={row}
                            user={user}
                            getPatients={getPatients}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <DeleteDialog
                            id={row.patient_id}
                            item={row.name}
                            getUpdatedList={() => getPatients()}
                            role="patients"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        )}
      </section>
    </div>
  );
}

export default PatientsBiodata;
