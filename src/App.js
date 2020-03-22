import React from 'react';
import { Provider } from "react-redux";
import store from "./Store";
import TodoApp from "./TodoApp/TodoApp";
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

export default App;
