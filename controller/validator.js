const {body}=require('express-validator');

const alpErr="must only contain letters.";
const tenLengthErr="must be between 1 and 10 characters.";
const emailErr="must be a valid email address.";
const numErr="must only contain numbers.";
const sixLengthErr="must be exactly 6 digits.";
const mesErr="must be between 1 and 100 characters."

const validateUser=[
    body('fullname').trim().isAlpha("en-US", { ignore: " " }).withMessage(`Full name ${alpErr}`).isLength({min:1,max:20}).withMessage(`Full name ${tenLengthErr}`),
    body('username').trim().isEmail().withMessage(`Email ${emailErr}`),
    body('password').isLength({min:1,max:10}).withMessage(`Password ${tenLengthErr}`)
]

const validatePasscode=[
    body('passcode').isLength({min:6,max:6}).withMessage(`Passcode ${sixLengthErr}`).isNumeric().withMessage(`Passcode ${numErr}`)
]

const validatePost=[
    body('message').trim().isLength({min:1,max:100}).withMessage(`Post ${mesErr}`)
]

module.exports={validateUser,validatePasscode,validatePost};
