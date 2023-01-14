import React, { useState, useEffect } from 'react';
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
import setAuthToken from '../../utils/setAuthToken';
import { addNewInventory, getAllInventoryItems } from '../../utils/api';
import EditInventoryForm from '../components/EditInventoryForm';
import DeleteDialog from '../components/DeleteDialog';
import InputDetailsForm from '../components/InputDetailsForm';
import useForm from '../../utils/formValidations/useForm';
import { CircularProgress } from '@material-ui/core';
import { useCurrentUser } from '../../utils/hooks';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const headers = ['No', 'Name', 'Quantity', 'Unit Price (#)', 'Edit', 'Delete'];

function Inventory() {
  const user = useCurrentUser();

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingInventory, setIsAddingInventory] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);

  const handleCsvChange = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        // console.log(results.data);
        if (inventoryList.length === 0) {
          inventoryList.push(...results.data);
          console.log(inventoryList);
        } else if (inventoryList.length > 0) {
          inventoryList.push(...results.data);
          console.log(inventoryList);
        }
      }
    });
  };

  const addInventory = async () => {
    setIsAddingInventory(true);
    const inventoryFormData = { name, quantity, price, type };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      await addNewInventory(inventoryFormData);
      setIsAddingInventory(false);
      toast.success('Item added successfully');
      getInventory();
    } catch (error) {
      setIsAddingInventory(false);
      toast.error(error.message);
    }
  };

  const getInventory = async () => {
    setIsLoading(true);
    const page = 0;
    const size = 20;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getAllInventoryItems(page, size);
      setIsLoading(false);
      if (data) {
        setInventoryList(data.data);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('An error occured');
    }
  };
  useEffect(() => {
    getInventory();
  }, []);

  const { handleChange, values, errors, handleSubmit } = useForm(addInventory);

  const { name, quantity, price, type } = values;

  const formInputDetails = [
    {
      name: 'name',
      id: 'name',
      label: 'Name'
    },
    {
      name: 'quantity',
      id: 'quantity',
      label: 'Quantity'
    },
    {
      name: 'price',
      id: 'price',
      label: 'Unit Price'
    },
    {
      name: 'type',
      id: 'type',
      label: 'DRUG or TEST'
    }
  ];
  return (
    <div>
      <h2 className="text-lg mb-3">Inventory</h2>
      <InputDetailsForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        handleCsvChange={handleCsvChange}
        isLoading={isAddingInventory}
        formDetails={formInputDetails}
        errors={errors}
        btnText="Add to inventory"
      />
      <section>
        {isLoading ? (
          <CircularProgress size={30} />
        ) : (
          <TableContainer component={Paper}>
            <h2 className="text-lg mb-3 pl-3">Drugs</h2>
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
              <TableBody>
                {!isLoading && !inventoryList.length ? (
                  <tr>
                    <td className="text-lg pl-3 mb-3 text-red-500">
                      Drugs list is empty. Enter details above to add to list
                    </td>
                  </tr>
                ) : (
                  inventoryList &&
                  inventoryList
                    .filter((row) => row.type === 'drug')
                    .map((row, index) => (
                      <TableRow key={row.name} className="odd:bg-white even:bg-slate-50">
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.quantity}</TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">
                          <EditInventoryForm
                            selectedItem={row}
                            getInventory={getInventory}
                            rows={inventoryList}
                          />
                        </TableCell>
                        <TableCell align="center">
                        <DeleteDialog
                            id={row._id}
                            item={row.name}
                            getUpdatedList={() => getInventory()}
                            role="inventory"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </section>
      <section>
        {isLoading ? (
          <CircularProgress size={30} />
        ) : (
          <TableContainer component={Paper} style={{ marginTop: 5 }}>
            <h2 className="text-lg mb-3 pl-3">Tests</h2>
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
              <TableBody>
                {!isLoading && !inventoryList.length ? (
                  <tr>
                    <td className="text-lg pl-3 mb-3 text-red-500">
                      Tests list is empty. Enter details above to add to list
                    </td>
                  </tr>
                ) : (
                  inventoryList &&
                  inventoryList
                    .filter((row) => row.type === 'test')
                    .map((row, index) => (
                      <TableRow key={row.name} className="odd:bg-white even:bg-slate-50">
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.quantity}</TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">
                        <EditInventoryForm
                            selectedItem={row}
                            getInventory={getInventory}
                            rows={inventoryList}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <DeleteDialog
                            id={row._id}
                            item={row.name}
                            getUpdatedList={() => getInventory()}
                            role="inventory"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </section>
    </div>
  );
}

export default Inventory;
