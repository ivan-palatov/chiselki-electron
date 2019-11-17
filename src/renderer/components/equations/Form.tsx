import { Button, createStyles, makeStyles } from '@material-ui/core';
import { Form as FormikForm, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import * as yup from 'yup';
import { equationMethods } from '../../stores/EquationStore';
import { useStore } from '../../stores/RootContext';
import Input from '../Input';
import Select from '../Select';

const validationSchema = yup.object({
  f: yup.string().required('Необходимо указать функцию f(x)'),
  a: yup
    .number()
    .lessThan(yup.ref('b'), 'Нижнее значение должно быть меньше верхнего'),
  b: yup
    .number()
    .moreThan(yup.ref('a'), 'Верхнее значение должно быть больше нижнего'),
  eps: yup.number().positive('&#949; должно быть положительным'),
});

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

const Form = observer(function FormComponent() {
  const classes = useStyles();
  const { equationStore } = useStore();

  return (
    <Formik
      initialValues={{
        f: 'x^3+3*x^2+6*x-1',
        a: 0,
        b: 1,
        eps: 1e-6,
        type: 'dichotomy',
      }}
      validationSchema={validationSchema}
      onSubmit={equationStore.handleSubmit}
    >
      {data => (
        <FormikForm noValidate className={classes.root}>
          <Input
            label="Функция f(x) уравнения f(x) = 0"
            name="f"
            type="input"
            className={classes.input}
          />
          <Input
            label="Нижнее значение интервала"
            name="a"
            type="number"
            className={classes.input}
          />
          <Input
            label="Верхнее значение интервала"
            name="b"
            type="number"
            className={classes.input}
          />
          <Input
            label="Допустимая погрешность &#949;"
            name="eps"
            type="number"
            min={0}
            className={classes.input}
          />
          <Select
            name="type"
            type="select"
            label="Метод вычисления"
            className={classes.input}
            options={equationMethods}
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
