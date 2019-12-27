var fs = require('fs');
var es = require('event-stream');
module.exports = function (store, key) {
    return new Promise((resolve, reject) => {
        if(!store)
            throw 'EEXIST';
        var read = fs.createReadStream(store)
        read.pipe(es.split()).pipe(
            es.mapSync(function (line) {
                var __value__ = line.toString().split('|');
                if (__value__[0] == key) {
                    if (__value__[2].toString() != 'null' && moment(+__value__[2]).isBefore(moment()))
                        return reject('107');
                    read.destroy();
                    return resolve(__value__[1]);
                }
            }).on('error', function (err) {
                console.log('Error while reading file.', err);
            }).on('end', function () {
                if (!read.destroyed)
                    read.destroy();
                return resolve(null);
            })
        );
    })
}

