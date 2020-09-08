const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const router = express.Router();
const path = require('path');

const dreamerApi = require('./api/dreamerApi');

const app = express();

//Body parser middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//mongoDB Config
const db = require('./config/keys').mongoURI;

//Connect to mongoDB using mongoose
mongoose.connect(db).then(() => console.log('MongoDB Connected')).catch(err => console.log('Connection Failure', err));

//Use routes
app.use('/api/dreams', dreamerApi);

//Server static assets if in production
if (process.env.NODE_ENV === 'production') {
	//Set Static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// "process.env.PORT" is used to run the app in heroku
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running on the port', port));
