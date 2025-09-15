// seedEmployees.js
require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

const employees = [
  { firstName: "John", lastName: "Dale", email: "john@example.com" },
  { firstName: "Jane", lastName: "Smith", email: "jane@example.com" },
  { firstName: "Mike", lastName: "Johnson", email: "mike@example.com" },
  { firstName: "Sarah", lastName: "Williams", email: "sarah@example.com" },
  { firstName: "Alex", lastName: "Brown", email: "alex@example.com" }
];

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  const hashedPassword = await bcrypt.hash("Password123", 10);

  for (let emp of employees) {
    // Insert into users
    const [userResult] = await connection.execute(
      "INSERT INTO users (firstName, lastName, email, password, userType) VALUES (?, ?, ?, ?, ?)",
      [emp.firstName, emp.lastName, emp.email, hashedPassword, "employee"]
    );

    // Insert into employees (with defaults)
    await connection.execute(
      "INSERT INTO employees (user_id, position, department, status) VALUES (?, ?, ?, ?)",
      [userResult.insertId, "", "", "ACTIVE"]
    );

    console.log(`✅ Added employee: ${emp.firstName} ${emp.lastName}`);
  }

  await connection.end();
}

seed().catch(err => console.error(err));
