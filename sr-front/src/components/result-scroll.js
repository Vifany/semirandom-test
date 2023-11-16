import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider
} from '@mui/material';


ReulstsScroll.propTypes = {
  items: PropTypes.List,
  sortBirthday: PropTypes.bool
};

ResultItem.propTypes = {
  item: PropTypes.object,
  isBirthday: PropTypes.bool
};

function ResultItem({item, isBirthday}){
  const bDate = item.birthday.toLocaleDateString('ru-Ru', { day:'numeric', month:'short', year:'numeric'});
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



export default function ReulstsScroll({items,sortBirthday}){

  if (sortBirthday){
    items.sort(((a, b) => b.birthday - a.birthday));
  }

  const today = new Date();

  return(
    <div>
      <List>
        {items.map(function (item){
          if ((item.birthday.getMonth() < today.getMonth()) && (item.birthday.getDay() < today.getDay())){
            return(
              <div key={item.id}>
                <Divider key={item.id}>{today.getFullYear()+1}</Divider>
                <ResultItem key={item.id} item = {item} isBirthday={true}/>
              </div>
            );
          }else{
            return(
              <ResultItem key={item.id} item = {item} isBirthday={true}/>);}
        })}
      </List>
    </div>
  );

}