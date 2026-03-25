const {body}=require('express-validator');

const alpErr="must only contain letters.";
const lengthErr="must be between 1 and 10 characters.";
const emailErr="must be a valid email address.";
const mesErr="must be between 1 and 100 characters."

exports.validateUser=[
    body('fullname').trim().isAlpha("en-US", { ignore: " " }).withMessage(`Full name ${alpErr}`).isLength({min:1,max:20}).withMessage(`Full name ${lengthErr}`),
    body('username').trim().isEmail().withMessage(`Email ${emailErr}`),
    body('password').isLength({min:1,max:10}).withMessage(`Password ${lengthErr}`),
    body('message').trim().isLength({min:1,max:100}).withMessage(`Post ${mesErr}`)
]
