import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate, Link} from "react-router-dom"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Search from '@mui/icons-material/Search';

import './App.css';
import {ReactComponent as NewsLogo} from "./assets/newsLogo.svg"

function Header(){
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (searchQuery.length>0){
          navigate(`/search/?query=${searchQuery}`)
        }
    }, [searchQuery])

    return (
        <div className='header'> 
        <Link to="/" className='logo-link'> <div className='logo' onClick={()=> {setSearchQuery("")}}> <NewsLogo/> HackerNews</div> </Link>
        <div> 
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField  id="input-with-sx" 
                        label="What are you looking for?" 
                        variant="standard"
                        onKeyPress={(ev) => {
                          if (ev.key === 'Enter') {
                            setSearchQuery(ev.target.value);
                            ev.preventDefault();
                          }
                        }} />
          </Box> 
        </div>
      </div>
    )
}

export default Header;