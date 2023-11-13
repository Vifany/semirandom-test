import React from 'react';
import {
  AppBar,
  OutlinedInput,
  Paper,
  FormControl,
  Stack,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Box
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';

function SearchInpunt(){
  return(
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignContent:'center',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      <FormControl fullWidth>
        <OutlinedInput
          placeholder='Введите имя, почту, тег'
          size='small'
          startAdornment ={
            <IconButton 
              size="large"
            >
              <SearchIcon fontSize="inherit"/>
            </IconButton>
          }
          endAdornment={
            <IconButton 
              size="large"
            >
              <SortIcon fontSize="inherit"/>
            </IconButton> 
          }
        />
      </FormControl>
    </Paper>
  );
}

function ReulstsScroll(){


}


function ResultTabs(){
  const [value, setValue] = React.useState('all');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabDict = {
    all: 'Все',
    android: 'Android',
    ios: 'iOS',
    design: 'Дизайн',
    management:  'Менеджмент',
    qa: 'QA',
    back_office: 'Бэк-офис',
    frontend: 'Frontend',
    hr: 'HR',
    pr: 'PR',
    backend: 'Backend',
    support: 'Техподдержка',
    analytics: 'Аналитика'
  };



  return(
    <Box 
      sx={{ 
        width: '100%',
        display: 'flex',
        alignContent:'left'
      }}
    >
      <Tabs
        variant="scrollable"
        scrollButtons = 'auto'
        indicatorColor='white'
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        {Object.entries(tabDict).map(([key, value]) => (  
          <Tab 
            value={key} 
            label={value} 
            key= {key}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default function MainPage(){


  return(
    <div>
      <AppBar
        color= 'secondary'
        display = 'flex'
        width = '100%'
      >
        <Stack>
          <Typography
            marginLeft = '1em'
            variant='h5'
            textAlign='left'
          >
            Поиск 
          </Typography>  
          <SearchInpunt/>
          <ResultTabs/>
          <ReulstsScroll/>
        </Stack>
      </AppBar>

    </div>
  );
}