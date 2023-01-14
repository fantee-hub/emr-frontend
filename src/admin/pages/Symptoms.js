import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteDialog from '../components/DeleteDialog';
import InputDetailsForm from '../components/InputDetailsForm';
import useForm from '../../utils/formValidations/useForm';
import setAuthToken from '../../utils/setAuthToken';
import { useCurrentUser } from '../../utils/hooks';
import { addToSymptomList, getSymptomsList } from '../../utils/api';
import EditSymptomForm from '../components/EditSymptomsForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['No', 'Symptom', 'Edit', 'Delete'];

function Symptoms() {
  const classes = useStyles();
  const user = useCurrentUser();

  const [isAddingSymptom, setIsAddingSymptom] = useState(false);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const [inputData, setInputData] = useState({
  //   id: '',
  //   symptom: ''
  // });
  // const handleChange = (e) => {
  //   setInputData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value
  //   }));
  // };
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
  const addSymptom = async () => {
    setIsAddingSymptom(true);
    const requestData = { name };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      await addToSymptomList(requestData);
      setIsAddingSymptom(false);
      toast.success('Symptom added successfully');
      // if (rows.length) {
      //   setRows([...rows, data]);
      // }
      // if (!rows.length) {
      //   setRows([data]);
      // }
      getSymptoms();
    } catch (error) {
      setIsAddingSymptom(false);
      toast.error(error.message);
    }
  };

  const getSymptoms = async () => {
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getSymptomsList();
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
    getSymptoms();
  }, []);
  const { handleChange, values, errors, handleSubmit } = useForm(addSymptom);

  const { name } = values;

  const formInputDetails = [
    {
      name: 'name',
      label: 'Symptom'
    }
  ];
  return (
    <div>
      <h2 className="text-lg mb-3">Symptoms</h2>
      <InputDetailsForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        handleCsvChange={handleCsvChange}
        isLoading={isAddingSymptom}
        formDetails={formInputDetails}
        errors={errors}
        btnText="Add symptom"
      />
      <TableContainer component={Paper}>
        <h2 className="text-lg mb-3 pl-3">Symptoms List</h2>
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
                  Symptoms list is empty. Add new symptoms above
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
                    <EditSymptomForm selectedItem={row} setRows={setRows} rows={rows} user={user} />
                  </TableCell>
                  <TableCell align="center">
                    <DeleteDialog id={row.id} setRows={setRows} role="symptoms" rows={rows} />
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

export default Symptoms;
