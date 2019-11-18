import { createStyles, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react-lite';
import React from 'react';
// @ts-ignore
import { BlockMath } from 'react-katex';
import { useStore } from '../../stores/RootContext';

interface IProps {}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: theme.spacing(3),
    },
  })
);

const Solution = observer<IProps>(function SolutionComponent() {
  const classes = useStyles();
  const { equationStore } = useStore();

  const isIter = equationStore.data?.type === 'iteration';

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h2" gutterBottom>
        {equationStore.label}
      </Typography>
      <Typography>
        На отрезке{' '}
        <b>
          [{equationStore.data?.a}, {equationStore.data?.b}]
        </b>{' '}
        уравнение
      </Typography>
      <BlockMath>{String.raw`${equationStore.f!.LaTeX()} = ${
        isIter ? 'x' : '0'
      }`}</BlockMath>
      <Typography>Имеет следующий корень:</Typography>
      <BlockMath>{String.raw`x \approx ${equationStore.method.calc()}`}</BlockMath>
      {isIter && (
        <Typography>Количество итераций: {equationStore.method.i}</Typography>
      )}
      <BlockMath>{String.raw`\varepsilon = ${
        equationStore.data!.eps
      }`}</BlockMath>
    </div>
  );
});

export default Solution;
