// React
import React, {useEffect, useState} from "react";

// Material UI
import { 
  Box,  
  Grid } from "@mui/material";

// My Files 
import Configuration from "../assets/json/Configuration.json"

// My Components
import RadiosCards, {FilterDisplay} from "./RadiosCards"

function Content(props){
    return(
      <Box 
        height={''}
        marginLeft={Configuration.drawerWidth / 8}
        padding={1}
        sx={{color:'white'}}
      >
        <Grid container spacing={0} rowGap={2}>
          <Grid item xs={12}>
            <FilterDisplay filter={props.current_radios_cards.props.filter}/>
          </Grid>
          {props.current_radios_cards}
        </Grid>
      </Box>
    );
}

export default Content;
export {RadiosCards};
