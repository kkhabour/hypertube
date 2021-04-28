const db = require('../utils/db');
const validation = require('../utils/validation');
const bcrypt = require('bcrypt');
const mail = require('../utils/mail');
const config = require('../config/config');

const upload = require('../utils/upload');

exports.register = async (req, res) => {

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let image = req.body.image;
    let email = req.body.email;
    let password = req.body.password;
    let confirm = req.body.confirm;

    if (!firstname || !lastname || !username || !email || !password || !confirm )
        return res.status(400).json({ 'status' : 400, 'message': 'missing parameters'});

    if (!validation.firstname(firstname))
        return res.status(400).json({ 'status' : 400, 'message': 'firstname is not valid'});

    if (!validation.lastname(lastname))
        return res.status(400).json({ 'status' : 400, 'message': 'lastname is not valid'});

    if (!validation.username(username))
        return res.status(400).json({ 'status' : 400, 'message': 'username is not valid'});

    if (!validation.email(email))
        return res.status(400).json({ 'status' : 400, 'message': 'email is not valid'});

    if (!validation.password(password) || !validation.password(confirm) || password !== confirm)
        return res.status(400).json({ 'status' : 400, 'message': 'password is not valid'});


    if (!image)
        image = '/images/default.svg';
    else if (! await validation.image(image))
        return res.status(400).json({ 'status' : 400, 'message': 'image not valid'});
    else
        image = await upload.upload(image);
    
    try {

        let u = await db.select(['username'], ['users'], ['username'], [username]);
        let e = await db.select(['email'], ['users'], ['email'], [email]);

        if (u && u.length)
            return res.status(400).json({ 'status' : 400, 'message': 'username already exists'});

        if (e && e.length)
            return res.status(400).json({ 'status' : 400, 'message': 'email already exists'});
        
        let hash = bcrypt.hashSync(password, 10);    

        let cols = ['firstname', 'lastname', 'username', 'email', 'password', 'image'];
        let vals = [firstname, lastname, username, email, hash, image];

        await db.insert('users', cols, vals);
        
        await mail.confirm_account(email);

        res.status(200).json({
            'status': 200,
            'message' : 'registered successfuly'
        });

    } catch (error) {
        res.status(500).json({'status': 500, 'message': error.message});
    }
}