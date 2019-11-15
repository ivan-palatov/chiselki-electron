import { createStyles, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Form from '../components/integrals/Form';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  })
);

const Integrals: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Вычисление Интегралов
      </Typography>
      <Form />
    </div>
  );
};

export default Integrals;
