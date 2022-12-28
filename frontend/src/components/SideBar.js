// React
import React, {useState, useEffect} from "react";

// External
import axios from "axios";

// My Files
import Configuration from "../assets/json/Configuration.json"

// My Components
import Content, {RadiosCards} from "./Content";

// Material UI
import {
    Box, 
    Drawer, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Typography, 
    Collapse,   
   
} from "@mui/material";

import { 
    Favorite, 
    LibraryMusic, 
    MusicNote, 
    Radio, 
    ExpandMore, 
    ExpandLess
} from "@mui/icons-material";


function SideBar(props){

    const url = 'http://localhost:3001/genre/All'
    const [genre_list, set_genre_list] = useState({'genre':''});
    
    useEffect(() => {{
        
        axios.get(url).then(
            response => set_genre_list(response.data) 
            ).catch((err) => {throw(err)})
            
        }},[props]); 
        
    const [is_genre_open, set_is_genre_open] = useState(true);
    const toggle_is_genre_open = () => {set_is_genre_open(!is_genre_open)}
    
    const GenreSubMenu = () => {
        return( 
        <Collapse in={is_genre_open} timeout={'auto'}>
            <List component='div' disablePadding>
            {Object.entries(genre_list).map((genre, index) => {
                genre = genre[1];
                return(
                <ListItem disablePadding>
                    <ListItemButton 
                        sx={sidebar_theme.SideBarSubMenuButton}
                        selected={false}
                        onClick={ () => {toggle_filtered_radio_cards(genre.name);}}>
                    <ListItemIcon sx={sidebar_theme.SideBarSubMenuButtonIcon}>
                        <MusicNote />
                    </ListItemIcon>
                    <ListItemText primary={genre.name}/>
                    </ListItemButton>
                </ListItem>
                );
            })}
            </List>
        </Collapse>
        );
    }

    const toggle_filtered_radio_cards = (filter) => {
        props.set_current_radios_card(
            <RadiosCards 
                favorites={true}
                UpdatePlayer={props.UpdatePlayer}
                filter = {filter}
                radio_filter_url = {'/radio/genre/' + filter}
            />
        )
    }

    const toggle_favorites_radio_cards = () => {
        toggle_filtered_radio_cards('Favorites')
    }

    var radios_options = [
        {
            text:'Genre',
            icon:<LibraryMusic />,
            onClick: toggle_is_genre_open,
            subMenu: <GenreSubMenu />,
            constainsSub: true,
        },
        {
            text:'Favorites',
            icon:<Favorite />,
            onClick: toggle_favorites_radio_cards,
        },
    ];

    var library_options = [
        {
            text:'Add Radio',
            icon:<Radio />,
        }, 
    ];

    const sidebar_theme = {
        SideBarMenuButton:{
            '&:hover':{
                background:'#495057',
            }
        },
    
        SideBarMenuButtonIcon:{
            color:'white',
            '&:selected':{
                background:'red'
            }
        },
    
        SideBarSubMenuButton:{
            paddingLeft:'40px',
            '&:hover':{
                background:'#495057',
            }
        },
    
        SideBarSubMenuButtonIcon:{
            color:'white',
        },
    }
    
    const BrandIcon = () => {
        return(
            <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            sx = {{
                height:Configuration.brandHeight,
                background:'#22222F',
                marginBottom:'5px',
            }}
            >
            <a href={'/'} style={{textDecoration:'none', color:'white'}}>
                <Typography
                    fontFamily={'ubuntu'}
                    fontSize={30}
                    fontWeight={'bold'}
                    style={{textDecoration:'none'}}
                >
                    React Radio
                </Typography>
            </a>
            </Box>
        );
    }

    const SideMenuOptions = (props) => {
        return(
            <List disablePadding>
                <ListItem>
                    <Typography 
                    fontFamily={'ubuntu'}
                    fontWeight={'bold'}
                        fontSize={12}
                    >
                    {props.title}
                    </Typography>
                </ListItem>
    
                { props.options.map((option) => {
                    return(
                        <>
                            <ListItem disablePadding>
                                <ListItemButton sx={sidebar_theme.SideBarMenuButtonIconSelected} onClick={option.onClick}>
                                    <ListItemIcon sx={sidebar_theme.SideBarMenuButtonIcon}>
                                        {option.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={option.text}/>
                                    <ExpandToggle constainsSub={option.constainsSub} open={is_genre_open}/>
                                </ListItemButton>
                            </ListItem>
                            {option.subMenu}
                        </>
                    );
                })}
            </List>
        );
    }

    const ExpandToggle =  (props) =>  {
        if(!props.constainsSub){return}
        return(
            <>
                {props.open ? <ExpandLess /> : <ExpandMore />}
            </>
        );
    }
    
    return(        
        <Drawer 
            open={true} 
            variant={'permanent'} 
            sx = {{
                width:Configuration.drawerWidth, 
                [`& .MuiDrawer-paper`]: { 
                    width: Configuration.drawerWidth, 
                    boxSizing: 'border-box' ,
                },
            }}
        >
            <BrandIcon />
            <SideMenuOptions options={radios_options} title={'RADIOS'}/>
            <SideMenuOptions options={library_options} title={'LIBRARY'}/>
        </Drawer>
    );
} 

export default SideBar