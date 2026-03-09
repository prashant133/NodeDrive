const ApiError = require("../../utils/ApiError");
const User = require("./user.model");
const jwt = require("jsonwebtoken");

// const generateToken = (user) => {
//   return jwt.sign({ userId: user_id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

const registration = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = { registration };
