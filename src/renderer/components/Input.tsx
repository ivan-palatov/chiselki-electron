import TextField from '@material-ui/core/TextField';
import { FieldAttributes, useField } from 'formik';
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

const Input: React.FC<Props> = ({
  label,
  helperText,
  type,
  min,
  max,
  step,
  className,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);

  return (
    <TextField
      {...field}
      className={className}
      type={type}
      inputProps={{ step, min, max }}
      helperText={meta.error ? meta.error : helperText}
      label={label}
      error={!!meta.error}
    />
  );
};

export default Input;
