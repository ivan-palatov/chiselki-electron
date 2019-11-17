import { createStyles, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Form as FormikForm, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import * as yup from 'yup';
import { useStore } from '../../stores/RootContext';
import Input from '../Input';
import MultiSelect from '../MultiSelect';

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
      marginBottom: theme.spacing(3),
    },
    input: {
      width: 400,
      marginBottom: theme.spacing(2),
    },
    buttonsContainer: {
      width: 400,
      display: 'flex',
      justifyContent: 'space-around',
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

const Form = observer(function FormComponent() {
  const classes = useStyles();
  const { integralStore } = useStore();

  return (
    <Formik
      initialValues={{
        f: 'cos(cos(x)*x^2)',
        a: 5,
        b: 7,
        n: 10,
        quad: [] as string[],
      }}
      validationSchema={validationSchema}
      onSubmit={integralStore.handleSubmit}
    >
      {data => (
        <FormikForm className={classes.root} noValidate>
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
          <MultiSelect
            label="Метод(ы) расчёта интеграла"
            name="quad"
            multiple
            options={options}
            className={classes.input}
          />
          <div className={classes.buttonsContainer}>
            <Button type="submit" color="primary" variant="contained">
              Вычислить
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={data.resetForm as any}
            >
              Сбросить
            </Button>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
});

export default Form;
