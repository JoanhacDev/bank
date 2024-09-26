-- Active: 1723640014752@@127.0.0.1@3306@empresa

-- Tabla de trabajadores
CREATE TABLE trabajadores (
    CC INT PRIMARY KEY,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    password VARCHAR(15),
    birth_date DATE,
    phone VARCHAR(15),
    email VARCHAR(320),
    gender ENUM('MASCULINO', 'FEMENINO', 'OTRO')
);

-- Insertar datos en la tabla trabajadores
INSERT INTO trabajadores (CC, first_name, last_name, password, birth_date, phone, email, gender)
VALUES (123456789, 'Gariel', 'Estupiñan', 'gabo123', '1991-08-27', '3124115894', 'gaboestupiñan@example.com', 'MASCULINO');

SELECT * FROM trabajadores;