CREATE TABLE "to-do_table" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(80) NOT NULL,
    "isCompleted" BOOLEAN,
    "completedDate" VARCHAR(20)
);

-- dummy data --

INSERT INTO "to-do_table" ("task", "isCompleted", "completedDate")
VALUES 
('change colors/css', true, '2/5'),
('add time completed', true, '12/6'),
('mop', false, NULL),
('walk dogs', true, '7/9'),
('shower', false, NULL),
('relax', true, '2/5'),
('make dinner', false, NULL),
('finish assignment', false, NULL);