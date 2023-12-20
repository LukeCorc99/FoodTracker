import FoodItem from "./fooditem";

// Takes data from items from food collection as a prop and maps over each food item, rendering a FoodItem component for each one
function Food(props) {

  // Variables to extract data from parent component (FoodList) via props
  const { myFoods, RestartData } = props;

  // Rendering FoodItem component with individual food data and key as well as any other attributes in FoodItem
  return myFoods.map((food) => (
    <FoodItem myFood={food} key={food._id} Restart={() => { props.RestartData(); }} />
  ));
}

export default Food;
