// Importing necessary dependencies and components
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddFood from './components/addfood';
import FoodList from './components/foodlist';
import EditFood from './components/editfood';
import DailyFoodList from './components/dailyfoodlist';

// Main component named App
function App() {

  return (
    <BrowserRouter>
      <div className="App" style={{background: '#f5f5f5', minHeight: '100vh'}}>
        {/* Navigation bar using Navbar */}
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Food Tracker</Navbar.Brand>
            <Nav className="me-auto">
              {/* Navigation links for different pages */}
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/addfood">Add Food</Nav.Link>
              <Nav.Link href="/foodlist">List of Foods</Nav.Link>
              <Nav.Link href="/dailyfoodlist">Daily Food</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        {/* Routing setup using Routes */}
        <Routes>
          {/* Route for the Home page */}
          <Route path='/' element={<Home></Home>}></Route>
          {/* Route for the List of Foods page */}
          <Route path='/foodlist' element={<FoodList></FoodList>}></Route>
          {/* Route for the Add Food page */}
          <Route path='/addfood' element={<AddFood></AddFood>}></Route>
          {/* Route for the Edit page with a dynamic parameter 'id' */}
          <Route path='/editfood/:id' element={<EditFood></EditFood>}></Route>
          {/* Route for the Daily Food page */}
          <Route path='/dailyfoodlist' element={<DailyFoodList></DailyFoodList>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
