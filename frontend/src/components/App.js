// React
import React, {useState, useRef} from "react";

// Material UI
import { createTheme, ThemeProvider } from "@mui/material";

// My Components
import SideBar from "./SideBar";
import PlayerScreen from "./PlayerScreen";
import Content, {RadiosCards} from "./Content";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Modal from "./Modal";

function App(){
  // theme
  let global_theme = createTheme({
    components:{
      MuiDrawer:{
        styleOverrides:{
          paper:{
            background: '#2B2B36',
            color:'white',
          }
        }
      },
    },
  });

  // Player
  const ref = useRef();
  var is_playing = false;

  const toggle_play_pause = () => {
    is_playing = !is_playing;
    is_playing ? ref.current.play() : ref.current.pause();
  };
  
  // Player Screen States
  const [radio_name_screen_text, set_radio_name_text] = useState('Radio Name')
  const [radio_genre_screen_text, set_radio_genre_text] = useState('Radio Genre')

  const UpdatePlayer = (radio) => {
    is_playing = false;
    set_radio_name_text(radio.name);
    set_radio_genre_text(radio.genre);
    ref.current.src = radio.url;
    toggle_play_pause();
  }

  // Content States
  const [current_radios_cards, set_current_radios_card] = useState(
    <RadiosCards genre={'All'} 
      UpdatePlayer={UpdatePlayer} 
      filter={'All'}
      radio_filter_url = {'/radio/genre/All'}
    />
  );

  // modal
    const [modal_open, set_modal_open] = useState(false);
    const toggle_modal_open = () => {set_modal_open(!modal_open)}

  return(
    <div>
      <audio ref={ref} style={{marginLeft:'400px'}}></audio>

      <Modal 
        modal_open={modal_open} 
        toggle_modal_open={toggle_modal_open}
        set_current_radios_card={set_current_radios_card}
        UpdatePlayer={UpdatePlayer} 
      />
      
      <Grid2 container>
        
        <Grid2 item xs={12}>
          <ThemeProvider theme={global_theme}>
            <SideBar 
              set_current_radios_card={set_current_radios_card}
              UpdatePlayer={UpdatePlayer}
              toggle_modal_open={toggle_modal_open}
            />
          </ThemeProvider>
        </Grid2>
        
        <Grid2 item xs={12} sm={12}>
          <PlayerScreen 
            radio_name_screen_text={radio_name_screen_text}
            radio_genre_screen_text={radio_genre_screen_text}
          />
        </Grid2>

        <Grid2 item xs={12} sm={12} marginTop={2}>
          <Content 
            current_radios_cards={current_radios_cards}
          />
        </Grid2>

      </Grid2>      
    </div>
  );
}

export default App;