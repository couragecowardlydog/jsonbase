var fs = require('fs');
var es = require('event-stream');
const NEWLINE = '\n';
const DELIMINATOR = '|'
module.exports = function (store, key, value, expiresIn) {
    const updatedFile = `${store}.updated`;
    return new Promise((resolve, reject) => {
        if (!store)
            throw 'EEXIST';
        var read = fs.createReadStream(store)
        const stream = fs.createWriteStream(updatedFile, { encoding: 'utf8', autoClose: true });

        var __discard = false;
        var __removed = false;
        read.pipe(es.split()).pipe(
            es.mapSync(function (line) {
                var __value__ = line.toString().trim().split('|');

                if ((__value__[0].toString().trim() == key)) {
                    if ((__value__[2].toString() != 'null') && (moment(+__value__[2]).isBefore(moment()))) {
                        /**
                         * 1. Stop stream
                         * 2. Discard updated file
                         */
                        __discard = true;
                        return reject('107');

                    }
                    __removed = true;
                    expiresIn = expiresIn ? moment().add(expiresIn, 'seconds').unix() : null;
                    value = value ? JSON.stringify(value) : null;
                    line = key + DELIMINATOR + value + DELIMINATOR + expiresIn ;
                }
                stream.write(line == '' ? line : line + NEWLINE);
            }).on('error', function (err) {
                console.debug('Error while reading file.', err);
                return reject('108');
            }).on('end', function () {
                if (!read.destroyed)
                    read.destroy();
                stream.end();
                if (__removed && !__discard)
                    return resolve(true);
                if (!__removed && !__discard)
                    return resolve(false)
            })
        );


        stream.on('finish', async () => {
            try {
                if (__discard)
                    return fs.unlinkSync(updatedFile);
                replace(store, updatedFile)
            } catch (error) {
            }
        });
    })
}

function replace(oldPath, newPath) {
    fs.renameSync(newPath, oldPath);
    // fs.unlinkSync(newPath);
}
