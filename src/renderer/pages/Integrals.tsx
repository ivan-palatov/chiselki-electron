import { createStyles, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { withRouter } from 'react-router';
import Form from '../components/integrals/Form';
import Solution from '../components/integrals/Solution';
import Plot from '../components/Plot';
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
      {integralStore.status === 'done' && (
        <Plot
          title="График подинтегральной функции"
          data={[
            integralStore.f!.getPlotData(
              integralStore.range[0] - 0.1,
              integralStore.range[1] + 0.1
            ),
          ]}
        />
      )}
      {integralStore.quads.map(quad => (
        <Solution quad={quad} key={quad.label} />
      ))}
    </div>
  );
});

export default withRouter(Integrals);
