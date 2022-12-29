import React, {useState} from "react";
import { Box, 
    Button, 
    FormControl, 
    Modal, 
    TextField, 
    Typography } from "@mui/material";
import RadiosCards from "./Content";
import axios from "axios";

function MyModal(props) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

      const form_control_style = {
        width:'100%',
        padding:'5px',
      }

      const input_style = {
        marginBottom:'10px',
      }

      const [name, setName] = useState('');
      const [genre, setGenre] = useState('');
      const [url, setUrl] = useState('');

      async function handleSubmit(event){

        var radioPost = {
            'name':name,
            'genre':genre,
            'url':url,
            'favorite': false,
        }

        const requestConfig = {
            headers: {
            'Content-Type': 'application/json'
            }
        } 
        
        axios.post('/radio/add', radioPost, requestConfig).then(
            () => {
                props.toggle_modal_open()
            }

        ).catch(
            (err) => {throw(err)}
        );
      }

    return(
        <Modal
            open={props.modal_open}
            onClose={props.toggle_modal_open}
        >
            <Box sx={style}>

                <Typography
                    fontFamily={'ubuntu'}
                    fontWeight={'bold'}
                    fontSize={24}
                    marginLeft={1}
                    marginBottom={2}
                >
                    Add Radio
                </Typography>
   
                    <Box>
                        <form onSubmit={() => {handleSubmit()}}>
                            <FormControl sx={form_control_style}>
                                <TextField 
                                    required
                                    label={'Name'} 
                                    value={name}
                                    onInput={e => setName(e.target.value)}
                                    sx={input_style} 
                                    
                                />
                            </FormControl>
                            
                            <FormControl size={'medium'} sx={form_control_style}>
                                <TextField 
                                    label={'Genre'} 
                                    value={genre}
                                    onInput={e => setGenre(e.target.value)}
                                    sx={input_style} 
                                    required
                                />
                            </FormControl>
                            
                            <FormControl size={'medium'} sx={form_control_style}>
                                <TextField 
                                    label={'Url'} 
                                    value={url}
                                    onInput={e => setUrl(e.target.value)}
                                    sx={input_style}
                                    required 
                                /> 
                            </FormControl>
                            
                            <Box
                                display={'flex'}
                                justifyContent={'flex-end'}
                                alignItems={'flex-end'}
                            >
                                <Button 
                                    variant={'contained'}
                                    type={'submit'}
                                >
                                    Add
                                </Button>
                            </Box>
                        </form>
                    </Box>





            </Box>

        </Modal>
    );
};

export default MyModal;