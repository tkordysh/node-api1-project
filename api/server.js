// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");
const server = express();
server.use(express.json());

//GET
server.get("/", (req, res) => {
  console.log("I received a request!");
  res.send("<h1>Hello world!</h1><p>Here is a paragraph</p>");
});

//get all
server.get("/api/users", (req, res) => {
  User.find().then((result) => {
    if (result === null) {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    } else {
      res.json(result);
    }
  });
});

//get by id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id).then((result) => {
    if (result == null) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.json(result);
    }
  });
});

//POST
server.post("/api/users", (req, res) => {
    const user = req.body;
  User.insert(user)
    .then((result) => {
      if (!user.name || !user.bio) {
        res
          .status(400)
          .json({ message: "Please provide name and bio for the user" });
      } else {
        res.status(201).json(result);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "There was an error while saving the user to the database",
      });
    });
});

//PUT
server.put("/api/users/:id", (req, res) => {
  User.update(req.params.id, req.body).then((result) => {
    if (result == null) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else if (!req.body.name || !req.body.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      res.status(200).json(result);
    }
  });
});

//DELETE
server.delete("/api/users/:id", (req, res) => {
  User.remove(req.params.id).then((result) => {
    if (result == null) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.json(result);
    }
  });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
