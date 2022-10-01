const express = require("express");
const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);
// const { default: knex } = require("knex");
// const inventoryRouter = require("../controllers/inventoryController");
const router = express.Router();

exports.getAllItems = (req, res) => {
  knex("items")
    .select("*")
    .then((items) => res.status(200).json(items));
};

exports.createItem = (req, res) => {
  //   const { name, description, quantity } = req.body;
  knex("items")
    .insert(req.body)
    .then((items) => {
      res.status(200).json({
        message: "Item created successfully",
      });
    });
};

exports.getItem = (req, res) => {
  knex("items")
    .first("*")
    .where("id", req.params.id)
    .then((items) => res.status(200).json(items));
};

exports.updateItem = (req, res) => {
  knex("items")
    .where("id", req.params.id)
    .update(req.body)
    .then((items) => {
      res.status(200).json({
        message: "Item updated successfully",
      });
    });
};

exports.deleteItem = (req, res) => {
  knex("items")
    .where("id", req.params.id)
    .delete()
    .then((items) => {
      res.status(200).json({
        message: "Item deleted successfully",
      });
    });
};

exports.createFromClient = (req, res) => {
  console.log(req.body);
  knex("items")
    .insert(req.body)
    .then((items) => {
      res.status(200).json({
        message: "Item created successfully",
      });
    });
};
//   knex("items")
//     .insert({
//       name: req.body.name,
//       description: req.body.description,
//       quantity: req.body.quantity,
//     })
//     .then((items) => {
//       res.status(200).json({
//         message: "Item created successfully",
//       });
//     });
// };
