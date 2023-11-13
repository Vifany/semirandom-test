import './App.css';
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import MainPage from './components/main-page';
import theme from './Theme';




function App() {
  return (
    <div className="App">
      <ThemeProvider theme = {theme}>
        <CssBaseline/>
        <MainPage/>
      </ThemeProvider >
    </div>
  );
}

export default App;
