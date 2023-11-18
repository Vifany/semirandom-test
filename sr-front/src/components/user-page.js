import React from 'react';
import PropTypes from 'prop-types';
import CallIcon from '@mui/icons-material/Call';
import CakeIcon from '@mui/icons-material/Cake';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { 
  Stack,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  AppBar,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  IconButton,
  Toolbar,
  Divider
} from '@mui/material';

import{ 
  useNavigate
} from 'react-router-dom';

import {
  useQueryClient,
} from '@tanstack/react-query';

import{
  useParams,
} from 'react-router-dom';

UserPage.propTypes = {
  id: PropTypes.string,
};


export default function UserPage(){
  const params = useParams();
  const queryClient = useQueryClient();
  
  const data = queryClient.getQueryData(['Emploees']);
  const item = data['items'].filter((item) => item.id === params.userId)[0];
  const bday = new Date(item.birthday).toLocaleDateString('ru-Ru', { day:'numeric', month:'short', year:'numeric'});
  const navigate = useNavigate();
  const handleLink = ()=> navigate('/');

  return(
    <div>
      <AppBar elevation={0}>
        <Toolbar>
          <IconButton alignContent='left' justifyContent='left' onClick={handleLink}>
            <ArrowBackIcon/>
          </IconButton>
        </Toolbar>
        
      </AppBar>
      <Box
        display = 'flex'
        justifyContent='center'
        alignContent='center'
        sx={{
          marginTop: 7,
          backgroundColor: 'primary.main'
        }}
      >
        <Stack>
          <Avatar 
            display = 'flex'
            sx={{ 
              marginTop: 1,
              width: 120, 
              height: 120,
              alignSelf: 'center'
            }}
            alt={item.firstName} 
            src = {item.avatarUrl}/>
          <Typography variant='h5'>
            {item.firstName} {item.lastName}<br/>
          </Typography>
          <Typography variant ='caption'>
            {item.department}
          </Typography>
        </Stack>
        
      </Box>
      <List 
        sx={{
          backgroundColor:'secondary.main'
        }}
      >

        <ListItem>
          <ListItemButton disableGutters href={`tel:${item.phone}`}>
            <ListItemIcon>
              <CallIcon />
            </ListItemIcon>
            {item.phone}
          </ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemText>
            <ListItemIcon>
              <CakeIcon />
            </ListItemIcon>
            {bday}
          </ListItemText>
          
        </ListItem>
      </List>
    </div>
  );

}