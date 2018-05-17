var http = require('http');
var os = require('os');
var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  var hostname = os.hostname();
  var ifaces = os.networkInterfaces();
  var ipAddress;
 
  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      console.log(ifname, iface.address);
      // en0 192.168.1.NNN
      ipAddress = iface.address;
    });
  });
  response.writeHead(200);
  response.end(ipAddress + " " + hostname);
};
var www = http.createServer(handleRequest);
www.listen(8080);
