const config = require('../config/config');
const CronJob = require('cron').CronJob;
const fs = require('fs');
const db = require('./db');





exports.start = () => {

    const job = new CronJob('0 0 * * * *', async () => {
        const movies = await db.pool.query('SELECT * FROM hashes WHERE created_at <= NOW() - INTERVAL 1 month');

        if (!movies || movies.length == 0)
            return;

        movies.forEach(async movie => {
            let path = `${config.path}/movies/${movie.hash}`;
            await db.delete('hashes', ['id'], [movie.id]);
            remove(path);
        });

    });
    job.start();

}

const remove = (path) => {
    if (fs.existsSync(path)) {
        let files = fs.readdirSync(path);

        if (files.length > 0) {
            files.forEach(file => {
                let p = `${path}/${file}`;
                if (fs.statSync(p).isDirectory())
                    remove(p);
                else
                    fs.unlinkSync(p);
            });
            fs.rmdirSync(path);
        }
        else
            fs.rmdirSync(path);
    }
}