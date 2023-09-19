import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <main>
      <div className="main" />

      <div className="app">
        <Dashboard />
        <ToastContainer />
      </div>
    </main>
  );
};

export default App;
