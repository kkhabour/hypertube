const stream = require('../utils/stream');
const db = require('../utils/db');
const token = require('../utils/token');

exports.movie = async (req, res) => {
    const movie = req.body.movie;

    const hash = movie.torrents.filter(element => {
        return element.quality === '720p';
    });

    if (hash.length != 0)
        return res.status(200).json({'status': 200, 'hash': hash[0].hash});
}


exports.stream = async (req, res) => {
    
    const id = req.params.id;
    const t = req.params.token;
    const imdb = req.params.imdb;
    const hash = req.params.hash;
    const range = req.headers.range;


    if (!id || !t || !imdb || !hash)
        return res.status(400).json({'status': 400, 'message': 'missing params'});
    
    let to = await db.select(null, 'tokens', ['token', 'type'], [t, 'access']);
    if (!to || to.length == 0)
        return res.status(401).end();


    try {
        await db.pool.query(
            `INSERT INTO movies (id, imdb) VALUES (?, ?) ON DUPLICATE KEY UPDATE imdb = ?, last_seen = NOW();
            INSERT INTO hashes (movie_id, hash) VALUES (?, ?) ON DUPLICATE KEY UPDATE created_at = NOW();
            INSERT INTO watches (user_id, movie_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE created_at = NOW()
            `, 
            [id, imdb, imdb, id, hash, to[0].user_id, id]
        );
        
        let m = await db.select(null, 'hashes', ['hash'], [hash]);
        m = m[0];

        if (m.status == 'F' && m.path != null)
            stream.local(res, range, m);
        else
            stream.torrent(res, range, m);

    } catch (error) {
        res.status(400).end();
    } 
}


exports.comment = async (req, res) => {

    const id = req.body.id;
    const comment = req.body.comment;
    const user = req.user;

    if (!id || !comment)
        return res.status(400).json({'status': 400, 'message': 'missing params'});


    try {
        await db.pool.query('INSERT INTO movies (id) VALUES (?) ON DUPLICATE KEY UPDATE id = id', id);
        let c = await db.insert('comments', ['user_id', 'movie_id', 'comment'], [user.id, id, comment]);

        let u = await db.pool.query(`SELECT users.username, users.image, comments.comment, comments.created_at 
        FROM comments INNER JOIN users on users.id = comments.user_id WHERE comments.id = ?`, c.insertId);

        
        res.status(200).json({'status': 200, 'comment': u[0]});

    } catch (error) {
        res.status(500).json({'status': 500, 'message': error.message});
    }
}

exports.comments = async (req, res) => {

    const id = req.params.id;

    if (!id)
        return res.status(400).json({'status': 400, 'message': 'missing id'});

    try {

        let m = await db.select(null, 'movies', ['id'], [id]);

        if (!m || m.length == 0)
            return res.status(200).json({ 'status': 200, 'message': 'movies not found' });

        const r = await db.pool.query(`SELECT users.username, users.image, comments.comment, comments.created_at 
        FROM comments INNER JOIN users on users.id = comments.user_id WHERE movie_id = ? ORDER BY comments.created_at DESC`, id);
        
        res.status(200).json({'status': 200, 'comments': r})
        
    } catch (error) {
        res.status(500).json({'status': 500, 'message': error.message});
    }
}


exports.watchlist = async (req, res) => {
    const id = req.body.id;
    const user = req.user;

    if (!id)
        return res.status(400).json({'status': 400, 'message': 'missing params'});

    try {

        await db.pool.query('INSERT INTO movies (id) VALUES (?) ON DUPLICATE KEY UPDATE id = id', id);

        let w = await db.select(null, 'watch_list', ['user_id', 'movie_id'], [user.id, id]);

        if (w && w.length != 0)
            await db.delete('watch_list', ['user_id', 'movie_id'], [user.id, id]);
        else
            await db.insert('watch_list', ['user_id', 'movie_id'], [user.id, id]);
        

        res.status(200).end();
        
    } catch (error) {
        res.status(500).json({'status': 500, 'message': error.message});
    }
}

exports.getwatchlist = async (req, res) => {

    const user = req.user;

    try {
        
        let l = await db.select(['movie_id'], 'watch_list', ['user_id'], [user.id])
        if (!l || l.length == 0)
            return res.status(200).json({'status': 200, 'message': 'nothing'});
        
        res.status(200).json({'status': 200, 'watchlist': l});
        
    } catch (error) {
        res.status(500).json({'status': 500, 'message': error.message});
    }
}



exports.watches = async (req, res) => {
    const user = req.user;

    try {

        let w = await db.select(['movie_id'], 'watches', ['user_id'], [user.id]);

        if (!w || w.length == 0)
            return res.status(200).json({'status': 200, 'message': 'nothing'});
        
        res.status(200).json({'status': 200, 'watches': w});
    } catch (error) {
        res.status(500).json({'status': 500, 'message': error.message});
    
    }


}