INSERT INTO department (name)
VALUES ("Web Development"),
       ("Data Science");


INSERT INTO role (title, department_id, salary)
VALUES ("ab", 1, 69),
       ("cd", 2, 69);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("lebron","james", 1, NULL),
    ("kyrie","irving",2,1);