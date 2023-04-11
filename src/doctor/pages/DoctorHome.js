/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Person } from '@mui/icons-material';
import PatientSearchBar from '../../common-components/PatientSearchBar';
import { FaUserMd } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import PatientsPersonalPage from './PatientsPersonalPage';
import { getReceivedQueues, updateOnlineStatus, getPatientResult } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import { useCurrentUser } from '../../utils/hooks';
import DeleteDialog from '../components/DeleteDialog';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['Index', 'Name', 'Email', 'Phone No', 'DOB'];
const resultHeaders = ['Index', 'Test Result For', 'Conclude Test'];

function DoctorHome() {
  const classes = useStyles();
  const user = useCurrentUser();

  const [searchQuery, setSearchQuery] = useState('');
  const [patientsList, setPatientsList] = useState([]);
  const navigate = useNavigate();
  const [isDoctorAvailable, setIsDoctorAvailable] = useState(
    JSON.parse(localStorage.getItem('isDoctorAvailable')) ?? false
  );
  const [availableDoctors, setAvailableDoctors] = useState(
    JSON.parse(localStorage.getItem('availableDoctors')) ?? []
  );
  const [patientLabTest, setPatientLabTest] = useState([]);
  const filterData = (query, patientsList) => {
    let terms = query.split(' ');
    return patientsList.filter((object) =>
      terms.every((term) =>
        Object.values(object.patient).some((value) =>
          String(value).toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  };
  const handlePatientNameClick = (id) => {
    navigate(`/history/${id}`);
  };

  const patientWithUploadedResults = async () => {
    try {
      const { data } = await getPatientResult();
      console.log(data);
      if (data) {
        setPatientLabTest(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const patientsFromReceptionist = async () => {
    // const staffId = user.uuid;
    // console.log(user);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getReceivedQueues();
      console.log(data.data);
      const patients = data.data.filter((patient) => patient.patient !== null);
      if (data) {
        setPatientsList(patients);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onlinehandler = async (online) => {
    try {
      const { data } = await updateOnlineStatus(online);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // TODO this function will instead make a patch or put request to update the doctors availability on the backend
  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      onlinehandler(true);
      setIsDoctorAvailable(true);
      if (availableDoctors.length > 0) {
        setAvailableDoctors(availableDoctors.push(user.data.fullName));
      } else if (availableDoctors.length === 0) {
        setAvailableDoctors([user.data.fullName]);
      }
    }
    if (!event.target.checked) {
      onlinehandler(false);
      setIsDoctorAvailable(false);
      setAvailableDoctors(availableDoctors.filter((doc) => doc !== user.data.fullName));
    }
  };
  const dataFiltered = filterData(searchQuery, patientsList);

  useEffect(() => {
    localStorage.setItem('availableDoctors', JSON.stringify(availableDoctors));
  }, [availableDoctors]);

  useEffect(() => {
    localStorage.setItem('isDoctorAvailable', JSON.stringify(isDoctorAvailable));
  }, [isDoctorAvailable]);

  useEffect(() => {
    patientsFromReceptionist();
    patientWithUploadedResults();
  }, [patientsList, patientLabTest]);
  return (
    <div>
      <div className="p-8">
        <section className="flex justify-between">
          <div>
            <div className="flex space-x-2">
              <FaUserMd className="mt-5" />
              <h2 className="text-xl">Dr. {user.data.fullName} </h2>
            </div>
            <div className="flex space-x-2 mt-[-2px]">
              <Checkbox size="small" checked={isDoctorAvailable} onChange={handleCheckboxChange} />
              <p className="text-sm">Available (online)</p>
            </div>
          </div>
          <div className="">
            <PatientSearchBar setSearchQuery={setSearchQuery} label="Find a patient" />
          </div>
        </section>
        <section className="mt-6">
          <div className="flex justify-start">
            <AvatarGroup total={patientsList.length}>
              <Avatar className="bg-orange-500 mt-1" variant="circular">
                <Person />
              </Avatar>
            </AvatarGroup>
          </div>
          <p className="text-sm mt-[-2px]">Incoming patients</p>
        </section>
      </div>

      <section
        className="flex mb-4 flex-row justify-center items-center"
        style={{ margin: '3rem 0' }}>
        {patientsList ? (
          <TableContainer component={Paper} style={{ width: '90vw' }}>
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
              {!patientsList.length ? (
                <h1 className="text-lg mb-3 text-red-500">Patient list is empty.</h1>
              ) : !dataFiltered.length ? (
                <h1 className="text-lg mb-3 text-red-500">Patient is not on the list.</h1>
              ) : (
                <TableBody>
                  {dataFiltered &&
                    dataFiltered.map((data, index) => {
                      const dob = new Date(data.patient.dob).toDateString();
                      return (
                        <TableRow
                          key={index}
                          component={Link}
                          to={`/patient/${data.patient._id}/${data.patient.name}/${data.session}`}
                          style={{ textDecoration: 'none' }}
                          className="hover:shadow-md hover:bg-slate-50">
                          <TableCell align="center">{index + 1}</TableCell>

                          <TableCell align="center">{data.patient.name}</TableCell>
                          <TableCell align="center">{data.patient.email}</TableCell>
                          <TableCell align="center">{data.patient.phoneNumber}</TableCell>
                          <TableCell align="center">{dob}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        ) : null}
      </section>

      <section className="flex flex-row justify-center items-center px-3">
        {patientLabTest ? (
          <TableContainer component={Paper} style={{ width: '90vw' }}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {resultHeaders.map((header, key) => {
                    return (
                      <TableCell key={key} align="center" className="bg-green-500">
                        {header}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              {!patientLabTest.length ? (
                <h1 className="text-lg mb-3 text-red-500">Patient list is empty.</h1>
              ) : (
                <TableBody>
                  {patientLabTest &&
                    patientLabTest.map((data, index) => {
                      return (
                        <TableRow
                          key={index}
                          style={{ textDecoration: 'none' }}
                          className="hover:shadow-md hover:bg-slate-50">
                          <TableCell align="center">{index + 1}</TableCell>

                          <TableCell
                            align="center"
                            onClick={() => handlePatientNameClick(data.sessionID)}
                            className="cursor-pointer hover:shadow-md underline decoration-orange-500">
                            {data.patient.name}
                          </TableCell>
                          <TableCell align="center">
                            <DeleteDialog
                              id={data._id}
                              item={data.patient.name}
                              getUpdatedList={() => patientWithUploadedResults()}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        ) : null}
      </section>
    </div>
  );
}

export default DoctorHome;
