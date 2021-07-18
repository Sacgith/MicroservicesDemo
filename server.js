const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Api running ..."));

//Routers
app.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
