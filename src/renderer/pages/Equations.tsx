import { createStyles, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Form from '../components/equations/Form';
import Solution from '../components/equations/Solution';
import Plot from '../components/Plot';
import Title from '../components/Title';
import { useStore } from '../stores/RootContext';

interface IProps {}

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

const Equations = observer<IProps>(function EquationsComponent() {
  const classes = useStyles();
  const { equationStore } = useStore();

  return (
    <div className={classes.root}>
      <Title title="Решение уравнений" />
      <Form />
      {equationStore.isSubmitted && (
        <Plot
          data={[
            equationStore.f!.getPlotData(
              equationStore.data!.a,
              equationStore.data!.b
            ),
          ]}
          title="График функции f(x)"
        />
      )}
      {equationStore.method && equationStore.isSubmitted && <Solution />}
    </div>
  );
});

export default Equations;
