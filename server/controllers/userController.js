const { getNodeText } = require("@testing-library/react");

const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const SECRET = "this_is_my_secret_and_you_will_never_find_out";

exports.getAllUsers = (req, res) => {
  knex("users")
    .select("*")
    .then((users) => res.status(200).json(users));
};

// exports.signup = (res, req) => {
//   knex("users")
//     // .select("*")
//     .insert([
//       {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         username: req.body.username,
//         password: req.body.password,
//       },
//     ])
//     .returning(["id", "username"])
//     .then((users) => {
//       res.status(200).json(users);
//     })
//     .catch((err) => next(err));
// };

exports.signup = (req, res, next) => {
  // let req.body = req.body.password.toString();
  console.log(req.body);
  //   let { username, password } = req.body;
  //   password = password.toString();

  bcrypt.hash(req.body.password_digest, 10).then((hashedPassword) => {
    return (
      knex("users")
        .insert({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password_digest: hashedPassword,
        })
        //   .returning(["id", "username"])
        .then((users) => {
          res.json(users);
        })
        .catch((error) => next(error))
    );
  });
};

exports.login = (request, response, next) => {
  knex("users")
    .where({ username: request.body.username })
    .first()
    .then((users) => {
      if (!users) {
        response.status(401).json({
          error: "User was not  found",
        });
      } else {
        return bcrypt
          .compare(request.body.password, users.password_digest)
          .then((isAuthenticated) => {
            if (!isAuthenticated) {
              response.status(401).json({
                error: "Unauthorized Access!",
              });
              //   response.status(200).json({ auth: true, token: token });
            } else {
              return jwt.sign(users, SECRET, (error, token) => {
                response.status(200).json({
                  id: users.id,
                  username: users.username,
                  first_name: users.first_name,
                  last_name: users.last_name,
                });
              });
            }
          });
      }
    });
};

exports.verify = (request, response, next) => {
  const token = request.headers.authorization.split(" ")[1];
  jwt.verify(token, SECRET, (error, decodedToken) => {
    if (error) {
      response.status(401).json({
        message: "Unauthorized Access!",
      });
    } else {
      response.status(200).json({
        id: decodedToken.id,
        username: decodedToken.username,
      });
    }
  });
};

// exports.isUserAuth = verifyJWT =>
//   (req, res) => {
//     res.send("you are authenticated");
//   };

// const verifyJWT = (req, res) => {
//   const token = req.headers["x-access-token"];
//   if (!token) {
//     res.snd("Yo, we need a token");
//   } else {
//     jwt.verify(token, SECRET, (error, decodedToken) => {
//       if (error) {
//         res.json({ auth: false, message: "you failed to authenicate" });
//       } else {
//         req.userId = decodedToken.id;
//       }
//     });
//   }
// };

exports.getUser = (req, res) => {
  knex("users")
    .first("*")
    .where("id", req.params.id)
    .then((items) => res.status(200).json(items));
};

exports.updateUser= (req, res) => {
    knex("users")
      .where("id", req.params.id)
      .update(req.body)
      .then((users) => {
        res.status(200).json({
          message: "Item updated successfully",
        });
      });
  };