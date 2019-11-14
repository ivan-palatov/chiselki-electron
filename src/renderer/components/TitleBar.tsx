import { createStyles, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/CloseOutlined';
import FullscreenExit from '@material-ui/icons/FullscreenExitOutlined';
import Fullscreen from '@material-ui/icons/FullscreenOutlined';
import Minimize from '@material-ui/icons/MinimizeOutlined';
import Placeholder from '@material-ui/icons/PlaceTwoTone';
import { remote } from 'electron';
import React, { useState } from 'react';

interface IProps {}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: 36,
      width: '100%',
      zIndex: 1000,
      top: 0,
      overflow: 'hidden',
      position: 'fixed',
      display: 'flex',
      backgroundColor: theme.palette.primary.main,
      alignItems: 'center',
      justifyContent: 'space-between',
      color: theme.palette.primary.contrastText,
      '-webkit-app-region': 'drag',
    },
    exitButton: {
      '-webkit-app-region': 'no-drag',
      borderRadius: 0,
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    button: {
      '-webkit-app-region': 'no-drag',
      borderRadius: 0,
    },
    title: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  })
);

function minimize() {
  remote.getCurrentWindow().minimize();
}

function close() {
  remote.app.quit();
}

const TitleBar: React.FC<IProps> = () => {
  const classes = useStyles();
  const [isMaximized, setIsMaximized] = useState(false);

  function minMax() {
    const currWindow = remote.getCurrentWindow();

    if (currWindow.isMaximized()) {
      currWindow.unmaximize();
      setIsMaximized(false);
    } else {
      currWindow.maximize();
      setIsMaximized(true);
    }
  }

  return (
    <div className={classes.root}>
      <Placeholder />
      <Typography
        align="center"
        color="inherit"
        variant="subtitle1"
        className={classes.title}
      >
        Численные Методы
      </Typography>
      <span>
        <Button color="inherit" className={classes.button} onClick={minimize}>
          <Minimize />
        </Button>
        <Button color="inherit" className={classes.button} onClick={minMax}>
          {isMaximized ? <FullscreenExit /> : <Fullscreen />}
        </Button>
        <Button color="inherit" className={classes.exitButton} onClick={close}>
          <Close />
        </Button>
      </span>
    </div>
  );
};

export default TitleBar;
