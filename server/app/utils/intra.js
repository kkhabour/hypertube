const axios = require('axios');
const config = require('../config/config');



exports.getaccesstoken = async (code) => {
    const params = {
        grant_type : 'authorization_code',
        client_id : '57b5ab3c42e7495e50cb4a00cb262df5cd809cbecd97e8ef879eee6199287c7b',
        client_secret : 'a0dbb1632f3668beebaf311dd7c73851b4904bbd68d4b8a22fda91861f2263cf',
        code : code,
        redirect_uri : `${config.host}:${config.ports.client}/omniauth/intra`
    }

    
    try {
        const response = await axios.post('https://api.intra.42.fr/oauth/token', params);

        return response.data.access_token;
    } catch (error) {
        throw error;
    }
}

exports.getuser = async (access_token) => {
    try {
        const response = await axios.get('https://api.intra.42.fr/v2/me', {
           headers : {
               'Authorization' : `Bearer ${access_token}`
           } 
        });

        const user = {
            'firstname' : response.data.first_name,
            'lastname': response.data.last_name,
            'username': response.data.login,
            'email': response.data.email,
            'image': response.data.image_url
        };

        return user;
    } catch (error) {
        throw error;
    }
}
