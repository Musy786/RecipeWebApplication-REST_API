const Router = require("@koa/router");
const router = new Router({prefix: "/recipes"});
const bodyParser = require('koa-bodyparser');

const basicAuth = require('../middleware/basicAuth');
const model = require("../models/recipes.js");
const recipeModel = require("../models/recipeModel.js");
const {validateRecipe} = require('../controllers/validation');

router.get("../", ctx => {
    ctx.body = {message: "Welcome to the Recipe API!"}
});

router.get("/", async (ctx) => {
    const recipes = await model.getAll();
  
    if (recipes.length > 0) {
      ctx.body = recipes;
    } else {
      ctx.status = 404;
      ctx.body = {error: "No recipes found!"};
    }
});

router.get("/:id", async (ctx) => {
    const id = ctx.params.id;
    const recipe = await model.getById(id);

    if (recipe.length > 0) {
        ctx.body = recipe[0];
    }
    else {
        ctx.status = 404;
        ctx.body = {error: "Recipe not found!"};
    }
});

router.post("/", basicAuth, bodyParser(), validateRecipe, async (ctx) => {
    const recipeData = ctx.request.body;

    try {
      const result = await recipeModel.addRecipe(recipeData);
      
      ctx.body = {
        message: "Recipe added successfully!",
        recipe_id: result.insertId
      };
      ctx.status = 201;
    } 
    catch (error) {
      console.error("POST /recipes error:", error);
      ctx.status = 500;
      ctx.body = {error: "Failed to add recipe!"};
    }
});

router.put('/:id', basicAuth, bodyParser(), validateRecipe, async (ctx) => {
  const id = ctx.params.id;
  const updatedRecipe = ctx.request.body;

  try {
      const result = await model.updateRecipe(id, updatedRecipe);

      if (result.affectedRows > 0) {
          ctx.body = {message: "Recipe updated successfully"};
          ctx.status = 200;
      } 
      else {
          ctx.status = 404;
          ctx.body = { error: "Recipe not found" };
      }
  } 
  catch (error) {
      console.error("PUT /recipes/:id error:", error);
      ctx.status = 500;
      ctx.body = {error: "Failed to update recipe"};
  }
});

router.delete("/:id", basicAuth, async (ctx) => {
  const id = ctx.params.id;

  try {
    const result = await model.deleteById(id);

    if (result.affectedRows > 0) {
      ctx.body = { message: "Recipe deleted successfully" };
      ctx.status = 200;
    } 
    else {
      ctx.status = 404;
      ctx.body = { error: "Recipe not found" };
    }
  }
  catch (error) {
    console.error("DELETE /recipes/:id error:", error);
    ctx.status = 500;
    ctx.body = { error: "Failed to delete recipe" };
  }
});

module.exports = router;