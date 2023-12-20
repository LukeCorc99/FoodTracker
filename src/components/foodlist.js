import React, { useState, useEffect } from 'react';
import Food from './food';
import axios from 'axios';

// Component for displaying a list of food items
function FoodList() {
  // State to store the list of foods
  const [foods, setFoods] = useState([]);

  // Object to set style of title
  const mystyle = {
    color: "black",
    padding: "30px",
    fontFamily: "Arial",
    fontWeight: "bold",
    backgroundColor: "white"
  };

  // useEffect hook to fetch the list of foods when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/foods')
      .then((response) => {
        // Update the state with the fetched data
        setFoods(response.data);
      })
      .catch((error) => {
        console.error('Error fetching foods:', error);
      });
  }, []);

  // Function to refresh the list of foods
  const Restart = (e) => {
    axios.get('http://localhost:4000/api/foods')
      .then((response) => {
        // Update the state with the refreshed data
        setFoods(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h2 style={mystyle}>MY FOOD LIST</h2>
      {/* Map through the list of foods and render a Food component for each */}
      {foods.map((food) => (
        <Food myFoods={[food]} key={food._id} RestartData={Restart} />
      ))}
    </div>
  );
}

export default FoodList;
