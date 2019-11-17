import { createStyles, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { PlotData } from 'plotly.js';
import React from 'react';
import Plotly from 'react-plotly.js';

interface IProps {
  data: Array<Partial<PlotData>>;
  title: string;
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '95%',
      height: '95%',
    },
  })
);

const Plot = observer<IProps>(function PlotComponent({ data, title }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Plotly
        data={data}
        className={classes.root}
        useResizeHandler
        layout={{
          title: {
            text: title,
            font: { family: 'Roboto' },
          },
          xaxis: { title: 'x' },
          yaxis: { title: 'y' },
          autosize: true,
          legend: { font: { family: 'Roboto' } },
          dragmode: 'pan',
        }}
      />
    </div>
  );
});

export default Plot;
