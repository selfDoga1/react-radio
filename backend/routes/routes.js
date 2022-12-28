const appRouter = (app, fs, path) => {

    // variables

    app.get('/', (req, res) => {
        res.send('Hello, this is a simple API Server to store your favorites radios station, enjoy!');
      });


    // helper methods
    const readFile = (
        callback,
        returnJson = false,
        filePath,
        encoding='utf-8'
    ) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }
            callback(returnJson ? JSON.parse(data) : data); //jslint-ignore-line
        })
    };

  const writeFile = (
      fileData,
      callback,
      filePath,
      encoding = 'utf-8'
  ) => {
      fs.writeFile(filePath, fileData, encoding, (err) => {
          if (err){
              throw err;
          };
          callback();
      });
  };

    // routes
    const radioRoutes = require('./radio.js')(app, path, readFile, writeFile);

};

module.exports = appRouter;