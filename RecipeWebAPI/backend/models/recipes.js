const db = require("../helpers/database");

// Get all recipes at once
exports.getAll = async function () {
  const query = "SELECT * FROM recipes;";
  const data = await db.run_query(query);
  return data;
};

// Get a recipe using the ID
exports.getById = async function getById(id) {
    let query = "SELECT * FROM recipes WHERE id = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
};

// PUT update on a recipe by ID
exports.updateRecipe = async function(id, updatedRecipe) {
  const query = `UPDATE recipes 
      SET title = ?, description = ?, ingredients = ?, instructions = ?, created_by = ?, prep_time = ?, cook_time = ? 
      WHERE id = ?;`;

  const values = [updatedRecipe.title, updatedRecipe.description, updatedRecipe.ingredients, updatedRecipe.instructions, updatedRecipe.created_by,
    updatedRecipe.prep_time, updatedRecipe.cook_time, id];

  return await db.run_query(query, values);
};

// Delete a recipe using the ID
exports.deleteById = async function(id) {
  const query = "DELETE FROM recipes WHERE id = ?";
  const values = [id];
  const result = await db.run_query(query, values);
  return result;
};