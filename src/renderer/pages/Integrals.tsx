import { createStyles, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import Input from '../components/Input';
import Select from '../components/Select';

const options = [
  {
    value: 'lrect',
    label: 'Левый прямоугольник',
  },
  {
    value: 'rrect',
    label: 'Правый прямоугольник',
  },
  {
    value: 'crect',
    label: 'Центральный прямоугольник',
  },
  {
    value: 'trapezi',
    label: 'Трапеция',
  },
  {
    value: 'simpson',
    label: 'Формула Симпсона',
  },
  {
    value: 'te',
    label: 'Три восьмых',
  },
  {
    value: 'gauss',
    label: 'Формула Гаусса',
  },
];

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    input: {
      width: 400,
      marginBottom: theme.spacing(2),
    },
  })
);

const validationSchema = yup.object({
  f: yup.string().required('Необходимо указать функцию'),
  a: yup
    .number()
    .required('Необходимо указать нижнюю границу')
    .lessThan(yup.ref('b'), 'Нижняя граница должна быть меньше верхней'),
  b: yup
    .number()
    .required('Необходимо указать верхнюю границу')
    .moreThan(yup.ref('a'), 'Верхняя граница должна быть больше нижней'),
  n: yup
    .number()
    .required('Необходимо указать количество разбиений')
    .integer('Число должно быть целым')
    .moreThan(0, 'Число разбиений не может быть меньше одного'),
  quad: yup.array().required('Необходимо выбрать метод'),
});

const Integrals: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Вычисление Интегралов
      </Typography>
      <Formik
        initialValues={{
          f: 'cos(cos(x)*x^2)',
          a: 5,
          b: 7,
          n: 10,
          quad: [],
        }}
        validationSchema={validationSchema}
        onSubmit={data => {
          console.log(data);
        }}
      >
        {data => (
          <Form className={classes.root} noValidate>
            <Input
              label="Подинтегральная функция"
              name="f"
              type="input"
              className={classes.input}
            />
            <Input
              label="Нижняя граница интегрирования"
              name="a"
              type="number"
              step={0.01}
              className={classes.input}
            />
            <Input
              label="Верхняя граница интегрирования"
              name="b"
              type="number"
              step={0.01}
              className={classes.input}
            />
            <Input
              label="Количество разбиений"
              helperText="Чем больше разбиений - тем точнее результат."
              name="n"
              type="number"
              min={1}
              max={100000}
              className={classes.input}
            />
            <Select
              label="Метод(ы) расчёта интеграла"
              name="quad"
              multiple
              options={options}
              className={classes.input}
            />
            <Button type="submit" color="primary" variant="contained">
              Вычислить
            </Button>
            <pre>{JSON.stringify(data, undefined, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Integrals;
