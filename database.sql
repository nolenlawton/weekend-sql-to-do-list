CREATE TABLE "to-do_table" (
    "task" VARCHAR(80) NOT NULL,
    "isCompleted" BOOLEAN
);

-- dummy data --

INSERT INTO "to-do_table" ("task", "isCompleted")
VALUES 
('Task 1', false),
('Task 2', true),
('Task 3', false),
('Task 4', true),
('Task 5', false);