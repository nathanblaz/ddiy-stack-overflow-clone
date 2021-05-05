const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../db/models')
const { User, Question, Answer } = db
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser, requireAuth } = require('../auth');

const questionValidators = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for the question title')
        .isLength({ max: 100 })
        .withMessage('Title must not be more than 50 characters long'),
    check('query')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for the content of the question')
]

router.get('/questions', csrfProtection, (req, res) => {
    res.render('new-question', {
        csrfToken: req.csrfToken(),
    })
})

router.post('/questions', csrfProtection, questionValidators , asyncHandler(async (req, res) => {
    const { title, query } = req.body;
    const question = Question.build({
        ownerId: req.session.auth.userId,
        title,
        query,
    });
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await question.save();
        console.log(question)
        res.redirect(`/questions/${question.id}`)
    }
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render("new-question", {
        title,
        query,
        question,
        errors,
        csrfToken: req.csrfToken(),
    });
}));

router.get('/questions/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findByPk(questionId, {
        include: [User, Answer]
    });
    
    const answers = await Answer.findAll({
        where: {
            questionId: question.id
        },
        include: [User]
    });
    res.render('single-question', {
        title: 'Single Question',
        answers,
        question,
        csrfToken: req.csrfToken(),
    });
}));


module.exports = router;
