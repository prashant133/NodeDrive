const { client } = require("../config/redis");

const uploadRateLimit = async (req, res, next) => {
  try {
    const userId = req.user?.userId;

    const key = `upload:${userId}`;
    const maxUploads = 20;
    const windowSeconds = 10 * 60;

    const uploads = await client.incr(key);

    if (uploads === 1) {
      await client.expire(key, windowSeconds);
    }

    if (uploads > maxUploads) {
      const ttl = await client.ttl(key);

      return res.status(429).json({
        success: false,
        message: `Too many login attempts. Try again in ${ttl} seconds`,
      });
    }
    next()
  } catch (error) {
    next(error);
  }
};


module.exports = uploadRateLimit;