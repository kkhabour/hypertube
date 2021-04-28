const validation = require('../utils/validation');
const bcrypt = require('bcrypt')
const db = require('../utils/db');
const token = require('../utils/token');

exports.login = async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password)
        res.status(200).json( {'status' : 200, 'message': 'missing parameters'});

    try {
        let u = await db.select(null, 'users', ['username'], [username]);
        
        if (!u || u.length == 0)
            return res.status(403).json({ 'status': 403, 'message' : 'username or password incorrect'});
        
        const checkpassword = bcrypt.compareSync(password, u[0].password);

        if (!checkpassword)
            return res.status(403).json({ 'status': 403, 'message' : 'username or password incorrect'});

        if (!u[0].verified)
            return res.status(403).json({ 'status': 403, 'message' : 'email not confirmed'});

        const user = {
            'id' : u[0].id,
            'firstname': u[0].firstname,
            'lastname': u[0].lastname,
            'username' : u[0].username,
            'email': u[0].email,
            'image': u[0].image,
            'language': u[0].language
        };
        
        let t = token.generate(user);

        await db.pool.query(`INSERT INTO \`tokens\`(\`user_id\`, \`type\`, \`token\`) 
        VALUES ('${user.id}', 'access', '${t}') ON DUPLICATE KEY UPDATE token = '${t}'`);

        res.status(200).json({ 
            'status': 200, 
            'message': 'logged successfuly',
            'data': user,
            'token': t
        });

    } catch(error) {
        res.status(500).json({'status': 500, 'message': error.message});
    }
}