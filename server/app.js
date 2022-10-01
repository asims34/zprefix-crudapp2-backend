const express = require("express");
const inventoryRouter = require("./routes/inventoryRouter");
const userRouter = require("./routes/userRouter");
const port = 8000;
const cors = require("cors");
const morgan = require("morgan");
const router = express.Router();

const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("We are up and running!");
});

// const checkUser = (req, res, next) => {};

// app.post("/login", (req, res) => {
//   console.log(req.body);
//   knex("users")
//     .select(["username", "first_name", "last_name", "id"])
//     .where("username", req.body.username)
//     .then((user) => {
//       console.log(user);
//       user[0] ? res.status(200).json(user) : res.status(404);
//     })
//     .catch((error) => {
//       res.status(500).json(error);
//     });
// });

app.use("/inventory", inventoryRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;

/*
fetch localhost:8000/login,

body {
  username: "sims",
  password: 
}
*/
