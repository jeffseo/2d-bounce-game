const express = require('express'),
      morgan = require('morgan'),
      app = express();

// Set up the app
app.use(morgan('dev'));
app.use(express.static('client'));

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
})

app.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}`);
});

// module.exports = app;
