import { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

// Component for adding food items to food collection
function AddFood() {

  // State variables for foodName and ingredients
  const [foodName, setFoodName] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', calories: '', protein: '' }]);

  // Object to set style of title
  const mystyle = {
    color: "black",
    padding: "30px",
    fontFamily: "Arial",
    fontWeight: "bold",
    backgroundColor: "white"
  };

  // Updates the state when there is a change in any of the ingredient input fields.
  const ingredientChange = (index, key, value) => {
    const updatedIngredients = [...ingredients]; // Creates copy of ingredients array and assigns it to updatedIngredients
    updatedIngredients[index][key] = value; // Updates specific property of specified ingredient
    setIngredients(updatedIngredients); //Sets the state with the updated array
  };

  // Adds a new ingredient
  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', calories: '', protein: '' }]); // Initially creates a new ingredient object with empty values for name, calories, and protein
  };

  // Removes last ingredient from ingredients array
  const removeIngredient = () => {
    if (ingredients.length > 1) {
      const updatedIngredients = [...ingredients]; // Creates copy of ingredients array and assigns it to updatedIngredients
      updatedIngredients.pop(); // Removes last ingredient from array
      setIngredients(updatedIngredients);
    }
  };

  // Calculates total calories and proteins from all ingredients
  const calculateTotal = () => {
    // Uses 'reduce' function to iterate over the ingredients array
    // The parseFloat function is used to convert the input values to numbers, 
    // and || 0,0 is used to handle cases where the input may be empty or not a valid number.
    const totalCalories = ingredients.reduce((sum, ingredient) => sum + parseFloat(ingredient.calories) || 0, 0);
    const totalProtein = ingredients.reduce((sum, ingredient) => sum + parseFloat(ingredient.protein) || 0, 0);
    return { totalCalories, totalProtein };
  };


  // Handles form submission, posts to 'foods' collection
  const handleSubmit = (e) => {
    e.preventDefault();

    const foodItem = {
      foodName: foodName,
      ingredients: ingredients,
    };

    axios.post('http://localhost:4000/api/foods', foodItem)

  }

  // Gets total calories and total protein from the result of the calculateTotal(); function
  const { totalCalories, totalProtein } = calculateTotal();

  
  return (
    <div>
      {/* User enters name of food */}
      <h2 style={mystyle}>ADD A FOOD TO YOUR LIST:</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name of Food:</InputGroup.Text>
            <Form.Control
              type="text"
              value={foodName}
              onChange={(e) => { setFoodName(e.target.value) }}
            />
          </InputGroup>
        </div>
        {/* Uses the map function to dynamically generate input fields for each ingredient in the ingredients array. */}
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <div className="container">
              <InputGroup className="mb-3">
                <InputGroup.Text id={`ingredient-addon-${index}`}>Ingredient:</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => ingredientChange(index, 'name', e.target.value)}
                />
              </InputGroup>
            </div>
            <div className="container">
              <InputGroup className="mb-3">
                <InputGroup.Text id={`calories-addon-${index}`}>Calories:</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={ingredient.calories}
                  onChange={(e) => ingredientChange(index, 'calories', e.target.value)}
                />
              </InputGroup>
            </div>
            <div className="container">
              <InputGroup className="mb-3">
                <InputGroup.Text id={`protein-addon-${index}`}>Protein (in grams):</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={ingredient.protein}
                  onChange={(e) => ingredientChange(index, 'protein', e.target.value)}
                />
              </InputGroup>
            </div>
          </div>
        ))}

        {/* Buttons to add and remove ingredients and food */}
        <ButtonGroup>
          <Button compact variant="outline-dark" onClick={addIngredient}>Add Ingredient</Button>
          <Button compact variant="outline-dark" onClick={removeIngredient}>Remove Last Ingredient</Button>
          <Button compact variant="outline-dark" type="submit">Add Food</Button>
        </ButtonGroup>
      </form>
      <br></br>
      {/* Displays the calculated total calories and protein based on the entered ingredients. */}
      <ListGroup>
      <ListGroup.Item>Total Calories: {totalCalories}</ListGroup.Item>
      <ListGroup.Item>Total Protein: {totalProtein}</ListGroup.Item>
    </ListGroup>
    </div>
  );

}

export default AddFood;