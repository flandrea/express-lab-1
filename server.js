const express = require("express");
const cartitems = require('./cartitems')

const app = express();

app.use(express.json());

const port = 3000;

app.use("/cartitems/", cartitems);



app.listen(port, () => console.log(`Listening on port: ${port}.`));


console.log("http://localhost:" + port + "/cartitems");