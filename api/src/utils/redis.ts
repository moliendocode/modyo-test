import "dotenv/config";
import Redis from "ioredis";

const redis = new Redis(process.env.redisURI || "localhost");

export default redis;
