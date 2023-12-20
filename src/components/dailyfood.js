import DailyFoodItem from "./dailyfooditem";

// Takes data from items from dayfood collection as a prop and maps over each food item, rendering a DailyFoodItem component for each one
function DailyFood(props) {

    // Variables to extract data from parent component (DailyFoodList) via props
    const { myFoods, RestartData } = props;

    // Mapping through myFoods array and rendering DailyFoodItem components
    return myFoods.map((food) => (
        // Rendering DailyFoodItem component with individual food data and key as well as any other attributes in DailyFoodItem
        <DailyFoodItem myFood={food} key={food._id} Restart={() => { props.RestartData(); }} />
    ));
}

export default DailyFood;
