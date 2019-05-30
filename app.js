const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cors = require('cors');

const Config = require('./config/backendConfig');

const authRoutes = require("./routes/auth"),
      postsRoutes = require("./routes/posts"),
      commentsRoutes = require("./routes/comments");

const db = `${Config.DATABASE.HOST}:${Config.DATABASE.PORT}/${Config.DATABASE.DB}`;
mongoose.connect(db, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

app.use("/api", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api", commentsRoutes);

app.use('/*',function(req, res) {
  res.status(404).json('Not Found');
});

const serverPort = Config.SERVER.PORT;
app.listen(serverPort, function () {
  console.log('Server listening on port ' + serverPort);
});
