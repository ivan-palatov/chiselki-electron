import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider
} from "@material-ui/core";
import React from "react";
import TitleBar from "./components/TitleBar";
import Routes from "./Routes";

interface IProps {}

const theme = createMuiTheme({});

const App: React.FC<IProps> = () => {
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <TitleBar />
        <Routes />
      </MuiThemeProvider>
    </>
  );
};

export default App;
