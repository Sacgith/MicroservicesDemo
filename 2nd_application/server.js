const express = require("express");
const app = express();
const fs = require("fs");

var amqp = require("amqplib/callback_api");
const { type } = require("os");
const uri = "amqp://localhost:5672";

var count;
amqp.connect(uri, function (err, conn) {
  conn.createChannel(function (err, ch) {
    var q = "rabbit";
    ch.assertQueue(q, { durable: true }, function (err, data) {
      count = data.messageCount;
      var m = count.toString();
      fs.writeFileSync("./text.txt", m);
    });
    ch.consume(q, (data) => {
      ch.ack(data);
    });
  });
});
// fs.writeFileSync('/text.txt', count);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
