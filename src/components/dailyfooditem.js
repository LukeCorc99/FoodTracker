import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// DailyFoodItem component. Data is passed from parent component DailyFood via props
function DailyFoodItem(props) {
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

        {/* Delete button with an onClick event */}
        <Button
          variant="danger"
          onClick={(e) => {
            e.preventDefault();

            // Sending a DELETE request to the server to delete the daily food item
            axios
              .delete('http://localhost:4000/api/dayfoods/' + props.myFood._id)
              .then((res) => {
                // Calling the Restart function passed as a prop after successful deletion
                let restart = props.Restart();
              })
              .catch();
          }}
        >
          Delete
        </Button>
      </Card>
    </div>
  );
}

export default DailyFoodItem;
