const axios = require('axios');
const config = require('../config/config');



exports.getaccesstoken = async (code) => {
    const params = {
        client_id : '365d2eca620e2290f5ad',
        client_secret : '2949aad5bfdc6d23e07c1879e189bcfa79ce2373',
        code : code,
        redirect_uri : `${config.host}:${config.ports.client}/omniauth/github`
    }

    
    try {
        const response = await axios.post('https://github.com/login/oauth/access_token', params,
        {
            headers: {
                'Accept': 'application/json'
            }
        }
        );

        return response.data.access_token;
    } catch (error) {
        throw error;
    }
}

exports.getuser = async (access_token) => {
    try {
        const response = await axios.get('https://api.github.com/user', {
           headers : {
               'Authorization' : `Bearer ${access_token}`
           } 
        });
        

        if (!response.data)
            return ;
        
        let data = response.data;
        let user = {};

        user.username = data.login;
        user.image = data.avatar_url;

        if (data.name) {
            let d = data.name.split(' ');
            user.firstname = d[0];
            user.lastname = d[1];
        } else {
            user.firstname = 'user';
            user.lastname = 'user';
        }

        if (data.email)
            user.email = data.email;
        else
            user.email = `${user.username}.github@hypertube.com`;
        
        return user;
    } catch (error) {
        throw error;
    }
}
