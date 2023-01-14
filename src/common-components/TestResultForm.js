/* eslint-disable react/prop-types */
import { TextField } from '@material-ui/core';
import IntuitiveButton from './IntuitiveButton';

function TestResultForm({ role, handleChange, handleSubmit, isLoading }) {
  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <div className="flex flex-col space-y-3">
        <TextField
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
          label="Test result"
          name="result"
        />
        <TextField
          onChange={handleChange}
          required
          fullWidth
          multiline
          minRows={2}
          variant="outlined"
          label="Result description"
          name="resultDescription"
        />
        <IntuitiveButton isLoading={isLoading} text={`Add ${role} Test Result`} />
      </div>
    </form>
  );
}

export default TestResultForm;
