import { createStyles, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../stores/RootContext';

interface IProps {}

const useStyles = makeStyles(theme => createStyles({}));

const Solution = observer<IProps>(function SolutionComponent() {
  const classes = useStyles();
  const { integralStore } = useStore();

  return <div>hi there</div>;
});

export default Solution;
