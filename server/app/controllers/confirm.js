const db = require('../utils/db');
const valid = require('../utils/validation');
const bcrypt = require('bcrypt');


exports.mail = async (req, res) => {
    
    const token = req.body.token;
    
    if (!token)
        return res.status(403).json({ 'status': 403, 'message': 'missing parameters'});

    try {
        const data = await db.select(null, 'tokens', ['token'], [token]);

        if (!data || data.length == 0 || data[0].type != 'email')
            return res.status(403).json({ 'status': 403, 'message': 'no account linked to this token'});

        await db.update('users', 'verified', 1, 'id', data[0].user_id);
        await db.delete('tokens', ['user_id'], data[0].user_id);

        res.status(200).json( {'status': 200, 'message': 'email confirmed successfully'});

    } catch (error) {
        res.status(500).json({ 'status': 500, 'message': error.message });
    }
}


exports.password = async (req, res) => {

    const token = req.body.token;
    const password = req.body.password;
    const confirm = req.body.confirm;

    if (!token || !password || !confirm)
        return res.status(400).json({'status': 400, 'message': 'missing parameters'});

    try {
        const data = await db.select(null, 'tokens', ['token', 'type'], [token, 'password']);

        if (!data || data.length == 0 || data[0].type != 'password')
            return res.status(403).json({ 'status': 403, 'message': 'no account linked to this token'});

        let exp = Date.now() - Date.parse(data[0].created_at);
        exp = new Date(exp).getMinutes();
        
        if (exp > 30)
            return res.status(400).json({ 'status': 400, 'message': 'token expired'});

        if (password !== confirm)
            return res.status(400).json({ 'status': 400, 'message': 'password does not match'});

        if (!valid.password(password))
            return res.status(400).json({ 'status': 400, 'message': 'password not valid'});
        
        let hash = bcrypt.hashSync(password, 10);
        await db.update('users', 'password', hash, 'id', data[0].user_id);
        await db.delete('tokens', ['user_id'], [data[0].user_id]);

        res.status(200).json({'status': 200, 'message': 'password has been changed successfully'});
        
    } catch (error) {
        res.status(500).json({ 'status': 500, 'message': error.message });
    }
}