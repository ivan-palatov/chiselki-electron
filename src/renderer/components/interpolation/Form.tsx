import { Button, createStyles, makeStyles } from '@material-ui/core';
import { Form as FormikForm, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
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

const Form = observer<IProps>(function FormComponent() {
  const classes = useStyles();
  const { interpStore } = useStore();

  return (
    <Formik
      initialValues={{
        f: 'sin(cos(exp(x)))',
        a: -2,
        b: 1,
        n: 3,
        type: 'lagr',
      }}
      onSubmit={interpStore.handleSubmit}
    >
      {data => (
        <FormikForm noValidate className={classes.root}>
          <Input
            label="Исходная функция"
            name="f"
            type="input"
            className={classes.input}
          />
          <Input
            label="Начало отрезка"
            name="a"
            type="number"
            className={classes.input}
          />
          <Input
            label="Конец отрезка"
            name="b"
            type="number"
            className={classes.input}
          />
          <Input
            label="Количество разбиений"
            name="n"
            type="number"
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
