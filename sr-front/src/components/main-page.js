import React from 'react';
import {
  AppBar,
  OutlinedInput,
  Paper,
  FormControl,
  FormControlLabel,
  Stack,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  Radio,
  RadioGroup
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

const today = new Date();

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

const sortColumns=[
  'alphabet',
  'birthday'

];


SearchInpunt.propTypes = {
  searchHandler: PropTypes.func,
  searchValue: PropTypes.string,
  sortButtonHandler: PropTypes.func,
};


function SearchInpunt({
  searchHandler,
  searchValue,
  sortButtonHandler }){
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
              onClick = {sortButtonHandler}
            >
              <SortIcon fontSize="inherit"/>
            </IconButton> 
          }
        />
      </FormControl>
    </Paper>
  );
}


BirthdaySwitcher.propTypes = {
  isOpen: PropTypes.bool,
  sortHandler: PropTypes.func,
  sortType: PropTypes.oneOf(sortColumns),
  closeHandler: PropTypes.func,
};

function BirthdaySwitcher(
  {
    isOpen,
    sortHandler,
    sortType,
    closeHandler
  }){
  return(
    <Dialog
      onClose={closeHandler}
      open = {isOpen}
    >
      <DialogTitle>Сортировка по:</DialogTitle>
      <FormControl>
        <RadioGroup
          value={sortType}
          onChange = {sortHandler}
        >
          <FormControlLabel value="alphabet" control={<Radio />} label="По алфавиту" />
          <FormControlLabel value="birthday" control={<Radio />} label="По дню рождения" />
        </RadioGroup>
      </FormControl>
    </Dialog>
  );
}








export default function MainPage(){
  // const queryClient = useQueryClient();
  const [filterQuery, setFilter] = React.useState('all');
  const [searchQuery, setSearch] = React.useState('');
  const [sortOpen, setOpen] = React.useState('');
  const [sortType, setSort] = React.useState('alphabet');
  function sortHandler(e){
    setSort(e.target.value);
  }
  function openHandler(){
    setOpen(true);
  }
  function closeHandler(){
    setOpen(false);
  }
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

  

  const workList = data['items']?.map(obj => { return { ...obj, birthday: new Date(obj.birthday) }; });
  
    
  const filetedList = (filterQuery =='all' ? 
    workList : workList.filter((item) => item.department === filterQuery));


  //Search wörking, bitch!
  const searchedList = (searchQuery == '' ?
    filetedList : filetedList.filter((item) => 
      item.firstName.toLowerCase().startsWith(searchQuery) ||
      item.lastName.toLowerCase().startsWith(searchQuery) ||
      item.userTag.toLowerCase().startsWith(searchQuery)
    ));

  // const result = (function () {
  //   switch (step) {
  //     case Step.One:
  //       return { one: 1 };
  //     case Step.Two:
  //       return { two: 2 };
  //     case Step.Three:
  //       return { three: 4 };
  //   }
  // })();

  const scrollList = (
    function (){
      switch(sortType){
      case 'alphabet':
        return(searchedList.sort(
          (a, b) => a.firstName.localeCompare(b.firstName)
        ));
      case 'birthday':
        return(searchedList.sort(
          (a, b) => (today - a.birthday) - (today-b.birthday)
        ));
      }
    }
  )();
  
  console.log(scrollList);
  
  

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
            <SearchInpunt 
              searchHandler={handleSearch} 
              searchValue={searchQuery}
              sortButtonHandler={openHandler}
            />
            <ResultTabs tabList={tabDict} setFilter={setFilter} value ={filterQuery}/>
            
          </Stack>
        </AppBar>

      </Box>
      <BirthdaySwitcher 
        isOpen = {sortOpen} 
        sortHandler = {sortHandler} 
        sortType = {sortType}
        closeHandler = {closeHandler}
      />
      <Box>
        <ReulstsScroll items = {scrollList}  />
      </Box>
    </div>
  );
}