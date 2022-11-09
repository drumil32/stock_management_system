const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require("cors");
const app = express();
require('./Database/conn');
const User = require('./models/userSchema');
const PORT = process.env.PORT;
// whenever we get data in JSON this will convert it to object form
app.use(express.json());

app.use(require('./router/auth'));
app.use(cors());
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/register', async (req, res) => {

    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password !== confirmPassword) {

        return res.status(422).json({ error: 'password are not matches' });
    }
    try {
        const user = new User({
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            emailid: req.body.emailid,
            password: password,
            money: 10000,
            boughtStock: [],
            soldStock: []
        });
        const result = await user.save();
        res.status(201).json({ message: `done` });
    } catch (err) {
        console.log(err);
    }
});

app.post('/login', async (req, res) => {
    const emailid = req.body.emailid;
    const password = req.body.password;

    const result = await User.findOne({ emailid });

    if (result) {

        const isMatch = await bcrypt.compare(password, result.password);
        if (isMatch) {
            const token = await (User(result)).generateAuthToken();

            res.json({ message: `done`, token: token, userDetails: result });
        } else {
            res.json({ error: `password is wrong` });
        }
    } else
        res.json({ error: `email id is wrong` });
});

app.post('/logout', async (req, res) => {


    const money = req.body.money;
    const boughtStock = req.body.boughtStock;
    const soldStock = req.body.soldStock;

    await User.updateOne({ _id: req.body._id }, { $set: { money: money, boughtStock: boughtStock, soldStock: soldStock} });
    res.json({ done: "done" });
});

app.listen(PORT, () => {
    console.log(`server is listing on port ${PORT}`);
});