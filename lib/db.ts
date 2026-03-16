import mysql, { type Pool, type RowDataPacket } from "mysql2/promise";

declare global {
  var __dbPool: Pool | undefined;
}

function getDbConfig() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  return {
    host: process.env.DB_HOST === "localhost" ? "127.0.0.1" : (process.env.DB_HOST || "127.0.0.1"),
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
}

const dbConfig = getDbConfig();

export const db: Pool =
  global.__dbPool ||
  mysql.createPool({
    ...(typeof dbConfig === "string" ? { uri: dbConfig } : dbConfig),
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    charset: "utf8mb4",
  });

if (process.env.NODE_ENV !== "production") {
  global.__dbPool = db;
}

export type DbRow = RowDataPacket;
