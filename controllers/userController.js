const User = require('../models/userModel');

// Register or login a user
exports.registerUser = async (req, res) => {
  const { name, email, auth0Id } = req.body;
  try {
    let user = await User.findOne({ auth0Id });

    if (user) {
      return res.status(200).json({ message: 'User already exists', user });
    } else {
      user = new User({
        name,
        email,
        auth0Id,
      });

      await user.save();
      return res.status(201).json({ message: 'New user registered successfully', user });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
