import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FetchMeals from "./components/Meals";
import GetMeal from "./components/GetMeal";
import AddReview from "./components/AddReview";
import AddMeal from "./components/AddMeal";



function App() {

  return (
    <div className="App">
<Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route exact path="/meals">
       <FetchMeals/>
      </Route>
      <Route exact path="/meals/addmeal">
        <AddMeal/>
      </Route>
      <Route exact path="/meals/:id">
          <GetMeal/>
        </Route>
        <Route exact path="/meals/:id/addreview">
          <AddReview/>
        </Route>
     <Route exact path="/test-component">
     <TestComponent></TestComponent>
    </Route>

      </Switch>
      <Footer />
    </Router>
    </div>
  
  )
}

export default App;
