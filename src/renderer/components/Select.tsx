import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MaterialSelect from '@material-ui/core/Select';
import { FieldAttributes, useField } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';

type Props = {
  className?: string;
  helperText?: string;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
} & FieldAttributes<{}>;

const Select = observer<Props>(function SelectComponent({
  className,
  helperText,
  label,
  options,
  ...props
}) {
  const [field, meta] = useField<{}>(props);

  const isError = Boolean(meta.error && meta.touched);

  return (
    <FormControl className={className} error={isError}>
      <InputLabel htmlFor={props.name}>{label}</InputLabel>
      <MaterialSelect {...field} input={<Input id={props.name} />}>
        {options.map(opt => (
          <MenuItem value={opt.value} key={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </MaterialSelect>
      <FormHelperText>{isError ? meta.error : helperText}</FormHelperText>
    </FormControl>
  );
});

export default Select;
