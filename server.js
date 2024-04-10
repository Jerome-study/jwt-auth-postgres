const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const cookieParser = require("cookie-parser");
const { verify } = require("./middleware/auth");
const cors = require("cors")

// Env Variables
require("dotenv").config();

app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

app.use(cors({
    origin: process.env.ORIGINURL || 'http://localhost:5173',
    credentials: true
}))


app.get("/protected", verify, (req,res) => {
    res.json(req.user);
}); // A sample route to test if verify jwt is working


app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});