const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin.routes');
const shopRoutes = require('./routes/shop.routes');
const rootDir = require('./util/path');
const errorController = require('./controllers/error');

//Initializing server to app constant
const app = express();

/* Using EJS*/
app.set('view engine', 'ejs');
app.set('views', 'views');

//Setting middleware to be used
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Setting up routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});