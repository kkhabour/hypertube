const intra = require('../utils/intra');
const db = require('../utils/db');
const bcrypt = require('bcrypt');
const token = require('../utils/token');


exports.register = async (req, res) => {
    
    const code = req.body.code;

    if (!code)
        res.status(400).json( {'status': 400, 'message': 'code is required'});

    try {

        const access_token = await intra.getaccesstoken(code);
        const user = await intra.getuser(access_token);

        // check if email already exists

        let u = await db.select(null, 'users', ['email'], [user.email]);
        if (u && u.length != 0)
            return res.status(400).json( {'status': 400, 'message': 'email already taken'});
        
        u = await db.select(null, 'users', ['username'], [user.username]);
        if (u && u.length != 0)
            return res.status(400).json( {'status': 400, 'message': 'username already taken'});


        let hash = bcrypt.hashSync("Test123@123456", 10);    
        let cols = ['firstname', 'lastname', 'username', 'email', 'password', 'image', 'verified'];
        let vals = [user.firstname, user.lastname, user.username, user.email, hash, user.image, 1];

        await db.insert('users', cols, vals);

        res.status(200).json({ 'status': 200, 'message': 'users registered successfully'})
        
    } catch (error) {
        res.status(401).json({'status':401, 'message': error.message});
    }
}



exports.login = async (req, res) => {

    const code = req.body.code;

    if (!code || code == undefined)
        return res.status(400).json( {'status': 400, 'message': 'code is required'});
    
    try {
        let access_token = await intra.getaccesstoken(code);
        let user = await intra.getuser(access_token);

        let u = await db.select(null, 'users', ['username', 'email'], [user.username, user.email]);
        if (!u || u.length == 0) {
            let hash = bcrypt.hashSync("Test123@", 10);    
            let cols = ['firstname', 'lastname', 'username', 'email', 'password', 'image', 'verified', 'type'];
            let vals = [user.firstname, user.lastname, user.username, user.email, hash, user.image, 1, 'INTRA'];
            let i = await db.insert('users', cols, vals);
            u = await db.select(null, 'users', ['id'], [i.insertId]);
        }

        u = u[0];

        user.id = u.id;
        user.firstname = u.firstname;
        user.lastname = u.lastname;
        user.username = u.username;
        user.email = u.email;
        user.image = u.image;
        user.language = u.language;

        let t = token.generate(user);

        await db.pool.query(`INSERT INTO \`tokens\`(\`user_id\`, \`type\`, \`token\`) 
        VALUES ('${u.id}', 'access', '${t}') ON DUPLICATE KEY UPDATE token = '${t}'`);

        res.status(200).json({ 'status': 200, 'message': 'logged successfully', 'data': user, 'token': t});
        
    } catch (error) {
        res.status(401).json({'status': 401, 'message': error.message});
    }
}
