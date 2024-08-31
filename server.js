const StaticServer = require("static-server");
var server = new StaticServer({
  rootPath: "./dist",
  port: 800,
});

server.start(() => {
  console.log(`server starts at port ${server.port}`);
});
