const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const ctable = require('console.table');
const { printTable } = require('console-table-printer');



const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'fuckmedad',
    database: 'employeeTracker_db'
  },
  console.log(`Connected to the employeeTracker_db database.`)
);

const inquirer = require('inquirer');


const questions=[
    {
        type: 'list',
        choices:["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "quit"],
        message: "what would you like to do?",
        name: "actions",
    },
    {
        type: 'input',
        message: "what is the new department's name?",
        name: "departmentName",
        when: (answers)=>answers.actions==="add a department"
    },
    {
        type: 'input',
        message: "what is the new role's title?",
        name: "roleTitle",
        when: (answers)=>answers.actions==="add a role"
    },
    {
        type: 'input',
        message: "what is the new role's department id?",
        name: "roleDepartmentId",
        when: (answers)=>answers.actions==="add a role"
    },
    {
        type: 'input',
        message: "what is the new role's salary?",
        name: "salary",
        when: (answers)=>answers.actions==="add a role"
    },
    {
        type: 'input',
        message: "what is the new employee's first name?",
        name: "firstName",
        when: (answers)=>answers.actions==="add an employee"
    },
    {
        type: 'input',
        message: "what is the new employee's last name?",
        name: "lastName",
        when: (answers)=>answers.actions==="add an employee"
    },
    {
        type: 'input',
        message: "what is the new employee's role id?",
        name: "roleId",
        when: (answers)=>answers.actions==="add an employee"
    },
    {
        type: 'input',
        message: "what is the new employee's manager's id?",
        name: "managerId",
        when: (answers)=>answers.actions==="add an employee"
    },
    {
        type: 'input',
        message: "what is the id of the employee you wish to update?",
        name: "updateEmployeeId",
        when: (answers)=>answers.actions==="update an employee role"
    },
    {
        type: 'input',
        message: "what is the new role id you wish to assign?",
        name: "updateRoleId",
        when: (answers)=>answers.actions==="update an employee role"
    },
]

function dostuff(){
    inquirer.prompt(questions).then(answers=>{
        if(answers.actions==="view all departments"){
            const sql = `SELECT * FROM department;`
            db.query(sql, (err,results)=>{
                printTable(results);
                dostuff();
            })}else if(answers.actions==="view all roles"){
            const sql = `SELECT  role.id, role.title, department.name AS department, role.salary FROM role
            LEFT JOIN department ON role.department_id=department.id;`
            db.query(sql, (err,results)=>{
                printTable(results);
                dostuff();
            })}else if(answers.actions==="view all employees"){
                const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id
                FROM employee
                LEFT JOIN role ON employee.role_id=role.id
                LEFT JOIN department ON role.department_id=department.id
                ;`
                db.query(sql, (err,results)=>{
                    printTable(results);
                    dostuff();
            })}else if(answers.actions==="add a department"){
                const sql = `INSERT INTO department (name) VALUES (?)`;
                db.query(sql,answers.departmentName, (err,results)=>{
                    console.log("department added")
                    dostuff();
                })
            }else if(answers.actions==="add a role"){
                const sql = `INSERT INTO role (title, departmend_id, salary) VALUES (?)`;
                const param =[answers.roleTitle,answers.roleDepartmentId,answers.salary]
                db.query(sql,param, (err,results)=>{
                    console.log("role added")
                    dostuff();
                })
            }else if(answers.actions==="add an employee"){
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?)`;
                const param =[answers.firstName,answers.lastName,answers.roleId,answers.managerId]
                db.query(sql,param, (err,results)=>{
                    console.log("employee added")
                    dostuff();
                })
            }else if(answers.actions==="update an employee role"){
                const sql = `UPDATE employee
                SET role_id = ?
                WHERE id = ?`;
                const param =[answers.updateRoleId,answers.updateEmployeeId]
                db.query(sql,param, (err,results)=>{
                    console.log("employee updated")
                    dostuff();
                })
            }

            
            
            })
        }




// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

dostuff();