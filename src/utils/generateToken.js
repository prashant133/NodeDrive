const crypto = require("crypto");

const generateShareToken = () => {
  const token = crypto.randomBytes(16).toString("hex");

  return token;
};

module.exports = generateShareToken;
