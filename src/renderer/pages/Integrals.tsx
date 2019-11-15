import { createStyles, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Form from '../components/integrals/Form';
import Solution from '../components/integrals/Solution';
import { useStore } from '../stores/RootContext';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: theme.spacing(6),
    },
  })
);

interface IProps {}

const Integrals = observer<IProps>(function IntegralsComponent() {
  const classes = useStyles();
  const { integralStore } = useStore();

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Вычисление Интегралов
      </Typography>
      <Form />
      {integralStore.quads.map(quad => (
        <Solution quad={quad} key={quad.label} />
      ))}
    </div>
  );
});

export default Integrals;
