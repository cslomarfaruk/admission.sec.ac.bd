import { createConnection } from "./db.js";

export const insertData = async (table, data) => {
  const connection = await createConnection();
  const columns = Object.keys(data).join(", ");
  const placeholders = Object.keys(data)
    .map(() => "?")
    .join(", ");
  const values = Object.values(data);

  const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
  console.log("Query:", query);
  console.log("Values:", values);
  
  try {
    const [result] = await connection.query(query, values);
    return result;
  } catch (error) {
    console.error(`Error inserting data into ${table}:`, error.message);
    throw error;
  }
};


// FETCH Data
export const fetchData = async (table, conditions = {}, limit = 10) => {
  const pool = createConnection(); 
  const whereClause = Object.keys(conditions)
    .map((key) => `${key} = ?`)
    .join(" AND ");
  const values = Object.values(conditions);

  const query = `SELECT * FROM ${table} ${
    whereClause ? `WHERE ${whereClause}` : ""
  } LIMIT ?`;
  values.push(limit);

  console.log("Executing Query:", query, values);

  try {
    const [rows] = await pool.query(query, values); 
    return rows;
  } catch (error) {
    console.error(`Error fetching data from ${table}:`, error.message);
    throw error;
  }
};



// UPDATE Data
export const updateData = async (table, updates, conditions) => {
  const connection = await createConnection();
  const setClause = Object.keys(updates)
    .map((key) => `${key} = ?`)
    .join(", ");
  const whereClause = Object.keys(conditions)
    .map((key) => `${key} = ?`)
    .join(" AND ");

  const values = [...Object.values(updates), ...Object.values(conditions)];

  try {
    const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
    const [result] = await connection.execute(query, values);
    // await connection.end();
    return result;
  } catch (error) {
    console.error(`Error updating data in ${table}:`, error.message);
    throw error;
  }
};

// DELETE Data
export const deleteData = async (table, conditions) => {
  const connection = await createConnection();
  const whereClause = Object.keys(conditions)
    .map((key) => `${key} = ?`)
    .join(" AND ");
  const values = Object.values(conditions);

  try {
    const query = `DELETE FROM ${table} WHERE ${whereClause}`;
    const [result] = await connection.execute(query, values);
    console.log("item deleted........!");
    return result;
  } catch (error) {
    console.error(`Error deleting data from ${table}:`, error.message);
    throw error;
  }
};
