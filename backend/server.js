const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express()

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8989;
const staticDist = "./dist/inspiration-tracker";
const db = require("./db");

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

app.use(express.static(staticDist));

// root
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: staticDist });
});

app.get("/api/getInspirationData", (req, res) => {
  const stmt = "SELECT * FROM inspiration ORDER BY playerName";

  db.query(stmt, (err, result) => {
    if (result) {
      res.status(200).send(result);
    }

    if (err) {
      res.status(500).send({ ERR: "CANNOT GET INSPIRATION" });
    }
  });
});

app.post("/api/updateInspiration", (req, res) => {
  const body = req.body;
  const stmt = "UPDATE inspiration SET inspOne = ?, inspTwo = ?, inspThree = ?, inspFour = ?, inspFive = ? WHERE playerKey = ?";

  db.query(
    stmt,
    [
      body.inspOne,
      body.inspTwo,
      body.inspThree,
      body.inspFour,
      body.inspFive,
      body.playerKey,
    ],
    (err, result) => {
      if (result) {
        res.status(200).send(result);
      }

      if (err) {
        console.warn(err)
        res.status(500).send({ ERR: "CANNOT GET INSPIRATION" });
      }
    }
  );
});
