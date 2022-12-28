const radioRouter = (app, path, readFile, writeFile) => {

    // variables
    const radiosPath = path.resolve(__dirname, '..') + '/data/radios.json'

    // READ
    // get radios
    app.get('/radio/genre/:genre', (req, res) => {
        readFile((data) => {

            if(req.params['genre'] == 'All'){
                res.send(data);
                return;
            } else {

                var filtered_results = {}
                
                Object.entries(data).map((value, index) => {
                    
                    var radio = value[1]

                    switch(req.params['genre']){
                        case 'Favorites':
                            if(radio.favorite){
                                filtered_results[radio.id] = radio
                            }
                        default:
                            if(radio.genre == req.params['genre']){
                                filtered_results[radio.id] = radio
                            }
                    }  
                })
                res.send(filtered_results);
            }
        }, true, radiosPath);
    });

    // get genres
    app.get('/genre/All/', (req, res) => {
        readFile((data) => {
            var genres = {'All':{'id':0, 'name':'All'}};
            Object.entries(data).map((value, index) => {
                var radio = value[1]
                genres[radio.genre] = {
                    'id': index+1,
                    'name': radio.genre
                }
            })
            res.send(genres)
        }, true, radiosPath);
    })

    // UPDATE
    // update radio
    app.put('/radio/update/:id', (req, res) => {
        
        readFile(data => {
        
            const radioId = req.params['id'];
            data[radioId] = req.body;
        
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`radio id: ${radioId} updated!`);
            }, radiosPath);
            
        }, true, radiosPath);
    });

    // toggle favorite
    app.put('/radio/toggle-favorite/:id', (req, res) =>{
        readFile(data => {
            
            radio_id = req.params['id'];

            selected_radio = data[req.params['id']];
            selected_radio['favorite'] = !selected_radio.favorite;
            data[radio_id] = selected_radio;
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send({'radio_favorite': selected_radio.favorite});
            }, radiosPath);
        }, true, radiosPath);
    })
};

module.exports = radioRouter;