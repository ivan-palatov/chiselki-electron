import TextField from '@material-ui/core/TextField';
import { FieldAttributes, useField } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';

type Props = {
  label: string;
  helperText?: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
} & FieldAttributes<{}>;

const Input = observer<Props>(
  ({ label, helperText, type, min, max, step, className, ...props }) => {
    const [field, meta] = useField<{}>(props);

    const isError = Boolean(meta.error && meta.touched);

    return (
      <TextField
        {...field}
        className={className}
        type={type}
        inputProps={{ step, min, max }}
        helperText={isError ? meta.error : helperText}
        label={label}
        error={isError}
      />
    );
  }
);

export default Input;
