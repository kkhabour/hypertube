const db = require('../utils/db');
const mail = require('../utils/mail');



exports.password = async (req, res) => {

    const email = req.body.email;

    if (!email)
        return res.status(400).json( {'status': 400, 'message': 'missing paramters'});

    try {
        const user = await db.select(null, 'users', ['email'], [email]);

        if (!user || user.length == 0)
            return res.status(400).json({'status': 400, 'message': 'no account linked to this email'});

        await mail.reset_password(user[0]);

        res.status(200).json({ 'status': 200, 'message': 'reset email has been sent successfully', 'email': email});

    } catch (error) {
        res.status(500).json({'status': 500, 'message': error.message});
    }
}