const express = require("express")
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT
const cookiParser = require("cookie-parser");
const { DataBase } = require("./DBconnection")
const userrouter = require("./routes/user.router")
const chatRouter = require("./routes/Chatgpt.route");
const auth = require("./middleware/auth")
const app = express()
const bodyParser = require('body-parser');
app.use(express.json())
app.use(cors())
app.use(cookiParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userrouter)
app.use(auth)
app.use("/chatgpt", chatRouter);

app.listen(port,async () => {
    try {
        await DataBase
        console.log(`Server is running on port${port}`)
    } catch (error) {
        console.error(error)
    }

})


