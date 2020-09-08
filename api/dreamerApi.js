const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Dreams = require('../model/Dreams');

//@route GET api/dreams
//@desc Get All Dreams
//@access public
router.get('/', (req, res) => {
	Dreams.find()
		.sort({date: -1})
		.then(dreams => res.json(dreams))
		.catch(err => res.status(404).json({nodreams: 'no dreams found'}));
});

//@route POST api/dreams
//@desc Create dream
//@access Private
router.post('/add', (req, res) => {
	const newDream = new Dreams({
		fusername: req.body.username,
		fdream: req.body.dream
	});

	newDream.save().then(dream => res.json(dream)).catch(err => console.log(err));
});

// @route   DELETE api/dream/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', (req, res) => {
	Dreams.findByIdAndDelete(req.params.id)
		.then(() => {
			res.json({success: true});
		})
		.catch(err => res.status(404).json({dreamsnotfound: 'No Dreams Found'}));
});

module.exports = router;
