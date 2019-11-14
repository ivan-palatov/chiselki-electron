import { createStyles, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Link from '../components/Link';

interface IProps {}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      // overflowY: "clip"
    },
  })
);

const Index: React.FC<IProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Выберите раздел
      </Typography>
      <Link to="/" variant="h6">
        Восстановление функции по узлам интерполяции
      </Link>
      <Link to="/integrals" variant="h6">
        Вычисление интегралов
      </Link>
      <Link to="/" variant="h6">
        Нахождение корней уравнений
      </Link>
    </div>
  );
};

export default Index;
