const mailer = require("nodemailer");
const crypto = require("crypto");
const db = require("./db");
const config = require('../config/config');

const account = mailer.createTransport(config.mail);


exports.reset_password = async (user) => {

	try {

		let token = crypto.randomBytes(32).toString("hex");

		let q = `INSERT INTO \`tokens\`(\`user_id\`, \`type\`, \`token\` ) VALUES ('${user.id}','password', '${token}') ON DUPLICATE KEY UPDATE token = '${token}';`;
		await db.pool.query(q);

		let url = `http://127.0.0.1:${config.ports.client}/reset/${token}`;
		let options = {
			"from": '"Hypertube" <hypertube@1337.ma>',
			"to": user.email,
			"subject": "Hypertube - Password reset",
			"html": `<a href='${url}'>Please, click here to reset your password.</a>`
		};	

		account.sendMail(options, (error, info) => {
			if (error) {
				throw error;
			}
		}); 

	} catch (error) {
		throw error;
	}
};


exports.confirm_account = async (email) => {
	
	try {

		let data = await db.select(["id"], "users", ["email"], [email]);
		if (data.length === 0)
			return false;

		let token = crypto.randomBytes(32).toString("hex");

		let q = `INSERT INTO \`tokens\`(\`user_id\`, \`type\`, \`token\` ) VALUES ('${data[0].id}','email', '${token}') ON DUPLICATE KEY UPDATE token = '${token}';`;
		await db.pool.query(q);
	
		let url = `http://127.0.0.1:${config.ports.client}/confirm/${token}`;
		let options = {
			"from": '"Hypertube" <hypertube@1337.ma>',
			"to": email,
			"subject": "Hypertube - Account confirmation",
			"html": `<a href='${url}'>Please, click here to activate your account.</a>`
		};

		account.sendMail(options, (error, info) => {
			if (error) throw error;
		});

	} catch (error) {

		throw error;

	}

};
