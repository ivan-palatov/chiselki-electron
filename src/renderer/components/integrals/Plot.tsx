import { createStyles, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Plotly from 'react-plotly.js';
import { useStore } from '../../stores/RootContext';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      marginBottom: theme.spacing(2),
    },
  })
);

const Plot = observer(function PlotComponent() {
  const classes = useStyles();
  const { integralStore } = useStore();

  return (
    <div className={classes.root}>
      <Plotly
        className={classes.root}
        useResizeHandler
        data={[
          integralStore.f!.getPlotData(
            integralStore.range[0] - 0.1,
            integralStore.range[1] + 0.1
          ),
        ]}
        layout={{
          title: 'График подинтегральной функции',
          xaxis: { title: 'x' },
          yaxis: { title: 'y' },
          autosize: true,
        }}
      />
    </div>
  );
});

export default Plot;
