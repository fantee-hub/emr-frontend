/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const onClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(0); // the current entry in the history stack will be replaced with the new one with { replace: true }
    }
  };

  return (
    <>
      <button onClick={onClick}>Go back</button>
    </>
  );
};

export default BackButton;
