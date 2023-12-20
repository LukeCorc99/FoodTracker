import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DailyFood from './dailyfood';


// Component for displaying a list of daily food items
function DailyFoodList() {
  // State variable to store the list of daily foods
  const [DailyFoods, setDailyFoods] = useState([]);

  // Object to set style of title
  const mystyle = {
    color: "black",
    padding: "30px",
    fontFamily: "Arial",
    fontWeight: "bold",
    backgroundColor: "white"
  };

  // useEffect hook to fetch the list of daily foods when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/dayfoods')
      .then((response) => {
        // Update the state with the fetched data
        setDailyFoods(response.data);
      })
      .catch((error) => {
        console.error('Error fetching daily foods:', error);
      });
  }, []);

  // Function to refresh the list of daily foods
  const Restart = (e) => {
    axios.get('http://localhost:4000/api/dayfoods')
      .then((response) => {
        // Update the state with the refreshed data
        setDailyFoods(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

 
  return (
    <div>
      <h2 style={mystyle}>MY DAILY FOOD LIST</h2>
      {/* Map through the list of daily foods and render a DailyFood component for eeach */}
      {DailyFoods.map((food) => (
        <DailyFood myFoods={[food]} key={food._id} RestartData={Restart} />
      ))}
    </div>
  );
}

export default DailyFoodList;






























































































