const express = require('express');
const path = require('node:path');
const app = express();

// parse the form data into req.body
app.use(express.urlencoded({ extended: true }));

// sets the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// to use static files from the 'public' directory 
app.use(express.static(path.join(__dirname, 'public')));


// Import routes from 'routes/index.js'
const indexRoutes = require('./routes/index');
// Use the routes defined in 'index.js'
app.use('/', indexRoutes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});