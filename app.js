const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cors = require('cors');

const authRoutes = require("./routes/auth"),
      postsRoutes = require("./routes/posts"),
      commentsRoutes = require("./routes/comments");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", {
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
const serverPort = 8080;
app.listen(serverPort, function () {
  console.log('Server listening on port ' + serverPort);
});
