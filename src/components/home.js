import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function Home() {

    // Object to set style of title
    const mystyle = {
        color: "black",
        padding: "30px",
        fontFamily: "Arial",
        fontWeight: "bold"
    };

    return (
        <div>
            {/* Displaying a welcome message */}
            <h1 style={mystyle}>WELCOME TO FOOD TRACKER</h1>
            <h4>by Luke Corcoran</h4>
            <h4>G00410404</h4>
            <br></br>
            {/* Providing instructions on how to use the application */}
            <ListGroup>
                <ListGroup.Item >HOW TO USE:</ListGroup.Item>
                <ListGroup.Item>1. Navigate to 'Add Food' to add a food to your list of foods.</ListGroup.Item>
                <ListGroup.Item>2. Enter the name of the food, along with the ingredients and protein/calories of each ingredient.</ListGroup.Item>
                <ListGroup.Item>3. Once you add the food, it will be added to your list of foods you have saved in 'List of Foods'.</ListGroup.Item>
                <ListGroup.Item>4. Keep track of what you've eaten throughout the day by adding food from your list to your 'Daily Food' page.</ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default Home;
