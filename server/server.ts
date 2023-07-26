import express from "express";
import cors from "cors";

const app: express.Application = express();
const port = 80;

app.use(cors());
app.use(express.json());

app.post("/problem", (req, res) => {
    console.log(req.body);
    res.json({ status: "success" });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
