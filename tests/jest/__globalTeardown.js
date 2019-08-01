require("@babel/polyfill");
module.exports = async () => {
  console.log("server closing");

  await global.httpServer.stop(() => {
    console.log("server closesed");
  });
};
