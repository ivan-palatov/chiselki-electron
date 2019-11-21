import { createStyles, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import Link from '../components/Link';
import { Koshy } from '../koshy/Koshy';

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

  useEffect(() => {
    const koshy = new Koshy('(y^2 - 1)/x', 0.1, 1, 0.1, 0);
    console.log('Эйлер:');
    console.log(koshy.calcEuler(0.000001));
    console.log('Рунге:');
    console.log(koshy.calcRunge());
    console.log('Адамс:');
    console.log(koshy.calcAdams());
  }, []);

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
