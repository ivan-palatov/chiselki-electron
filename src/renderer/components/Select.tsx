import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MaterialSelect from '@material-ui/core/Select';
import { FieldAttributes, useField } from 'formik';
import React from 'react';

type Props = {
  className?: string;
  helperText?: string;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  multiple?: boolean;
} & FieldAttributes<{}>;

const useStyles = makeStyles(theme =>
  createStyles({
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

function getStyles(value: string, chosen: string[], theme: Theme) {
  return {
    fontWeight: chosen.includes(value)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const Select: React.FC<Props> = ({
  className,
  label,
  options,
  helperText,
  multiple,
  ...props
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [field, meta] = useField<string[]>(props as any);

  return (
    <FormControl className={className} error={!!meta.error}>
      <InputLabel htmlFor={props.name}>{label}</InputLabel>
      <MaterialSelect
        {...field}
        multiple={multiple}
        input={<Input id={props.name} />}
        renderValue={selected => (
          <div className={classes.chips}>
            {(selected as string[]).map(value => (
              <Chip
                key={value}
                label={options.find(el => el.value === value)!.label}
                className={classes.chip}
              />
            ))}
          </div>
        )}
      >
        {options.map(opt => (
          <MenuItem
            key={opt.value}
            value={opt.value}
            style={getStyles(opt.value, field.value, theme)}
          >
            {opt.label}
          </MenuItem>
        ))}
      </MaterialSelect>
      <FormHelperText>{!meta.error ? helperText : meta.error}</FormHelperText>
    </FormControl>
  );
};

export default Select;
