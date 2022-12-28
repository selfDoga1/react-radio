// React
import React from "react";

// My Files 
import Configuration from "../assets/json/Configuration.json"

// Material UI
import {
    Box, 
    Typography, 
    Grid,
    Container,   
} from "@mui/material";


function PlayerScreen(props) {
    return(
      <Box 
        sx={{background:'#2B2B36', color:'white', m:-1}}
        paddingLeft={2}
        height={Configuration.brandHeight}
        width={'100%'}
      >
        <Grid container paddingLeft={30}>
          <Grid item xs={12}>
            <Typography 
              fontFamily={'ubuntu'}
              fontSize={64}
            >
              {props.radio_name_screen_text}
            </Typography> 
          </Grid>
          <Grid item xs={12} paddingLeft={.5} >
            <Typography 
              fontFamily={'ubuntu'}
              fontSize={24}
            >
              {props.radio_genre_screen_text}
            </Typography>
          </Grid>
        </Grid>
      </Box>
  );
}

export default PlayerScreen;