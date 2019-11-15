import { createStyles, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react-lite';
import React from 'react';
// @ts-ignore
import { BlockMath } from 'react-katex';
import { Base } from '../../integrals/classes/Base';
import { useStore } from '../../stores/RootContext';

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
    },
  })
);

const Solution = observer<IProps>(function SolutionComponent({ quad }) {
  const classes = useStyles();
  const { integralStore } = useStore();

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
          }}${integralStore.f!.LaTeX()}\,dx = ${quad.calc()}`}
        </BlockMath>
      </Typography>
      {quad.needRn && (
        <Typography variant="subtitle1">
          <BlockMath>{String.raw`R = ${quad.calcRn()}`}</BlockMath>
        </Typography>
      )}
      {quad.isGraphable && (
        <div>Почти график функции</div>
      )}
    </div>
  );
});

export default Solution;
