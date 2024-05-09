import { SequelizeAdapter } from "./adapter";
const { env } = process;

const db = new SequelizeAdapter({
  database: env.DB_NAME,
  host: env.DB_HOST,
  username: env.DB_USER,
  port: env.DB_PORT,
  password: env.DB_PASSWORD,
  dialect: "postgres",
  logging: false,
  models: [__dirname + "/models"],
});

export { db };
