import {
  Button,
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider
} from "@material-ui/core";
import React from "react";

interface IProps {}

const theme = createMuiTheme({});

const App: React.FC<IProps> = () => {
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <header>Шапка</header>
        <main>HI THERE</main>
        <Button color="primary">IT WORKS!</Button>
      </MuiThemeProvider>
    </>
  );
};

export default App;
