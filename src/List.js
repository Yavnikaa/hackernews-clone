import React, {Component, useEffect, useState } from 'react'
import moment from 'moment'
import parse from 'html-react-parser';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const ListLayout = (props) => {
    const data = props.listData.map((listItem, index) => {
        return (
            <div key={index}>
                <ListItem alignItems="flex-start">
              <ListItemText 
              primary={<React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  color="text.primary"
                >
                  {listItem.title}
                </Typography>
                {(listItem.url && listItem.url.length) ? 
                <Link href={listItem.url} variant="body2" underline="hover"> 
                {" ("} {(listItem.url).replace("https://", " ")} {")"}
                </Link> : ' '}
              </React.Fragment>}

              secondary={<React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {listItem.author} {" | "}
              </Typography>
              {moment(listItem.created_at).format('LLL')} {listItem.comment_text!=null? "| On "  + ( listItem.story_title ): "| " + (listItem.points) + (listItem.points<=1 ? " point" : " points")}
              <Typography> {listItem.comment_text!=null?parse(listItem.comment_text):''}</Typography>
            </React.Fragment>}> </ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" /> 
            </div>
        )
    })
    return <div> {data} </div>
}

class NewsList extends Component{
    render(){
        const {listData}=this.props;
        return(
            <div>
                <List sx={{ width: '100%'}}> 
                <ListLayout listData={listData}></ListLayout>
                </List>
            </div>
        )
    }
}

export default NewsList;