var localDB = new PouchDB('application');
var remoteDB = new PouchDB('http://admin:hola123@localhost:5984/application');
localDB.info().then(function (info) {
    console.log(info);
})

localDB.sync(remoteDB)