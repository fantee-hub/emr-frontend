import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Person } from '@mui/icons-material';
import Paper from '@material-ui/core/Paper';
import { getAllStaff } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import { useCurrentUser } from '../../utils/hooks';

function CashierHome() {
  // get list of patients
  // const patientsList = JSON.parse(localStorage.getItem('patients'));
  const user = useCurrentUser();
  const [doctors, setDoctors] = useState([]);

  const getAvailableDoctors = (allStaff) => {
    const allDoctors = allStaff.rows.filter((staff) => staff.role === 'DOCTOR');
    setDoctors([...allDoctors]);
    console.log(doctors);
  };

  const getAllDoctors = async () => {
    const page = 0;
    const size = 20;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getAllStaff(page, size);
      if (data) {
        getAvailableDoctors(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllDoctors();
  }, []);
  return (
    <>
      <div className="p-8">
        <h1>Cashier Home</h1>
        <div className="flex space-x-2 mb-3">
          <div className="flex flex-col space-y-1">
            <Avatar className="bg-green-500 mt-1" variant="circular">
              <Person />
            </Avatar>
            <p className="text-xs">Cashier</p>
          </div>
          <h2 className="text-xl"> {user.user.fullName}</h2>
        </div>

        <section>
          <Paper sx={{ width: '70vw' }} className="p-4">
            <p className="text-xl font-bold">Doctors with incoming patients</p>
            <ol>
              {doctors.map((doctor, key) => {
                return (
                  <li key={key}>
                    <Link to={`/doctor/${doctor.uuid}`} style={{ textDecoration: 'none' }}>
                      Dr. {doctor.fullName}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </Paper>
        </section>
      </div>
    </>
  );
}

export default CashierHome;

// 1. get all doctors and their received queues
// 2. see which one has a queue with status in progress and check if they have prescription then display the patient in the queue in a list
// 3. diplay prescription details in cashier invoice
