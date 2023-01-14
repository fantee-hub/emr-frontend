// for use in serach boxes
export const filterData = (query, list) => {
  if (!query) {
    return list;
  } else {
    return list.filter((patient) => patient.name.toLowerCase().includes(query));
  }
};

// function to handle checkbox change in dropdown button component to get and store value in api or localStorage
export const handleCheckboxChange = (event, setChoice, choice, id) => {
  if (event.target.checked && !choice.length) {
    // setChoice([event.target.value]);
    setChoice([
      {
        value: event.target.value,
        id: id
      }
    ]);
  } else if (event.target.checked && choice.length > 0) {
    setChoice([
      ...choice,
      {
        value: event.target.value,
        id: id
      }
    ]);
  }
  if (!event.target.checked) {
    const filterdArr = choice.filter((c) => c.value !== event.target.value);
    setChoice([...filterdArr]);
  }
  console.log(choice);
  // localStorage.setItem(`selected${chosen}`, JSON.stringify(choice));
};
