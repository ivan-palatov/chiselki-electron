import {
  createMuiTheme,
  createStyles,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import TitleBar from './components/TitleBar';
import Routes from './Routes';

interface IProps {}

const theme = createMuiTheme({});

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingTop: 40,
      height: '100vh',
    },
  })
);

const App: React.FC<IProps> = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <TitleBar />
        <main className={classes.root}>
          <Routes />
        </main>
      </MuiThemeProvider>
    </>
  );
};

export default App;
