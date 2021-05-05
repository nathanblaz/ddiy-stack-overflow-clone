const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../db/models')
const { User, Question, Answer } = db
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser, requireAuth } = require('../auth');



// router.post('/questions/delete/:id', asyncHandler(async (req, res) => {
//     const question = await Question.findByPk(req.params.id, 10);
//     if (req.session.auth.userId === question.ownerId) {
//         await question.destroy();
//         res.redirect('/');
//     }
//     else {
//         alert('This is not working')
//     }

// }))

// router.delete('/delete', requireAuth, asyncHandler(async (req, res) => {

//     const { id } = req.body;
//     const question = await Question.findByPk(id)
//     await question.destroy();

//     res.status(204).end
    

// }));


module.exports = router;
