const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('./db');

const generate = (user) => {
    return jwt.sign(user, config.secret, { expiresIn: '86400s'});
}

const verify = async(req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization)
        return res.status(400).json( {'status': 400, 'message': 'missing header'});
    
    const token = authorization.split(' ')[1];

    if (token == null) return res.status(401).json({'status': 401, 'message': 'missing token'});

    jwt.verify(token, config.secret, async (err, user) => {
        if (err)
            return res.status(401).json({'status': 401, 'message': err.message});
        
        let t = await db.select(['token'], 'tokens', ['user_id', 'type'], [user.id, 'access']);
        
        if (!t || t.length == 0 || t[0].token !== token)
            return res.status(401).json({'status': 401, 'message': 'token expired try to login again'});

        req.user = user;
        next();
    });
}


exports.generate = generate;
exports.verify = verify;


