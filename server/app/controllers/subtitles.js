const OS = require('opensubtitles-api');
const OpenSubtitles = new OS('UserAgent');
const fs = require('fs');
const http = require('http');
const config = require('../config/config');
const leak = require('../utils/leakkiller');

const srt2vtt = require('srt2vtt');
const USERNAME = 'kkhabour';
const PASSWORD = 'Test123@';

exports.subtitle = (req, res) => {
    const imdb = req.params.imdb;
    const lang = req.params.lang;


    const dir = `${config.path}/movies/subtitles/${imdb}/`;
    const srtpath = `${dir}${imdb}_${lang}.srt`;
    const vttpath = `${dir}${imdb}_${lang}.vtt`;

    if (!imdb || !lang)
        return res.status(400).json({'status': 400, 'message': 'missing params'});
    

    if (fs.existsSync(vttpath)) {
        res.setHeader('Content-Type', 'text/vtt'); 
        const f = fs.createReadStream(vttpath);
        f.pipe(res);
        leak.free(f, res);
        return ;
    }


    OpenSubtitles.api.LogIn(USERNAME, PASSWORD, 'en', 'UserAgent')
    .then(response => {

        OpenSubtitles.search({imdbid: imdb})
        .then(subtitles => {

            let keys = Object.keys(subtitles);

            if (keys.includes(lang) == false)
                return ;
            

            const url = subtitles[lang].url;


            http.get(url, (sub) => {
                const f = fs.createWriteStream(srtpath);

                if (!fs.existsSync(dir))
                    fs.mkdirSync(dir, {recursive: true} );


                sub.pipe(f);

                f.on('finish', () => {
                    let srtData = fs.readFileSync(srtpath);
                    srt2vtt(srtData, (err, vttData) => {
                        if (err)
                            return ;
                        fs.writeFileSync(vttpath, vttData);
                        fs.unlinkSync(srtpath);
                        
                        res.setHeader('Content-Type', 'text/vtt');
                        res.send(vttData);
                    });
                });

            }).on('error', (err) => {
                res.status(200).end();
            });
            
        }).catch(error => {
            res.status(200).end();
        });


    })
    .catch(error => {
        res.status(200).end();
    });
}