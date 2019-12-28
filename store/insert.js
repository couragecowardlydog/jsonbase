var fs = require('fs');
var es = require('event-stream');
var size = require('object-sizeof');
var moment = require('moment');
const NEWLINE = '\n';
const DELIMINATOR = '|'
module.exports = function (store, key, value, expiresIn) {
    return new Promise((resolve, reject) => {
        if (!store)
            throw 'EEXIST';
        if (!key || key.length > 32)
            throw '104';
        var size = Buffer.byteLength(JSON.stringify(value));
        if (size > (16 * 1024))
            throw '105';
        var read = fs.createReadStream(store)
        const stream = fs.createWriteStream(store, { encoding: 'utf8', autoClose: true, flags: 'a' });

        var __discard = false;
        read.pipe(es.split()).pipe(
            es.mapSync(function (line) {
                var __value__ = line.toString().trim().split('|');
                if ((__value__[0].toString().trim() == key)) {
                    read.destroy();
                    __discard = true;
                    return reject('102');
                }
            }).on('error', function (err) {
                console.debug('Error while reading file.', err);
                return reject('108');
            }).on('end', function () {
                if (!read.destroyed)
                    read.destroy();
                if (!__discard) {
                    expiresIn = expiresIn ? moment().add(expiresIn, 'seconds').unix() : null;
                    value = value ? JSON.stringify(value) : null;
                    stream.write(key + DELIMINATOR + value + DELIMINATOR + expiresIn + NEWLINE)
                    stream.close();
                    return resolve(true);

                }
            })
        );

    })
}

