import './App.css';
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import MainPage from './components/main-page';
import theme from './Theme';

import {
  QueryClient,
  QueryClientProvider,}
  from '@tanstack/react-query';

const queryClient = new QueryClient();


function App() {
  return (
    <div className="App">
      <ThemeProvider theme = {theme}>
        <CssBaseline/>
        <QueryClientProvider client={queryClient}>
          <MainPage/>
        </QueryClientProvider>
      </ThemeProvider >
    </div>
  );
}

export default App;
