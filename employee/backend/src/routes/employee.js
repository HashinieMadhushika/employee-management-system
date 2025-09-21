 // routes/employees.js
const express = require("express");
const pool = require("../db");
const router = express.Router();

// Get all employees
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT e.id, u.firstName, u.lastName, u.email, e.position, e.department, e.status 
       FROM employees e 
       JOIN users u ON e.user_id = u.id`
    );
    //res.json(rows);

    const employees = rows.map(emp => ({
      ...emp,
      initials: `${emp.firstName[0] || ''}${emp.lastName[0] || ''}`.toUpperCase(),
      selected: false
    }));
    res.json(employees);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});



// Admin updates employee
router.put("/:id", async (req, res) => {
  const { position, department, status } = req.body;
  const { id } = req.params;

  try {
    await pool.execute(
      "UPDATE employees SET position = ?, department = ?, status = ? WHERE id = ?",
      [position || "", department || "", status || "", id]
    );
    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});

// Delete an employee - Admin only
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute(
      "DELETE FROM employees WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { firstName, lastName, email, position, department, status } = req.body;

  try {
    // generate a hashed default password
    const hashedPassword = await bcrypt.hash("defaultPass123", 10);

    // insert into users
    const [userResult] = await pool.execute(
      "INSERT INTO users (firstName, lastName, email, password, userType) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword, "employee"]
    );

    const userId = userResult.insertId;

    // insert into employees
    const [empResult] = await pool.execute(
      "INSERT INTO employees (user_id, position, department, status) VALUES (?, ?, ?, ?)",
      [userId, position, department, status || "ACTIVE"]
    );

    const employeeId = empResult.insertId;

    res.status(201).json({
      id: employeeId,
      firstName,
      lastName,
      email,
      position,
      department,
      status: status || "ACTIVE",
      initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
      selected: false,
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to add employee" });
  }
});

module.exports = router; 
