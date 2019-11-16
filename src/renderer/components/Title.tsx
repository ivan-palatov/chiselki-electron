import { createStyles, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Link from './Link';

interface IProps {
  title: string;
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
      position: 'relative',
      width: '100%',
    },
    title: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      textAlign: 'center',
    },
    link: {
      marginRight: theme.spacing(2),
    },
  })
);

const Title = observer<IProps>(function TitleComponent({ title }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.title}>
        {title}
      </Typography>
      <Link to="/" color="primary" variant="subtitle2" className={classes.link}>
        Назад
      </Link>
    </div>
  );
});

export default Title;
