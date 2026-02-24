export async function status(response) {
    if (!response.ok) throw response;
    return response;
}

export async function json(response) {
    return response.json();
}

export async function updateRecipe(id, updatedData) {
  const { id: _, created_at: __, ...cleanedData } = updatedData;

  try {
    const response = await fetch(`http://localhost:3000/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("admin:password123")
      },
      body: JSON.stringify(cleanedData)
    });

    const processedResponse = await status(response);
    const data = await json(processedResponse);

    return data;
  } 
  catch (errorResponse) {
    if (errorResponse && typeof errorResponse.json === "function") {
      try {
        const errorData = await errorResponse.json();
        console.error(`Server error (${errorResponse.status}):`, errorData);
        throw new Error(`Server error ${errorResponse.status}: ${errorData.error || errorData.message || JSON.stringify(errorData)}`);
      } catch (e) {
        throw new Error(`Failed to update recipe ID ${id}: ${errorResponse.status} ${errorResponse.statusText}`);
      }
    } else {
      console.error(`Error updating recipe ID ${id}:`, errorResponse);
      throw new Error(`Failed to update recipe ID ${id}: ${errorResponse.message || 'Unknown error'}`);
    }
  }
}

export async function deleteRecipe(id) {
  try {
    const response = await fetch(`http://localhost:3000/recipes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa("admin:password123")
      }
    });

    const processedResponse = await status(response);
    const data = await json(processedResponse);
    
    return data;
  } 
  catch (errorResponse) {
    if (errorResponse && typeof errorResponse.json === "function") {
      try {
        const errorData = await errorResponse.json();
        console.error(`Server error (${errorResponse.status}):`, errorData);
        throw new Error(`Server error ${errorResponse.status}: ${errorData.error || errorData.message || JSON.stringify(errorData)}`);
      } catch (e) {
        throw new Error(`Failed to delete recipe ID ${id}: ${errorResponse.status} ${errorResponse.statusText}`);
      }
    } else {
      console.error(`Error deleting recipe ID ${id}:`, errorResponse); 
      throw new Error(`Failed to delete recipe ID ${id}: ${errorResponse.message || 'Unknown error'}`);
    }
  }
}