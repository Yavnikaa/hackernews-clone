import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';

import NewsList from "./List";

import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import './App.css';

function HelloEmoji() {
  return (
  <span aria-label="hi"  role="img">
  👋🏼
  </span>
)};


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Home() {
  const [newsItems, setNewsItems]= useState([])
  const [page, setPage] = useState(1)
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePageChange = ( event , value) => {
    setPage(value);
  };

  const getLatestNewsItems=()=>{
    axios
    .get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page - 1}`)
    .then(response => {
      const news = response.data.hits;
      setNewsItems(news);
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    getLatestNewsItems()
  }, [page])

  return (
    <div>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example" centered>
          <Tab label="Latest" {...a11yProps(0)} />
          <Tab label="Past" {...a11yProps(1)} />
          <Tab label="Comments" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
      <NewsList listData={newsItems}></NewsList>

         <Stack spacing={2} className="pagination">
          <Pagination count={10} variant="outlined" shape="rounded" page={page} onChange={handlePageChange}/>
        </Stack>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <HelloEmoji/> Hello from the other side!
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
      <HelloEmoji/>  Hello, again!
      </TabPanel>
      </Box>
    </div>
  );
}

export default Home;
