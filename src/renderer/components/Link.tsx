import MaterialLink from '@material-ui/core/Link';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface IProps {
  to: string;
  color?:
    | 'default'
    | 'error'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary';
  underline?: 'none' | 'hover' | 'always';
  variant?: string;
  classes?: {
    [x: string]: any;
  };
  className?: string;
  gutterBottom?: boolean;
}

const Link: React.FC<IProps> = props => (
  <MaterialLink component={RouterLink} {...(props as any)} />
);

export default Link;
