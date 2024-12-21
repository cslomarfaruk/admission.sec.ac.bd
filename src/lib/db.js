import mysql from "mysql2/promise";

let pool; // Declare pool globally

export const createConnection = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: "localhost", // Your DB host
      user: "root",      // Your DB user
      password: "root",  // Your DB password
      database: "student_portal", // Your database name
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log("Database pool created!");
  }
  return pool;
};
