import React from "react";
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useSearchParams } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import NewsList from "./List";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const SearchResults = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let datenow = Math.round(Date.now() / 1000)

  const navigate = useNavigate();
  const searchQuery=searchParams.get("query")
  const [value, setValue] = useState([null, null]);
  const [searchType, setSearchType] = useState("story")
  const [sortType, setSortType] = useState("search")
  const [selectedValue, setSelectedValue] = useState("1");
  const [dateFilter, setDateFilter] = useState("created_at_i<="+datenow);
  const [searchResults, setSearchResults]= useState([]);
  const [showCalendar, setShowCalendar] = useState(true);
  const [page, setPage] = useState(1)

  const handleTypeChange = (event) => {
    setSearchType(event.target.value);
  };
 
  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value==="2"){
      setDateFilter("created_at_i>="+ (datenow - (24*60*60)));
    } else if (event.target.value==="3"){
      setDateFilter("created_at_i>="+ (datenow - (24*60*60*7)));
    } else if (event.target.value==="4"){
      setDateFilter("created_at_i>="+ (datenow - (24*60*60*30)));
    } else if (event.target.value==="5"){
      setDateFilter("created_at_i>="+ (datenow - (24*60*60*365)));
    } else if (event.target.value==="1"){
      setDateFilter("created_at_i<="+datenow)
    } else if (event.target.value==="6"){
      setShowCalendar(true);
    }
  };

  const getSearchResults=()=>{
    axios
    .get(`https://hn.algolia.com/api/v1/${sortType}?query=${searchQuery}&tags=${searchType}&numericFilters=${dateFilter}&page=${page - 1}`)
    .then(response => {
      const results = response.data.hits;
      setSearchResults(results);
    })
    .catch(error => console.log(error));
  }

  const handlePageChange = ( event , value) => {
    setPage(value);
  };
  
  useEffect(() => {
    getSearchResults();
    if (searchType.length>0){
      navigate(`/search/?query=${searchQuery}&type=${searchType}&sortType=${sortType}&timePeriod=${dateFilter}`)
    }
  }, [searchParams, searchType, sortType, dateFilter, searchQuery, selectedValue, value, page])

  useEffect(() => {
    if (selectedValue === 6){
      setShowCalendar(true);
    }
  }, [selectedValue , showCalendar])

  return (
    <div>
      <div className="searchResults"> 
      <Typography variant="h5" mr={1}> Showing results for </Typography> 
      <Typography variant="h5" color="primary"> {searchParams.get("query")}</Typography>
      </div>
      <div className="searchFilters">
        <div className="filterDropdown"> 
      <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchType}
          label="Story"
          onChange={handleTypeChange}
        >
          <MenuItem value={"story"}>Story</MenuItem>
          <MenuItem value={"comment"}>Comments</MenuItem>
          <MenuItem value={"(story,comment)"}>All</MenuItem>
        </Select>
        </div>
        <div className="filterDropdown"> 
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortType}
          label="Popularity"
          onChange={handleSortChange}
        >
          <MenuItem value={"search"}>Popularity</MenuItem>
          <MenuItem value={"search_by_date"}>Date</MenuItem>
        </Select>
        </div>
        <div className="filterDropdown"> 
        <InputLabel id="demo-simple-select-label">Time Period</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label="All Time"
          onChange={handleTimeChange}
        >
          <MenuItem value="1"> All Time</MenuItem>
          <MenuItem value="2"> Last 24h </MenuItem>
          <MenuItem value="3"> Past week </MenuItem>
          <MenuItem value="4"> Past month </MenuItem>
          <MenuItem value="5"> Past year </MenuItem>
          <MenuItem value="6"> Custom Range </MenuItem>
        </Select>
        {
            selectedValue==="6" && showCalendar===true ? <div> 
            <LocalizationProvider dateAdapter={AdapterMoment}>
          <StaticDateRangePicker
            displayStaticWrapperAs="desktop"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onClick={() => { setValue([null, null])}}>Cancel</Button>
        <Button onClick={() => { 
          setDateFilter("created_at_i>" + value[0].format('X') + ",created_at_i<" + value[1].format('X'));
          setShowCalendar(false)}}> Apply</Button>
      </ButtonGroup>
        </div> : " "
          }
        </div>
        </div>
        <div className="results"> 
       <NewsList listData={searchResults}></NewsList> 
       </div>
       <Stack spacing={2} className="pagination">
          <Pagination count={10} variant="outlined" shape="rounded" page={page} onChange={handlePageChange}/>
        </Stack>
    </div>
  );
};
  
export default SearchResults;