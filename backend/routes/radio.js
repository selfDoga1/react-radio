
const radioRouter = (app, path, readFile, writeFile) => {
    const uuid = require('uuid');

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

                var filteredResults = {}
                
                Object.entries(data).map((value, index) => {
                    
                    var radio = value[1]

                    switch(req.params['genre']){
                        case 'Favorites':
                            if(radio.favorite){
                                filteredResults[radio.id] = radio
                            }
                        default:
                            if(radio.genre == req.params['genre']){
                                filteredResults[radio.id] = radio
                            }
                    }  
                })
                res.send(filteredResults);
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
            
            radioId = req.params['id'];

            selectedRadio = data[req.params['id']];
            selectedRadio['favorite'] = !selectedRadio.favorite;
            data[radioId] = selectedRadio;
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send({'radio_favorite': selectedRadio.favorite});
            }, radiosPath);
        }, true, radiosPath);
    })

    // ADD
    app.post('/radio/add/', (req, res) => {
        readFile(data => {
           
            const newRadioId = uuid.v4();
            req.body['id'] = newRadioId;
            data[newRadioId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new radio added!');
            }, radiosPath)

        }, true, radiosPath);
    })  
};

module.exports = radioRouter;