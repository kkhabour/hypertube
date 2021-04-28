const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	multipleStatements: true
});

pool.getConnection((error, connection) => {
	if (connection) connection.release();
});

pool.query = util.promisify(pool.query);

const querySelect = async (fields, table, columns, values) => {

	if (typeof fields === "undefined" || typeof table === "undefined" ||
		  typeof columns === "undefined" || typeof values === "undefined")
		return null;

	if (!fields || !fields.length)
		fields = ["*"];

	if (!table)
		return null;

	let q = `SELECT ${fields.map((e) => `${e}`).join(", ")} FROM \`${table}\``;


	if (columns[0] && values[0])
		q += " WHERE ";

	for (let i = 0; i < columns.length; i++) {
		q += `\`${columns[i]}\` = ?`;
		if ((i + 1) !== columns.length)
			q += ` AND `;
  	}

	try {
		let res = await pool.query(q, values);
		return res;
	} catch (error) {

		throw error;

	}
};


const queryInsert = async (table, columns, values) => {

	/* all arguments must be passed */
	if (typeof table === "undefined" || table === null ||
		typeof columns === "undefined" || columns === null ||
		typeof values === "undefined" || values === null)
		return null;

	let cols = columns.map((e) => `\`${e}\``).join(", ");
	let vals = values.map((e) => mysql.escape(e)).join(", ");

	try {
		let res = await pool.query(`INSERT INTO \`${table}\` (${cols}) VALUES(${vals})`);
		return res;

	} catch (error) {
		throw error;
	}

};


const queryDelete = async (table, columns, values) => {

	/* all arguments must be passed */
	if (typeof table === "undefined" || table === null ||
		typeof columns === "undefined" || columns.length === 0 ||
		typeof values === "undefined" || values.length === 0)
		return null;

	let q = `DELETE FROM \`${table}\` WHERE `;
	for (let i = 0; i < columns.length; i++) {
		q += `\`${columns[i]}\` = ?`;
		if ((i + 1) !== columns.length)
			q += ` AND `;
	}

	try {
		let res = await pool.query(q, values);
		return res;

	} catch (error) {
		
		throw error;
	}

};



const queryUpdate = async (table, column, value, condi_col, condi_val) => {

	/* all arguments must be passed, but can be null */
	if (typeof table === "undefined" || table === null ||
		  typeof column === "undefined" || column === null ||
		  typeof value === "undefined" || value === null ||
		  typeof condi_col === "undefined" || condi_col === null ||
		  typeof condi_val === "undefined" || condi_val === null)
		return null;


	try {
		let res = await pool.query(`UPDATE \`${table}\` SET \`${column}\` = ? WHERE \`${condi_col}\` = ?`, [value, condi_val]);
		return res;
	} catch (error) {

		throw error;

	}

};



module.exports = {
	"select": querySelect,
	"insert": queryInsert,
	"delete": queryDelete,
	"update": queryUpdate,
	pool
};
