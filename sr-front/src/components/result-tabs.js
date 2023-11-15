import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  Box,
} from '@mui/material';


ResultTabs.propTypes = {
  setFilter: PropTypes.func,
  value: PropTypes.string,
  tabList: PropTypes.object
};


export default function ResultTabs({setFilter, value, tabList}){
 
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
        {Object.entries(tabList).map(([key, value]) => (  
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

