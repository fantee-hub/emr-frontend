/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import setAuthToken from '../../utils/setAuthToken';
import { updateInventory } from '../../utils/api';
import EditForm from './EditForm';

export default function EditInventoryForm({ selectedItem, getInventory, user }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [inputData, setInputData] = useState({
    name: selectedItem.name,
    quantity: selectedItem.quantity,
    price: selectedItem.price,
    type: selectedItem.type,
    id: selectedItem._id
  });
  const { name, quantity, price, type, id } = inputData;
  const handleChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateInventoryItem = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await updateInventory(id, inputData);
      setIsLoading(false);
      setOpen(false);
      getInventory();
      toast.success(data.message);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };
  const formDetails = [
    {
      name: 'name',
      id: 'name',
      label: 'Name',
      defaultValue: name
    },
    {
      name: 'price',
      id: 'price',
      label: 'Price',
      defaultValue: price
    },
    {
      name: 'quantity',
      id: 'quantity',
      label: 'Quantity',
      defaultValue: quantity
    },
    {
      name: 'type',
      id: 'type',
      label: 'Type',
      defaultValue: type
    }
  ];

  return (
    <div>
      <EditForm
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        onSubmit={handleUpdateInventoryItem}
        handleChange={handleChange}
        formDetails={formDetails}
        isLoading={isLoading}
        titleText="inventory item"
        btnText="Inventory Item"
      />
    </div>
  );
}
