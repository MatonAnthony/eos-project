var server = require('./server');
var ds = server.dataSources.database;

var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
ds.automigrate(lbTables, function(er) {
    if (er) throw er;
    console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
    ds.disconnect();
});

ds.autoupdate(null, function (err) {
  if(err) return err;
  return true;
});
