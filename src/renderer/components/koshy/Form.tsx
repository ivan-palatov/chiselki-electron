import { createStyles, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Form as FormikForm, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import * as yup from 'yup';
import { useStore } from '../../stores/RootContext';
import Input from '../Input';

interface IProps {}

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
    .lessThan(yup.ref('b'), 'Начало отрезка должно быть меньше конца'),
  b: yup
    .number()
    .moreThan(yup.ref('a'), 'Конец отрезка должен быть больше начала'),
  h: yup.number().moreThan(0, 'Шаг сетки должен быть больше нуля'),
  y0: yup.number().required('Необходимо указать значение y(a)'),
  eps: yup.number().moreThan(0, 'Погрешность должна быть больше нуля'),
});

const Form = observer<IProps>(function FormComponent() {
  const classes = useStyles();
  const { koshyStore } = useStore();

  return (
    <Formik
      initialValues={{
        f: '(y^2 - 1)/x',
        a: 0.1,
        b: 1,
        h: 0.1,
        y0: 0,
        eps: 0.00001,
      }}
      onSubmit={koshyStore.handleSubmit}
      validationSchema={validationSchema}
    >
      {data => (
        <FormikForm noValidate className={classes.root}>
          <Input
            label="Функция f(x,y) из условия y' = f(x, y)"
            name="f"
            type="input"
            className={classes.input}
          />
          <Input
            label="Начало отрезка"
            name="a"
            type="number"
            step={0.1}
            className={classes.input}
          />
          <Input
            label="Конец отрезка"
            name="b"
            type="number"
            step={0.1}
            className={classes.input}
          />
          <Input
            label="Шаг сетки"
            name="h"
            type="number"
            step={0.1}
            className={classes.input}
          />
          <Input
            label={`Значение y(${data.values.a})`}
            name="y0"
            type="number"
            step={0.1}
            className={classes.input}
          />
          <Input
            label="Погрешность &#949;"
            name="eps"
            type="number"
            helperText="Используется только для метода Эйлера"
            className={classes.input}
          />
          <div className={classes.buttonsContainer}>
            <Button type="submit" color="primary" variant="contained">
              Построить
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
