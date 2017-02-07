var server = require('./server');
var ds = server.dataSources.database;
//var dataSource = app.dataSources.database;
ds.autoupdate(null, function (err) {
  if(err) return err;
  return true;
});
