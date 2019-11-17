import {
  createMuiTheme,
  createStyles,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
// @ts-ignore
import 'katex/dist/katex.min.css';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { withRouter } from 'react-router';
import TitleBar from './components/TitleBar';
import './main.css';
import Routes from './Routes';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      paddingTop: 40,
      height: '100vh',
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: 10,
      },
      '&::-webkit-scrollbar-track': {
        marginTop: 36,
        background: theme.palette.background.default,
      },
      '&::-webkit-scrollbar-thumb': {
        background: theme.palette.text.secondary,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.primary.dark,
      },
    },
  })
);

const themeObject = createMuiTheme({});

const App = observer(() => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={themeObject}>
        <TitleBar />
        <main className={classes.root}>
          <Routes />
        </main>
      </MuiThemeProvider>
    </>
  );
});

export default withRouter(App);
