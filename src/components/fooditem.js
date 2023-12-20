import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// FoodItem component. Data is passed from parent component Food via props
function FoodItem(props) {
  return (
    <div class="d-grid col-6 mx-auto"> {/*Creates grid container, which is 6 columns wide and centred*/}
      {/* Card component from React Bootstrap */}
      <Card>
        {/* Displaying the food name in the card header */}
        <Card.Header>{props.myFood.foodName}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            {/* Mapping through the ingredients and displaying their details */}
            {props.myFood.ingredients.map((ingredient, index) => (
              <div key={index}>
                <p>{ingredient.name}</p>
                <p>Calories: {ingredient.calories}</p>
                <p>Protein (per gram): {ingredient.protein}</p>
              </div>
            ))}
          </blockquote>
        </Card.Body>

        {/* Link to navigate to the edit page for the specific food item */}
        <Link to={'/editfood/' + props.myFood._id} className="btn btn-primary">
          Edit
        </Link>

        {/* Button to delete the specific food item */}
        <Button
          variant="danger"
          onClick={(e) => {
            e.preventDefault();

            // Sending a DELETE request to the server to delete the food item
            axios
              .delete('http://localhost:4000/api/foods/' + props.myFood._id)
              .then((res) => {
                // Calling the Restart function passed as a prop after successful deletion
                let restart = props.Restart();
              })
              .catch();
          }}
        >Delete</Button>

        {/* Button to add the specific food item to the daily foods collection */}
        <Button
          variant="info"
          onClick={(e) => {
            e.preventDefault();

            // Fetching the specific food item from the server
            axios
              .get('http://localhost:4000/api/foods/' + props.myFood._id)
              .then((res) => {
                // Extracting relevant data from the fetched food item
                const foodData = res.data;
                const dailyData = {
                  foodName: foodData.foodName,
                  ingredients: foodData.ingredients,
                };

                // Posting the data to the daily foods collection
                axios.post('http://localhost:4000/api/dayfoods', dailyData)
                  .then((res) => {
                    console.log("dailyData: ", res.data);
                  })
                  .catch((error) => {
                    console.error('Error adding data to daily collection:', error);
                  });
              })
              .catch((error) => {
                console.error('Error fetching data from foods collection:', error);
              });
          }}
        >
          Add to Daily Foods
        </Button>
      </Card>
    </div>
  );
}

export default FoodItem;



