import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
// import { getSessionByPatientId } from '../../utils/api';
import { patientHistoryWithPid } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import { useCurrentUser } from '../../utils/hooks';
import { CircularProgress } from '@material-ui/core';

function HistoryDisplay() {
  // const [isSearching, setIsSearching] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');

  const user = useCurrentUser();

  const [historyList, setHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let { regId } = useParams();

  const getPatientsHistory = async () => {
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    // const requestData = { patient: patientId };
    try {
      const { data } = await patientHistoryWithPid(regId.split(' ').join('/'));
      setIsLoading(false);
      console.log(data);
      if (data) {
        setHistoryList(data.data.session);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  console.log(historyList);
  useEffect(() => {
    getPatientsHistory();
  }, []);
  return (
    <div>
      <div className="pb-8 px-10">
        <h1>Patients History</h1>
        <Paper style={{ padding: 10 }}>
          <List>
            {isLoading ? (
              <CircularProgress size={30} />
            ) : !historyList.length ? (
              <p className="text-xl font-bold pl-3 mb-3 text-red-500">Patient has no history</p>
            ) : (
              historyList.map((history, index) => {
                const { createdAt, _id } = history;
                const sessionId = _id;
                const month = new Date(createdAt).toLocaleString('default', { month: 'long' });
                const monthShortened = new Date(createdAt).toLocaleString('default', {
                  month: 'short'
                });
                const date = new Date(createdAt).toDateString();
                return (
                  <>
                    <ListItem
                      component={Link}
                      to={`/history/${sessionId}`}
                      className="hover:bg-slate-100">
                      <ListItemAvatar>
                        <Avatar className="bg-orange-500">{monthShortened}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={month} secondary={date} />
                    </ListItem>
                    {index !== historyList.length - 1 ? (
                      <Divider variant="fullWidth" orientation="horizontal" />
                    ) : null}
                  </>
                );
              })
            )}
          </List>
        </Paper>
      </div>
    </div>
  );
}

export default HistoryDisplay;
