const express = require("express");
const connectDB = require("./config/db");
const app = express();
const amqp = require("amqplib");
const { check, validationResult } = require("express-validator");
const User = require("./models/User");
//connect Database
connectDB();

var channel, connection;
connect();
async function connect() {
  try {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("rabbit");
  } catch (err) {
    console.log(err);
  }
}

//Init Middleware
app.use(express.json({ extended: false }));

app.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("age", "Age is required").not().isEmpty(),
  ],
  (req, res) => res.send("Api running ...")
);

app.post("/send", [check()], async (req, res) => {
  const { name, age, message } = req.body;
  try {
    const user = new User({
      name,
      age,
      message,
    });

    await user.save();
    await channel.sendToQueue(
      "rabbit",
      Buffer.from(JSON.stringify({ name, age }))
    );
    // await channel.close();
    // await connection.close();
    return res.json(user);
  } catch (err) {
    console.error(err.mesasge);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
