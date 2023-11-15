import React from 'react';
import {
  AppBar,
  OutlinedInput,
  Paper,
  FormControl,
  Stack,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';

import ReulstsScroll from './result-scroll';
import ResultTabs from './result-tabs';


import {
  useQuery,
  // useQueryClient,
} from '@tanstack/react-query';


import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';



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


SearchInpunt.propTypes = {
  searchHandler: PropTypes.func,
  searchValue: PropTypes.string
};


function SearchInpunt({searchHandler,searchValue }){
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
          onChange={searchHandler}
          value={searchValue}
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











export default function MainPage(){
  // const queryClient = useQueryClient();
  const [filterQuery, setFilter] = React.useState('all');
  const [searchQuery, setSearch] = React.useState('');

  function handleSearch(e) {
    setSearch(e.target.value.toLowerCase());
  }

  const fetchEmploees = () =>
    axios
      .get('https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users',
        {
          params:{
            // '__example':'all',
            '__dynamic': 'true'
          },
          headers:{
            'Accept': 'application/json, application/xml'
          }
        })
      .then((res) => res.data);

  const { data, error, isLoading } = useQuery({
    queryKey: ['Emploees'],
    queryFn: fetchEmploees,
  });

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading...</p>;

  console.log(data);

  const workList = data['items']?.map(obj => { return { ...obj, birthday: new Date(obj.birthday) }; });
  
    
  const filetedList = (filterQuery =='all' ? 
    workList : workList.filter((item) => item.department === filterQuery));


  //Search wörking, bitch!
  const scrollList = (searchQuery == '' ?
    filetedList : filetedList.filter((item) => 
      item.firstName.toLowerCase().startsWith(searchQuery) ||
      item.lastName.toLowerCase().startsWith(searchQuery) ||
      item.userTag.toLowerCase().startsWith(searchQuery)
    ));

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
            <SearchInpunt searchHandler={handleSearch} searchValue={searchQuery}/>
            <ResultTabs tabList={tabDict} setFilter={setFilter} value ={filterQuery}/>
            
          </Stack>
        </AppBar>

      </Box>
      <Box>
        <ReulstsScroll items = {scrollList} />
      </Box>
    </div>
  );
}