var store = require('./index')('./db');
var index = 0;

var a = setInterval(() => {
    if (index < 100)
         store.insert(index, { "hao": "hello" });
    else
        clearTimeout();
    index++;
}, 1000);



// async function get(params) {
//     var s = await store.delete("51")
//     console.log(s);
// }

// get()