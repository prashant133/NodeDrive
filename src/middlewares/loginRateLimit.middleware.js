const { client } = require("../config/redis");

const loginRateLimit = async (req, res, next) => {
  try {
    const ip = req.ip;

    const key = `login:${ip}`;
    const maxAttempts = 5;
    const windowSeconds = 10 * 60;

    const attempts = await client.incr(key);

    if (attempts === 1) {
      await client.expire(key, windowSeconds);
    }

    if (attempts > maxAttempts) {
      // “How many seconds left before this key expires?”
      const ttl = await client.ttl(key);

      return res.status(429).json({
        success: false,
        message: `Too many login attempts. Try again in ${ttl} seconds`,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = loginRateLimit;
