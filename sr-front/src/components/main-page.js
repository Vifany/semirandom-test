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
import axios from 'axios';

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

function ResultItem({item, isBirthday}){
  const dDate = new Date(item.birthday);
  const bDate = dDate.toLocaleDateString('ru-Ru', { day:'numeric', month:'short'});
  const prim = (isBirthday? (<Typography ml='2rem'  noWrap align='right' variant='caption' inline > {bDate}</Typography>):'');

  return(
    <ListItem>
      <ListItemAvatar >
        <Avatar alt={item.firstName} src = {item.avatarUrl}/>
      </ListItemAvatar>
      <ListItemText  display = 'flex' width = '100%'
        primary={
          <div style={{
            display:'flex',
            width: '100%',
            alignItems: 'left'
          }}>
            <Typography inline  noWrap>
              {item.firstName} {item.lastName}
            </Typography>
            <Typography ml='2rem' variant='caption' inline  noWrap >
              {item.userTag}
            </Typography>
          </div>
        } 
        secondary={item.position}/>
      <ListItemText align='right'  display = 'flex' width = '100%'
        primary={
          <div>
            {prim}
          </div>
        }
      />
    </ListItem>
  );
}

ResultItem.propTypes = {
  item: PropTypes.object,
  isBirthday: PropTypes.bool
};

function ReulstsScroll({items}){

  return(
    <div>
      <List>
        {items.map((item) => (  
          <ResultItem key={item.id} item = {item} isBirthday={true} />
        ))}
      </List>
    </div>
  );

}

ReulstsScroll.propTypes = {
  items: PropTypes.List
};



function ResultTabs({setFilter, value}){
 
  const handleChange = (event, newValue) => {
    setFilter(newValue);
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

ResultTabs.propTypes = {
  setFilter: PropTypes.func,
  value: PropTypes.string
};

export default function MainPage(){
  // const queryClient = useQueryClient();
  const [filterQuery, setFilter] = React.useState('all');

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

  const workList = data['items'];
    
  const scrollList = (filterQuery =='all' ? 
    workList : workList.filter((item) => item.department === filterQuery));

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
            <ResultTabs setFilter={setFilter} value ={filterQuery}/>
            
          </Stack>
        </AppBar>

      </Box>
      <Box>
        <ReulstsScroll items = {scrollList} />
      </Box>
    </div>
  );
}