const {Validator, ValidationError} = require('jsonschema');
const recipeSchema = require('../schemas/recipe.json');

const v = new Validator();

exports.validateRecipe = async (ctx, next) => {
  try {
    v.validate(ctx.request.body, recipeSchema, {throwError: true});
    await next();        // Validation passed
  } 
  catch (error) {
    if (error instanceof ValidationError) {
      ctx.status = 400;
      ctx.body = {error: "Validation failed", details: error.stack};
    } 
    else {
      throw error;
    }
  }
};