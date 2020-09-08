const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Scehma
const DreamSchema = new Schema({
	fusername: {
		type: String,
		required: true
	},
	fdream: {
		type: String,
		required: true
	}
});

module.exports = Dreams = mongoose.model('dreams', DreamSchema);
