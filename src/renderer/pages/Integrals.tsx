import { createStyles, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Form from '../components/integrals/Form';
import Plot from '../components/integrals/Plot';
import Solution from '../components/integrals/Solution';
import Title from '../components/Title';
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
      <Title title="Вычисление интегралов" />
      <Form />
      {integralStore.isSubmitted && <Plot />}
      {integralStore.quads.map(quad => (
        <Solution quad={quad} key={quad.label} />
      ))}
    </div>
  );
});

export default Integrals;
