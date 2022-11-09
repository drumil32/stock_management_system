const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./../models/userSchema');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send(`hello from the router`);
});

// router.post('/register', async (req, res) => {
//     const password = req.body.password;
//     const confirmPassword = req.body.confirmPassword;
//     if( password !== confirmPassword ){
//         return res.status(422).json({error: 'password are not matches'});
//     }
//     try {
//         const user = new User({
//             name: req.body.name,
//             emailid: req.body.emailid,
//             phone: req.body.phone,
//             password: password
//         });
//         const result = await user.save();
//         res.status(201).json({message:`done`});
//     } catch (err) {
//         console.log(err);
//     }
    
// });

// router.post('/login', async (req, res) => {
//     const emailid = req.body.emailid;
//     const password = req.body.password;
//     console.log(emailid); console.log(password);
//     const result = await User.findOne({ emailid });
//     console.log(result);
//     if (result) {
//         const isMatch = await bcrypt.compare(password, result.password);
//         if (isMatch) {
//             const token = await (User(result)).generateAuthToken();
//             console.log(token);
//             res.cookie("jwt", token, {
//                 expires: new Date(Date.now() + 9000000),
//                 httpOnly: true
//                 // if we put this property then website can only load on scure connction
//                 // scure : true
//             });
//             res.send(`logged in`);
//         } else {
//             res.send(`invalid123 credentials`);
//         }
//     } else
//         res.send(`invalid credentials`);
// });

// router('/scure',)

module.exports = router;