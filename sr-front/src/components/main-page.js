import React from 'react';
import PropTypes from 'prop-types';
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
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
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

function ResultItem({item}){

  return(
    <ListItem>
      <ListItemAvatar >
        <Avatar alt={item.firstName} src = {item.avatarUrl}/>
      </ListItemAvatar>
      <ListItemText primary={item.firstName + ' ' + item.lastName} secondary={item.department} />
    </ListItem>
  );
}

ResultItem.propTypes = {
  item: PropTypes.Object
};

function ReulstsScroll({items}){

  return(
    <div>
      <List>
        {items.map((item) => (  
          <ResultItem key={item.id} item = {item} />
        ))}
      </List>
    </div>
  );

}

ReulstsScroll.propTypes = {
  items: PropTypes.List
};



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
        // indicatorColor='#fff'
        value={value}
        onChange={handleChange}
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
  const exampleList = [
    {
      'id': '497f6eca-6276-4993-bfeb-53qweca',
      'avatarUrl': 'https://loremflickr.com/320/240/dog?random=1',
      'firstName': 'John',
      'lastName': 'Doe',
      'userTag': 'jd',
      'department': 'android',
      'position': 'developer',
      'birthday': '1973-01-24',
      'phone': '+79001234567'
    },
    {
      'id': '497f6eca-6276-4993-bfeb-53gasfaf08',
      'avatarUrl': 'https://loremflickr.com/320/240/girl?random=1',
      'firstName': 'Mike',
      'lastName': 'Smith',
      'userTag': 'ms',
      'department': 'ios',
      'position': 'IOS developer',
      'birthday': '1992-04-14',
      'phone': '+79001234512'
    },];

  return(
    <div>
      <Box 
        sx={{ 
          marginBottom:16
        }}>
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
            
          </Stack>
        </AppBar>

      </Box>
      <Box>
        <ReulstsScroll items = {exampleList}/>
      </Box>
    </div>
  );
}