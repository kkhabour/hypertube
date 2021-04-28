const fs = require('fs');
const config = require('../config/config');
const torrentStream = require('torrent-stream');
const mime = require('mime-types');
const db = require('../utils/db');

const stream = require('stream');



const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

const leak = require('../utils/leakkiller');


exports.torrent = async (res, range, m) => {

    try {
        const engine = torrentStream(`magnet:?xt=urn:btih:${m.hash}`, {
            trackers: [
                'udp://open.demonii.com:1337/announce',
                'udp://tracker.openbittorrent.com:80',
                'udp://tracker.coppersurfer.tk:6969',
                'udp://glotorrents.pw:6969/announce',
                'udp://tracker.opentrackr.org:1337/announce',
                'udp://torrent.gresille.org:80/announce',
                'udp://p4p.arenabg.com:1337',
                'udp://tracker.leechers-paradise.org:6969'
            ],
            path: `${config.path}/movies/${m.hash}`
        });

        engine.on('ready', async () => {

            const files = engine.files;
            const file = files.reduce((a, b) => {
                return (a.length > b.length ? a : b)
            }, files[0]);

            engine.current = file;

            const contentType = mime.lookup(file.name);

            const types = [
                'video/mp4',
                'video/webm',
                'video/ogg',
                'video/x-matroska'
            ]

            // suported video format
            if (types.includes(contentType) == false)
                return res.status(415).end();

            if (m.status == 'N') {
                await db.pool.query(`UPDATE hashes SET status = 'D', path = ? WHERE hash = ?`, 
                [`${config.path}/movies/${m.hash}/${file.path}`, m.hash]);
                file.select();
            }

        
            const s = file.createReadStream();


            res.setHeader('Content-Type', contentType);


            if (['video/mp4', 'video/webm', 'video/ogg',].includes(contentType)) {
                res.setHeader('Content-Type', contentType);

                stream.pipeline(s, res, (err) => {
                    if (err) return ;
                });
                leak.free(s, res);
            }
            else {
                res.setHeader('Content-Type', 'video/webm');
                convert(s, res);
            }

        });


        engine.on('download', (index, piece) => {
            const file = engine.current;
            const total = `${(file.length / (1024 * 1024)).toFixed(2)} mb`.padEnd();
            const chunk = `${(engine.swarm.downloaded / (1024 * 1024)).toFixed(2)} mb`.padEnd(10);
            const percent = Math.round((100 * engine.swarm.downloaded) / file.length);

            const message = `${engine.infoHash}  ${chunk}  ${total.padEnd(10)}  ${percent} %`
        });


        engine.on('idle', async () => {
            const file = engine.current
            if (engine.swarm.downloaded >= file.length) {
                await db.update('hashes', 'status', 'F', 'hash', m.hash);
                engine.destroy();
            }
        });

    } catch (error) {
        throw error;
    }
}



exports.local = (res, range, m) => {
    try {

        const contentType = mime.lookup(m.path);

        if (!range) {
            const s = fs.createReadStream(m.path);

            if (['video/mp4', 'video/webm', 'video/ogg',].includes(contentType)){
                res.setHeader('Content-Type', contentType);
                stream.pipeline(s, res, (err) => {
                    if (err) return ;
                });
                leak.free(s, res);
            }
            else {
                res.setHeader('Content-Type', 'video/webm');
                convert(s, res);
            }
            return;
        }

        if (['video/mp4', 'video/webm', 'video/ogg',].includes(contentType)) {

            const videoSize = fs.statSync(m.path).size;

            const CHUNK_SIZE = (10 ** 6) * 0.5;
            const start = Number(range.replace(/\D/g, ""));
            const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

            res.statusCode = 206;
            res.setHeader('Content-Range', `bytes ${start}-${end}/${videoSize}`);
            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Content-Length', `${end - start + 1}`);
            res.setHeader('Content-Type', contentType);

            const s = fs.createReadStream(m.path, { start, end });

            stream.pipeline(s, res, (err) => {
                if (err) return ;
            });

            leak.free(s, res);

        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'video/webm');

            const s = fs.createReadStream(m.path);
            convert(s, res);
        }

    } catch (error) {
        throw error;
    }
}




const convert = (s, res) => {

    const r = ffmpeg(s)
        .setFfmpegPath(ffmpegPath)
        .format('webm')
        .videoCodec('libvpx')
        .audioCodec('libvorbis')
        .on('progress', (p) => {})
        .on('start', (a) => {})
        .on('error', (e) => {});

    stream.pipeline(r, res, (err) => {
        if (err) return ;
    });

    leak.free(s, res);
}