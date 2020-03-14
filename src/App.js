import React from 'react';
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";

import trueLayerTodoTheme from "./theme";
import store from "./Store";

import TodoApp from "./TodoApp/TodoApp";
import './App.css';

const theme = createMuiTheme(trueLayerTodoTheme);

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
            <TodoApp />
        </Provider>
      </ThemeProvider>
  );
}

export default App;
