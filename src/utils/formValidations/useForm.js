import { useState } from 'react';
import { omit } from 'lodash';
import { toast } from 'react-toastify';

const useForm = (callback) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  //TODO add validations for entering patient biodata details in admin portal
  const validate = (event, name, value) => {
    switch (name) {
      case 'name':
        if (value.length <= 3) {
          setErrors({
            ...errors,
            name: 'should be at least 3 characters'
          });
        } else {
          let newObj = omit(errors, 'name');
          setErrors(newObj);
        }
        break;

      case 'email':
        if (!value.length) {
          setErrors({
            ...errors,
            email: 'required'
          });
        } else if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: 'Enter a valid email address'
          });
        } else {
          let newObj = omit(errors, 'email');
          setErrors(newObj);
        }
        break;

      case 'phoneNumber':
        if (value.length < 11 || value.length > 11) {
          setErrors({
            ...errors,
            phoneNumber: 'Invalid phone number, must be 11 digits'
          });
        } else if (!new RegExp(/^\d+$/).test(value)) {
          setErrors({
            ...errors,
            phoneNumber: 'Invalid phone number, must contain only digits'
          });
        } else {
          let newObj = omit(errors, 'phoneNumber');
          setErrors(newObj);
        }
        break;

      case 'dob':
        if (!value) {
          setErrors({
            ...errors,
            dob: 'required*'
          });
        } else {
          let newObj = omit(errors, 'dob');
          setErrors(newObj);
        }
        break;

      case 'fullName':
        if (value.length === 0) {
          setErrors({
            ...errors,
            fullName: 'required*'
          });
        } else {
          let newObj = omit(errors, 'fullName');
          setErrors(newObj);
        }
        break;

      case 'username':
        if (value.length <= 3) {
          setErrors({
            ...errors,
            username: 'Username must at least have 4 characters'
          });
        } else {
          let newObj = omit(errors, 'username');
          setErrors(newObj);
        }
        break;
      case 'password':
        if (value.length <= 3) {
          setErrors({
            ...errors,
            password: 'password must at least have 4 characters'
          });
        } else {
          let newObj = omit(errors, 'password');
          setErrors(newObj);
        }
        break;

      case 'price':
        if (value.length === 0) {
          setErrors({
            ...errors,
            price: 'required*'
          });
        } else {
          let newObj = omit(errors, 'price');
          setErrors(newObj);
        }
        break;

      case 'quantity':
        if (value.length === 0) {
          setErrors({
            ...errors,
            quantity: 'required*'
          });
        } else {
          let newObj = omit(errors, 'quantity');
          setErrors(newObj);
        }
        break;

      case 'type':
        if (!value.length) {
          setErrors({
            ...errors,
            type: 'required'
          });
        } else {
          let newObj = omit(errors, 'type');
          setErrors(newObj);
        }
        break;

      case 'role':
        if (!value.length) {
          setErrors({
            ...errors,
            role: 'required'
          });
        }
         else {
          let newObj = omit(errors, 'role');
          setErrors(newObj);
        }
        break;

      case 'diagnosis':
        if (value.length === 0) {
          setErrors({
            ...errors,
            diagnosis: 'required*'
          });
        } else {
          let newObj = omit(errors, 'diagnosis');
          setErrors(newObj);
        }
        break;

      case 'symptom':
        if (value.length === 0) {
          setErrors({
            ...errors,
            symptom: 'required*'
          });
        } else {
          let newObj = omit(errors, 'symptom');
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (event) => {
    // event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validate(event, name, val);

    setValues({
      ...values,
      [name]: val
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
      event.target.reset();
    } else {
      toast.error('There is an Error! Check that all required details are correctly inputed.');
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit
  };
};

export default useForm;
