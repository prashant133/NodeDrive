const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => {
  console.log("Redis Client error", err);
});

const connectRedis = async () => {
  try {
    await client.connect();
    console.log("Redis connected");
  } catch (error) {
    console.log("Redis connection failed", error);
  }
};

module.exports = { client, connectRedis };
