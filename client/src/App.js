import "./App.css";

import { Routes, Route } from "react-router-dom";

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import { Suspense, lazy } from "react";
// import BookDetails from "./components/BookDetails";
// import Books from "./components/Books";
import BookContainer from "./components/BookContainer";
import ProfilePage from "./components/ProfilePage";
import Alerts from "./components/Alerts";

const Log_Sign = lazy(() => import("./components/Log_Sign"));
// const BookContainer = lazy(() => import("../src/components/BookContainer"));
const BookDetails = lazy(() => import("./components/BookDetails"));
const Books = lazy(() => import("./components/Books"));
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3f8363",
      },
      secondary: {
        main: "#fff",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/book/:id" element={<BookDetails />} />
          <Route exact path="/" element={<BookContainer />} />
          <Route path="/user/:id" element={<Log_Sign />} />
        </Routes>
      </BrowserRouter> */}

      <Routes>
        <Route path="/" element={<BookContainer />}>
          <Route
            path="/:id"
            element={
              <Suspense>
                <Books />
              </Suspense>
            }
          />
          <Route
            path="/book/:id"
            element={
              <Suspense>
                <BookDetails />
              </Suspense>
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route
          path="/user/:id"
          element={
            <Suspense>
              <Log_Sign />
            </Suspense>
          }
        />
      </Routes>
      <Alerts/>
    </ThemeProvider>
  );
}

export default App;
