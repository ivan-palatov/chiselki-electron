import { createStyles, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { withRouter } from 'react-router';
import Link from '../components/Link';
import { Euler } from '../koshy/Euler';
import { Runge } from '../koshy/Runge';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
  })
);

const Index = observer(() => {
  const classes = useStyles();

  const euler = new Euler('(y^2 - 1)/x', 0.1, 1, 0.1, 0);
  console.log('Эйлер: ');
  console.log(euler.calc());
  console.log(euler.calcBetter(0.00001));
  const runge = new Runge('(y^2 - 1)/x', 0.1, 1, 0.1, 0);
  console.log('Рунге: ');
  console.log(runge.calc());

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Выберите раздел
      </Typography>
      <Link to="/interpolation" variant="h6">
        Восстановление функции по узлам интерполяции
      </Link>
      <Link to="/integrals" variant="h6">
        Вычисление интегралов
      </Link>
      <Link to="/equations" variant="h6">
        Нахождение корней уравнений
      </Link>
    </div>
  );
});

export default withRouter(Index);
