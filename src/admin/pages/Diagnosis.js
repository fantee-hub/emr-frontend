import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { toast } from 'react-toastify';
import DeleteDialog from '../components/DeleteDialog';
import InputDetailsForm from '../components/InputDetailsForm';
import useForm from '../../utils/formValidations/useForm';
import setAuthToken from '../../utils/setAuthToken';
import { useCurrentUser } from '../../utils/hooks';
import { addToDiagnosisList, getDiagnosisList } from '../../utils/api';
import EditDiagnosisForm from '../components/EditDiagnosisForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function Diagnosis() {
  const classes = useStyles();
  const user = useCurrentUser();

  const headers = ['No', 'Diagnosis', 'Edit', 'Delete'];
  const [rows, setRows] = useState([]);
  const [isAddingDiagnosis, setIsAddingDiagnosis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const addDiagnosis = async () => {
    setIsAddingDiagnosis(true);
    const requestData = { name };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      await addToDiagnosisList(requestData);
      setIsAddingDiagnosis(false);
      toast.success('Diagnosis added successfully');
      // if (rows.length) {
      //   setRows([...rows, data]);
      // }
      // if (!rows.length) {
      //   setRows([data]);
      // }
      getDiagnosis();
    } catch (error) {
      setIsAddingDiagnosis(false);
      toast.error(error.message);
    }
  };
  const getDiagnosis = async () => {
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getDiagnosisList();
      setIsLoading(false);
      if (data) {
        console.log(data);
        setRows(data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error('an error occured');
    }
  };

  useEffect(() => {
    getDiagnosis();
  }, []);
  const { handleChange, values, errors, handleSubmit } = useForm(addDiagnosis);

  const { name } = values;
  const formInputDetails = [
    {
      name: 'name',
      id: 'name',
      label: 'Diagnosis'
    }
  ];
  return (
    <div>
      <h2 className="text-lg mb-3">Diagnosis</h2>
      <InputDetailsForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        handleCsvChange={handleCsvChange}
        isLoading={isAddingDiagnosis}
        formDetails={formInputDetails}
        errors={errors}
        btnText="Add diagnosis"
      />
      <TableContainer component={Paper}>
        <h2 className="text-lg mb-3 pl-3">Diagnosis List</h2>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header, index) => {
                return (
                  <TableCell key={index} align="center" className="bg-green-500">
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
                  Diagnosis list is empty. Add new diagnosis above
                </td>
              </tr>
            </tbody>
          ) : (
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} className="odd:bg-white even:bg-slate-50">
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">
                    <EditDiagnosisForm
                      selectedItem={row}
                      setRows={setRows}
                      rows={rows}
                      user={user}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <DeleteDialog id={row.id} setRows={setRows} role="diagnosis" rows={rows} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}

export default Diagnosis;
