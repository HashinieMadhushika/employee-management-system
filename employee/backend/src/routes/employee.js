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
    res.json(rows);
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

module.exports = router; 
