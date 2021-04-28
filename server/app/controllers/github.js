const db = require('../utils/db');
const bcrypt = require('bcrypt');
const token = require('../utils/token');
const github = require('../utils/github');




exports.login = async (req, res) => {

    const code = req.body.code;

    if (!code || code == undefined)
        return res.status(400).json( {'status': 400, 'message': 'code is required'});
    
    try {
        let access_token = await github.getaccesstoken(code);
        let user = await github.getuser(access_token);

        let u = await db.select(null, 'users', ['username', 'email'], [user.username, user.email]);
        if (!u || u.length == 0) {
            let hash = bcrypt.hashSync("Test123@123456", 10);    
            let cols = ['firstname', 'lastname', 'username', 'email', 'password', 'image', 'verified', 'type'];
            let vals = [user.firstname, user.lastname, user.username, user.email, hash, user.image, 1, 'GIT'];
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
