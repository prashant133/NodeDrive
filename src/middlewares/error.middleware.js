const errorMiddleware = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "Internal server Error" });
};

module.exports = errorMiddleware;
