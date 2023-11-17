import './App.css';
import React from 'react';



import { 
  BrowserRouter, 
  Routes, 
  Route,
} from 'react-router-dom';

import { 
  ThemeProvider, 
  CssBaseline 
} from '@mui/material';

import MainPage from './components/main-page';
import UserPage from './components/user-page';
import theme from './Theme';

import {
  QueryClient,
  QueryClientProvider,
  useQuery
}from '@tanstack/react-query';

import axios from 'axios';







function App() {

  const queryC = new QueryClient();
  return (
    <div className="App">  
      <QueryClientProvider 
        client={queryC}
      >
        <Stuffing/>
      </QueryClientProvider>
    </div>
  );
}

function Stuffing(){
  const fetchEmploees = () =>
    axios
      .get('https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users',
        {
          params:{
            '__example':'all',
            // '__dynamic': 'true'
          },
          headers:{
            'Accept': 'application/json, application/xml'
          }
        })
      .then((res) => res.data);


  const { error, isLoading} = useQuery({ 
    queryKey: ['Emploees'],
    queryFn: fetchEmploees, 
  });


  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading...</p>;
  return(
    <ThemeProvider theme = {theme}>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/user/:userId" element={<UserPage/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider >
  );
}

export default App;
