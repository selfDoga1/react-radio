// React
import React, {useEffect, useState} from "react";

// External
import axios from "axios";

// Material UI
import {
    Box,
  Typography, 
  Grid, 
  Card, 
  CardContent,  
  CardActions, 
  Button,
  IconButton} from "@mui/material";

// Material UI Icons
import { 
  PlayCircle,
  Favorite } from "@mui/icons-material";

function CustomFavoriteButton(props){
    const [is_favorite, set_is_favorite] = useState(props.is_favorite)
    const url = 'http://localhost:3001/radio/toggle-favorite/' + props.id
  
    async function toggle_favorite(){
      await axios.put(url).then(
        (response) => {
          set_is_favorite(response.data.radio_favorite)
        }
      ).catch((err) => {
        if (err) {
          throw(err)
        }
      })
    }
  
    return(
      <IconButton aria-label='add to favorites' onClick={() => {toggle_favorite()}}>
        {is_favorite ? <Favorite sx={{color:'red'}} /> : <Favorite sx={{color:'gray'}}/>}
      </IconButton>
    );
};

function FilterDisplay(props){
    return(
        <Box 
            sx={{
                background:'#2B2B36'
            }}
            padding={1}
        >
            <Typography
                fontSize={'24px'}
                fontWeight={'bold'}
                color={'white'}
            >
                {props.filter}
            </Typography>
        </Box>
    );
}

function RadiosCards(props){
    const [current_showing, set_current_showing] = useState({radios:''});

    const url = 'http://localhost:3001' + props.radio_filter_url

    useEffect(() => {{

        axios.get(url).then(
        response => set_current_showing({'radios':response.data}) 
        ).catch((err) => {return})

    }}, [props])

    return(
        <Grid container columnSpacing={2} rowSpacing={2}>
        {Object.entries(current_showing.radios).map((radio, index) => {
            radio = radio[1];
            return(
            <Grid item xs={3}>
                <Card>
                <CardContent>
                    <Typography
                    fontWeight={'bold'}
                    fontFamily={'ubuntu'}
                    >
                    {radio.genre}
                    </Typography>
                    <Typography
                    fontSize={24}
                    fontFamily={'ubuntu'}
                    className={'child'}
                    >
                    {radio.name}
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent:'space-between'}}>
                    <CustomFavoriteButton id={radio.id} is_favorite={radio.favorite}/>
                    <Button 
                    size={'large'} 
                    variant={'contained'}
                    onClick = {() => props.UpdatePlayer(radio)}
                    >
                    <PlayCircle />
                    </Button> 
                </CardActions>
                </Card>
            </Grid>
            );
        })}
        </Grid>
    );
}

export default RadiosCards;
export {FilterDisplay};
