import { Button, createStyles, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
// @ts-ignore
import { BlockMath } from 'react-katex';
import { Base } from '../../integrals/classes/Base';
import { useStore } from '../../stores/RootContext';
import Plot from '../Plot';

interface IProps {
  quad: Base;
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: theme.spacing(3),
      width: '100%',
      height: '100%',
    },
    plot: {
      width: '90%',
      height: '90%',
    },
  })
);

const Solution = observer<IProps>(function SolutionComponent({ quad }) {
  const classes = useStyles();
  const { integralStore } = useStore();
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(s => !s);
  }

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h5" gutterBottom>
        {quad.label}
      </Typography>
      <Typography>
        Количество разбиений: <b>{quad.n}</b>
      </Typography>
      <Typography variant="subtitle1">
        <BlockMath>
          {String.raw`\int_{${quad.a}}^{${
            quad.b
          }}${integralStore.f!.LaTeX()}\,dx \approx ${quad.calc()}`}
        </BlockMath>
      </Typography>
      {quad.needRn && (
        <Typography variant="subtitle1">
          <BlockMath>{String.raw`R = ${quad.calcRn()}`}</BlockMath>
        </Typography>
      )}
      {quad.isGraphable && (
        <Button variant="contained" color="primary" onClick={toggleShow}>
          {show ? 'Скрыть график' : 'Показать график'}
        </Button>
      )}
      {show && (
        <Plot
          data={[
            integralStore.f!.getPlotData(quad.a - 0.1, quad.b + 0.1),
            ...quad.getPlotData(),
          ]}
          title="Геометрическая интерпрeтация"
        />
      )}
    </div>
  );
});

export default Solution;
