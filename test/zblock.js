var expect = require('chai').expect;
var store = require('../index')('./db');
describe('Parallel Test', () => {

    it('Trying to add key/value when another process using same database', async () => {
        var key = "1";
        var value = {
            "key": "value"
        }
        expect(await store.insert(key, value)).to.be.equal(false);
    });

});


