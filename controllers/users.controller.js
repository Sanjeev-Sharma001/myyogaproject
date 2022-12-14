const Users = require("../models/users.model");

const postRegister = async (req, res) => {
    try {
        const { username, age, joiningDate,batch } = req.body;
        const newUser = new Users({ username, age, joiningDate,batch });
        const result = await newUser.save();
        res.json(result);
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({
          message: "Failed to create new user",
          reason: "Already Exists in DB",
        });
      } else {
        res.status(500).json({ message: "Failed to create new user", error });
      }
    }
  };

  const getAllUsers = async (req, res) => {
    try {
      const userResult = await Users.find({});
      if (userResult) {
        res.status(200).json(userResult);
      } else {
        res.status(404).json({ message: "No Users found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user details", error });
    }
  };

  module.exports = { postRegister, getAllUsers}