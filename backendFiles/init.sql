-- init.sql

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    student_number TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    period1 TEXT,
    period2 TEXT,
    period3 TEXT,
    period4 TEXT
);

-- Create event_checkin table
CREATE TABLE IF NOT EXISTS event_checkin (
    student_number TEXT,
    event_name TEXT,
    PRIMARY KEY (student_number, event_name),
    FOREIGN KEY (student_number) REFERENCES students(student_number)
);

-- Insert sample students
INSERT OR IGNORE INTO students VALUES
('348810184', 'Ricky Zou', '123', '333', '47', '1'),
('440021593', 'Susan He Chen', '123', '333', '47', '1'),
('350453023', 'Furqan Ahmad', '123', '333', '47', '1'),
('341036259', 'Alex Zhou', '101', '201', '301', '401'),
('512938456', 'Ethan Lin', '102', '202', '302', '402'),
('623984571', 'Jasmine Patel', '103', '203', '303', '403'),
('738291645', 'Daniel Kim', '104', '204', '304', '404'),
('350659033', 'Tristan Pinzari', '104', '204', '304', '404'),
('849173625', 'Chloe Nguyen', '105', '205', '305', '405');

-- Insert event check-in data
INSERT OR IGNORE INTO event_checkin VALUES
('348810184', 'Movie Night'), --ricky
('341036259', 'Prom'), --alex
('512938456', 'Prom'), --ethan
('350659033', 'Prom'), --tristan
('440021593', 'Prom'), --susan
('623984571', 'Movie Night'), --jasmine
('350453023', 'Band Field Trip'), --furqan
('738291645', 'Spring Fest'), --daniel
('849173625', 'Band Field Trip'); --chloe