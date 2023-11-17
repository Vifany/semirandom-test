import React from 'react';
import PropTypes from 'prop-types';
import { 
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  Stack,
  ListItemText,
  ListItemButton
} from '@mui/material';

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
  

  return(
    <Box
      display = 'flex'
      justifyContent='center'
      alignContent='center'
      margin={1}
    >
      <Card
        display = 'flex'
        sx={{         
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        
      >
        <CardContent
          sx={{
            backgroundColor: 'primary.main',
            width: '100%'
          }}
          display = 'flex'
          alignContent='center'
        >
          <Stack>
            <Avatar 
              display = 'flex'
              sx={{ 
                width: 120, 
                height: 120,
                alignSelf: 'center'
              }}
              alt={item.firstName} 
              src = {item.avatarUrl}/>
            <Typography>{item.firstName} {item.lastName} <br/>
              {item.department}
            </Typography>
          </Stack>
        </CardContent>
        <CardContent 
          sx = {{
            display: 'flex',
            alignContent: 'left'
          }}
        >
          <List >
            <ListItem>
              <ListItemButton href={`tel:${item.phone}`}>
                {item.phone}
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemText>
                {bday}
              </ListItemText>
              
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );

}