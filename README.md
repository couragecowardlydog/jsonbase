# Key Valu Store 

## Installation

Install package directly fom npm ,

```shell
npm install jsonbase-store
```

#### Intialize store

Either specify file path or new file will be created in current working directory

```js
var store = require('./index')('./db');
```


#### Insert

```js
await store.insert("1", { 'key' : 'value' },1000);
```


#### Update

```js
await store.update("1", { 'key' : 'value' });
```


#### Select

```js
await store.update("1");
```


#### Delte

```js
await store.update("1");
```

