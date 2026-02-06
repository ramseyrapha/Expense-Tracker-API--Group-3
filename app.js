// Expense Tracker API
// Build API that allows users to add, list, update and delete expenses with details such as
// amount, date and category

require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json()); // JSON Parser

const expensesPath = path.join(__dirname, "expenses.json");

let expenses = JSON.parse(fs.readFileSync(expensesPath, "utf-8"))


// list elements in the expenses dummy-database
app.get("/api/v1/expenses", (req, res) => {
    res.status(200).json({
        status : "success",
        data : {
            expenses
        }
    });
});


// Read just a single expense
app.get("/api/v1/expenses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const expense = expenses.find(e => e.id === id);

    if (id > expenses.length) {
        return res.status(404).json({
            status: "failed",
            message: "Invalid ID"
        });
    };

    res.status(200).json({
        status: "success",
        data : {
            expense 
        }
    });
});

// add expenses
app.post("/api/v1/expenses", (req, res) => {
    const newId = expenses[expenses.length - 1].id + 1;
    const newExpense = Object.assign({id: newId}, req.body);
    expenses.push(newExpense)

    fs.writeFile(expensesPath, JSON.stringify(expenses, null, 2), err => {
        res.status(201).json({
            status: "success",
            data : {
                expense : newExpense
            }
        });
    });
});

// Update the API
app.patch("/api/v1/expenses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = expenses.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "failed",
      message: "There is no ID as such in this database"
    });
  }

  const updateExpense = Object.assign(expenses[index], req.body);

  fs.writeFile(expensesPath, JSON.stringify(expenses, null, 2), err => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error: Failed to save data"
      });
    }

    res.status(200).json({
      status: "success",
      message: "The expenses have been successfully updated",
      data: {
        expense: updateExpense
      }
    });
  });
});

// Delete expense by id
app.delete("/api/v1/expenses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const expenseExists = expenses.find(e => e.id === id);

  if (!expenseExists) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid ID: Expense not found"
    });
  }

  // Filter creates a new array without the target ID
  const newExpenses = expenses.filter(e => e.id !== id);
  expenses = newExpenses;

  fs.writeFile(expensesPath, JSON.stringify(expenses, null, 2), err => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error: Could not update database"
      });
    }

    // Success response (204 No Content is standard for DELETE)
    res.status(204).json({
      status: "success",
      data: null
    });
  });
});


app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});