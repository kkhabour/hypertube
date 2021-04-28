const Filetype = require('file-type');
const config = require('../config/config');
const fs = require('fs');

exports.upload = async (image) => {

    let i = image.split(',')[1];

    let b = Buffer.from(i, 'base64');
    let e = await Filetype.fromBuffer(b);

    if (!e)
        return new Error('image not valid');

    let path = `/images/${randomString(20)}.${e.ext}`;

    fs.writeFile(`${config.path}${path}`, b, err => {
        if (err) return ;
    });
    
    return path;
}

function randomString(len) {
    charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}
