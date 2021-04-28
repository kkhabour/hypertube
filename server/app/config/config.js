module.exports = {
    host: process.env.URL,
    ports: {
        server: process.env.SERVER,
        client: process.env.CLIENT
    },
    secret: process.env.TOKEN_SECRET,
    mail: {
        sendmail: true,
        newline: 'unix',
        path: '/usr/sbin/sendmail'
    },
    path: ""
}