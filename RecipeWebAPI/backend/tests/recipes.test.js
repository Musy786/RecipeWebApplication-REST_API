const mysql = require("promise-mysql");

process.env.DB_HOST = process.env.DB_HOST || "localhost";
process.env.DB_PORT = process.env.DB_PORT || "3306";
process.env.DB_USER = process.env.DB_USER || "root";
process.env.DB_PASSWORD = process.env.DB_PASSWORD || "root";
process.env.DB_DATABASE = "recipes_test";

const request = require("supertest");
const app = require("../app");
const db = require("../helpers/database");

const authHeader = "Basic " + Buffer.from("admin:password123").toString("base64");

beforeAll(async () => {
  const adminConnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  await adminConnection.query("CREATE DATABASE IF NOT EXISTS recipes_test;");
  await adminConnection.end();

  await db.testConnection();
  await db.run_query(`
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
  `);

  // Keep each test run deterministic and isolated from app data.
  await db.run_query("TRUNCATE TABLE recipes;");
  await db.run_query(
    `INSERT INTO recipes (title, description, ingredients, instructions, created_by, prep_time, cook_time)
     VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [
      "Test Recipe",
      "Seed data for testing",
      "Eggs, flour",
      "Mix and cook",
      "admin",
      4,
      15
    ]
  );
});

describe("Recipe API", () => {
  it("should return all recipes", async () => {
    const response = await request(app.callback()).get("/recipes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return 404 for a missing recipe", async () => {
    const response = await request(app.callback()).get("/recipes/1000000");
    expect(response.status).toBe(404);
  });

  it("should reject invalid POST data", async () => {
    const invalidRecipe = {
      title: "",
      ingredients: "",
      instructions: "",
      created_by: ""
    };

    const response = await request(app.callback())
      .post("/recipes")
      .send(invalidRecipe)
      .set("Content-Type", "application/json")
      .set("Authorization", authHeader);

    expect(response.status).toBe(400);
  });

  it("should create a recipe with valid authenticated POST data", async () => {
    const newRecipe = {
      title: "Test Recipe 1",
      description: "Second test recipe",
      ingredients: "Tomato, cheese",
      instructions: "Mix and cook",
      created_by: "admin",
      prep_time: 7,
      cook_time: 0
    };

    const response = await request(app.callback())
      .post("/recipes")
      .send(newRecipe)
      .set("Content-Type", "application/json")
      .set("Authorization", authHeader);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Recipe added successfully!");
    expect(response.body).toHaveProperty("recipe_id");
    expect(typeof response.body.recipe_id).toBe("number");
  });
});
