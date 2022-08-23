const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");
const port = config.port;

mongoose
  .connect(config.mongooseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    server = app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  })
  .catch((err) => {
    console.log("err: ", err);
  });
