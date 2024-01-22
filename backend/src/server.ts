import express from 'express';
const port = 3600;
const app = express();

app.get("/", (req, res) => {
    res.send("Hello, world!");
})

app.listen(port, () => console.log("Server running at port " + port));