INSERT INTO department (name)
VALUES ("Lakers"),
       ("Nets");


INSERT INTO role (title, department_id, salary)
VALUES ("small_forward", 1, 44000000),
       ("point_guard", 2, 33000000);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("lebron","james", 1, NULL),
    ("kyrie","irving",2,1);