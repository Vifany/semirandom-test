import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Box,
  Stack
} from '@mui/material';
import{ 
  useNavigate
} from 'react-router-dom';

ReulstsScroll.propTypes = {
  items: PropTypes.List,
  sortBirthday: PropTypes.bool,
};

ResultItem.propTypes = {
  item: PropTypes.object,
  isBirthday: PropTypes.bool
};

function ResultItem({item, isBirthday}){
  const navigate = useNavigate();
  const linkTo = `/user/${item.id}`;
  const handleLink = ()=> navigate(linkTo);

  const bDate = item.birthday.toLocaleDateString('ru-Ru', { day:'numeric', month:'short', year:'numeric'});
  const prim = (isBirthday? (<Typography ml='2rem'  noWrap align='right' variant='caption' inline > {bDate}</Typography>):'');
  return(
    <ListItem onClick={handleLink}>
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



export default function ReulstsScroll({items,sortBirthday}){

  const today = new Date();
  if (items.length == 0){
    return(
      <Box
        display='flex'
        justifyContent = 'center'
        alignContent = 'center'
        marginTop = {50}
      >
        <Stack>
          <Typography variant='h3'>
            Тут нет даже куриц
          </Typography>
          <Typography variant='h5'>
            Поробуйте ввести другой запрос
          </Typography>
        </Stack>

      </Box>
    );
  }

  return(
    <div>
      <List>
        {items.map(function (item){
          if (item['isSeparator']==true){
            return(
              <div key={item.id}>
                <Divider key={item.id}>{today.getFullYear()+1}</Divider>
              </div>
            );
          }else if (item['isSeparator']!=true){
            return(
              <ResultItem key={item.id} item = {item} isBirthday={sortBirthday}/>);}
        })}
      </List>
    </div>
  );

}