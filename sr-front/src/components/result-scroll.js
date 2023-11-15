import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';


ReulstsScroll.propTypes = {
  items: PropTypes.List
};

ResultItem.propTypes = {
  item: PropTypes.object,
  isBirthday: PropTypes.bool
};

function ResultItem({item, isBirthday}){
  const bDate = item.birthday.toLocaleDateString('ru-Ru', { day:'numeric', month:'short'});
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



export default function ReulstsScroll({items}){
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