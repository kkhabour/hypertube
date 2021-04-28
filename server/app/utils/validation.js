exports.firstname = (username) => {
	let re = new RegExp(/^[a-zA-Z_-]{3,20}$/);
	return re.test(username);
};


exports.lastname = (username) => {
	let re = new RegExp(/^[a-zA-Z_-]{3,20}$/);
	return re.test(username);
};


exports.username = (username) => {
	let re = new RegExp(/^[a-zA-Z0-9_-]{3,15}$/);
	return re.test(username);
};


exports.email = (email) => {
	let re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	return re.test(email);
};


exports.password = (password) => {	
	let re = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/);
	return re.test(password);
};



exports.image = async (image) => {
	const FileType = require('file-type');
	
	image = image.split(',')[1];
	let b = Buffer.from(image, 'base64');
	let e = await FileType.fromBuffer(b);

	if (!e)
		return false;
	return ['jpeg', 'jpg', 'png'].includes(e.ext);
}


exports.language = (lan) => {
	return ['EN', 'FR'].includes(lan);
}