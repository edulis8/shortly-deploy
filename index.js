var app = require('./server.js');


//app.set('port', (process.env.PORT || 5000));
 var port = process.env.PORT || 4586;

app.listen(port);

console.log('Server now listening on port ' + port);
