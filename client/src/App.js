import logo from "./logo.svg";
import "./App.css";

import { TextField, Container } from "@mui/material";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetails from "./components/BookDetails";
import BookContainer from "./components/BookContainer";
import Loader from "./assets/Loader";
import { useSelector } from "react-redux";
import Log_Sign from "./components/Log_Sign";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3f8363",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/book/:id" element={<BookDetails />} />
          <Route exact path="/" element={<BookContainer />} />
          <Route path="/user/:id" element={<Log_Sign />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
