var expect = require('chai').expect;
var store = require('../index')('./db');


describe('Sanitarity Test', () => {

    it('add key/value to store', async () => {
        var key = "1";
        var value = {
            "key": "value"
        }

        expect(await store.insert(key, value)).to.be.equal(true);
    });


    it('add key/value to store', async () => {
        var key = "4";
        var value = {
            "key": "value"
        }

        expect(await store.insert(key, value)).to.be.equal(true);
    });


    it('add existing key/value to store', async () => {
        var key = "1";
        var value = {
            "key": "value"
        }
        expect(await store.insert(key, value)).to.be.equal(false);
    });


    it('select value using key', async () => {
        var key = "1";
        expect(await store.select(key)).to.not.be.null;
    });


    it('remove using key', async () => {
        var key = "1";
        expect(await store.delete(key)).to.be.equal(true);
    });


    it('remove key not in store', async () => {
        var key = "1";
        expect(await store.delete(key)).to.be.equal(false);
    });


    it('add key/value to store', async () => {
        var key = "1";
        var value = {
            "key": "value"
        }

        expect(await store.insert(key, value)).to.be.equal(true);
    });

    it('update key/value to store', async () => {
        var key = "1";
        var value = {
            "key": "update"
        }

        expect(await store.update(key, value)).to.be.equal(true);
    });



    it('add key/value to store', async () => {
        var key = "2";
        var value = {
            "key": "value"
        }

        expect(await store.insert(key, value)).to.be.equal(true);
    });


    it('add key/value to store', async () => {
        var key = "3";
        var value = {
            "key": "value"
        }

        expect(await store.insert(key, value)).to.be.equal(true);
    });


});


