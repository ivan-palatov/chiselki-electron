import { createStyles, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Func } from '../common/Func';
import Form from '../components/equations/Form';
import Title from '../components/Title';
import { Chords } from '../equations/Chords';
import { Dichotomy } from '../equations/Dichotomy';
import { Iteration } from '../equations/Iteration';
import { Newton } from '../equations/Newton';

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

  const f = new Func('x^3+3*x^2+6*x-1');
  console.log(new Iteration(new Func('(1-x^3+3*x^2)/6'), 0.2, 0.000001).calc());
  console.log(new Dichotomy(f, 0, 1, 0.00001).calc());
  console.log(new Chords(f, 0, 1, 0.00001).calc());
  console.log(new Newton(f, 0, 1, 0.00001).calc());

  return (
    <div className={classes.root}>
      <Title title="Решение уравнений" />
      <Form />
    </div>
  );
});

export default Equations;
