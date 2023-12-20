import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Component for editing food items
export default function EditFood() {
  // Extracting the 'id' parameter from the URL using the useParams hook
  let { id } = useParams();
  // Accessing the navigation object using the useNavigate hook
  const navigate = useNavigate();

  // Setting up state variables using the useState hook
  const [foodName, setFoodName] = useState('');
  const [ingredients, setIngredients] = useState([]);

  // Fetching data from the server when the component mounts
  useEffect(() => {
    // Making a GET request to retrieve information about the food item with the specified 'id'
    axios.get(`http://localhost:4000/api/foods/${id}`)
      .then((response) => {
        // Updating state with the fetched data
        setFoodName(response.data.foodName);
        setIngredients(response.data.ingredients);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Creating an object representing the updated food item
    const foodItem = {
      foodName: foodName,
      ingredients: ingredients,
    };

    // Making a PUT request to update the food item with the specified 'id'
    axios.put(`http://localhost:4000/api/foods/${id}`, foodItem)
      .then(() => {
        // Navigating to the food list page after successful update
        navigate('/foodlist');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Edit Food Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Edit Food Name: </label>
          <input
            type="text"
            className="form-control"
            value={foodName}
            onChange={(e) => { setFoodName(e.target.value) }}
          />
        </div>
        {/* Mapping over the ingredients to display and edit them */}
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <div className="form-group">
              <label>Edit Ingredient: </label>
              <input
                type="text"
                className="form-control"
                value={ingredient.name}
                onChange={(e) => {
                  const updatedIngredients = [...ingredients]; // Copy of ingredients array is created
                  updatedIngredients[index].name = e.target.value; // Name of the current ingredient being edited is updated with the new value from the input field.
                  setIngredients(updatedIngredients); // Updated ingredient value is passed through
                }}
              />
            </div>
            <div className="form-group">
              <label>Edit Calories: </label>
              <input
                type="text"
                className="form-control"
                value={ingredient.calories}
                onChange={(e) => {
                  const updatedIngredients = [...ingredients]; // Copy of ingredients array is created
                  updatedIngredients[index].calories = e.target.value; // Name of the current ingredient being edited is updated with the new value from the input field.
                  setIngredients(updatedIngredients); // Updated ingredient value is passed through
                }}
              />
            </div>
            <div className="form-group">
              <label>Edit Protein: </label>
              <input
                type="text"
                className="form-control"
                value={ingredient.protein}
                onChange={(e) => {
                  const updatedIngredients = [...ingredients]; // Copy of ingredients array is created
                  updatedIngredients[index].protein = e.target.value; // Name of the current ingredient being edited is updated with the new value from the input field.
                  setIngredients(updatedIngredients); // Updated ingredient value is passed through
                }}
              />
            </div>
          </div>
        ))}
        <div>
          <input type="submit" value="Edit Food" />
        </div>
      </form>
    </div>
  );
}
