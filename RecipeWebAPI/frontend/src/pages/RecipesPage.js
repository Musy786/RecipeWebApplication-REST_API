import React, {useEffect, useState} from "react";
import axios from "axios";
import {deleteRecipe} from "../utilities/requestHandlers";
import {updateRecipe} from "../utilities/requestHandlers";

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const fetchRecipes = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await axios.get("http://localhost:3000/recipes", {
        headers: {
          Authorization: "Basic " + btoa("admin:password123")
        }
      });
      setRecipes(response.data);
    } 
    catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to load recipes");
    } 
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editingRecipe.title || !editingRecipe.ingredients || !editingRecipe.instructions || !editingRecipe.created_by) {
      alert("All required fields must be filled out (title, ingredients, instructions, and created by");
      return;
    }

    if (editingRecipe.prep_time < 0 || editingRecipe.cook_time < 0) {
      alert("Prep time and cook time must be zero or positive.");
      return;
    }

    try {
      await updateRecipe(editingRecipe.id, editingRecipe);
      await fetchRecipes();            // Refresh the list
      setEditingRecipe(null);          // Hide form
    } catch (error) {
      console.error("Failed to update recipe:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
  
    try {
      await deleteRecipe(id);
      await fetchRecipes();            // Refresh the list
    } 
    catch (err) {
      console.error(err);
      setError("Failed to delete recipe");
    }
  };

  if (isLoading) {
    return <div>Loading recipes... Please wait.</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Recipes</h1>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id}>
            <strong>{recipe.title}</strong> – {recipe.description}
            <br />
            <em>Ingredients:</em> {recipe.ingredients}
            <br />
            <em>Instructions:</em> {recipe.instructions}
            <br />
            <em>Created By:</em> {recipe.created_by}
            <br />
            <em>Prep Time:</em> {recipe.prep_time} minutes
            <br />
            <em>Cook Time:</em> {recipe.cook_time} minutes
            <br />
            <button onClick={() => setEditingRecipe(recipe)}>Edit</button>
            <button onClick={() => handleDelete(recipe.id)}>Delete Recipe</button>
          </li>
          ))}
        </ul>
      ) : (
        <p>No recipes found.</p>
      )}
      {editingRecipe && (
        <form onSubmit={handleEdit} style={{marginTop: '20px'}}>
          <h2>Edit Recipe</h2>
          <label>Title:</label>
          <input
            type="text"
            value={editingRecipe.title}
            onChange={e => setEditingRecipe({...editingRecipe, title: e.target.value})}
            required
          />
          <br />
          <label>Description:</label>
          <textarea
            value={editingRecipe.description}
            onChange={e => setEditingRecipe({...editingRecipe, description: e.target.value})}
          />
          <br />
          <label>Ingredients:</label>
          <textarea
            value={editingRecipe.ingredients}
            onChange={e => setEditingRecipe({...editingRecipe, ingredients: e.target.value})}
          />
          <br />
          <label>Instructions:</label>
          <textarea
            value={editingRecipe.instructions}
            onChange={e => setEditingRecipe({...editingRecipe, instructions: e.target.value})}
          />
          <br />
          <label>Created By:</label>
          <input
            type="text"
            value={editingRecipe.created_by}
            onChange={e => setEditingRecipe({...editingRecipe, created_by: e.target.value})}
          />
          <br />
          <label>Prep Time (minutes):</label>
          <input
            type="number"
            value={editingRecipe.prep_time}
            onChange={e => setEditingRecipe({...editingRecipe, prep_time: parseInt(e.target.value, 10) || 0})}
          />
          <br />
          <label>Cook Time (minutes):</label>
          <input
            type="number"
            value={editingRecipe.cook_time}
            onChange={e => setEditingRecipe({...editingRecipe, cook_time: parseInt(e.target.value, 10) || 0})}
          />
          <br /><br />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditingRecipe(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default RecipesPage;