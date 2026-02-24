const db = require("../helpers/database.js");

const recipeModel = {
  addRecipe: async (data) => {
    const {title, description, ingredients, instructions, created_by, prep_time, cook_time} = data;

    const query = `INSERT INTO recipes (title, description, ingredients, instructions, created_by, prep_time, cook_time)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [title, description, ingredients, instructions, created_by, prep_time, cook_time];

    const result = await db.run_query(query, values);
    return result;
  }
};

module.exports = recipeModel;