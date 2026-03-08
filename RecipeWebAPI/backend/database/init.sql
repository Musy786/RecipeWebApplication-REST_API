CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    prep_time INT DEFAULT 0,
    cook_time INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO recipes (title, description, ingredients, instructions, created_by, prep_time, cook_time) VALUES
('Spaghetti Bolognese', 'A classic Italian pasta dish', 'Spaghetti, minced beef, tomato sauce, onion, garlic, olive oil', 'Brown the mince, add sauce, cook pasta, combine', 'admin', 15, 30),
('Chicken Stir Fry', 'Quick and healthy stir fry', 'Chicken breast, bell peppers, soy sauce, ginger, rice', 'Slice chicken, stir fry with vegetables, serve over rice', 'admin', 10, 15);
