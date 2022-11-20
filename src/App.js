
import React from 'react';

import { BrowserRouter as Router, Routes, 
  Route, Redirect,} from "react-router-dom";

import Home from "./Home"
import Search from "./Search"
import Header from "./Header"

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#fc6456',
      },
      secondary: {
        main: '#f44336',
      },
    },
});

function App() {
  return (
    <>
    <Router>
      <ThemeProvider theme={theme}> 
    <Header></Header>
      <Routes>
      <Route exact path="/"  element={<Home />}  />
      <Route path="/search/" element={<Search />} />
      </Routes>
      </ThemeProvider>
    </Router>
    </>
  )
}

export default App;