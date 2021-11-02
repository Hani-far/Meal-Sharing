import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MealSharingStyle.css";


function HomePage() {
  const [searchMeal, setSearchMeal] = useState("");
  const [meals, setMeals] = useState([]);
  const [display, setDisplay] = useState(false)
  
  useEffect(() => {
    if (searchMeal) {
      fetch(`/api/meals?title=${searchMeal}`)
          .then(res => res.json())
          .then(mealsData => {
              setMeals(mealsData)
          })
    }
  }, [searchMeal])

  const onClick = (title) => {
      setSearchMeal(title)
      setDisplay(true)

  }
    
  return(
    <div className="home-page">
      <div className="wellcome">
        <h1>Welcome to our Meal sharing App</h1>
        <h3>We're here to make a perfect memory for you and your family</h3> 
        <div className="search_input_box">
        <input className="search_input" type="text" placeholder="search meal" value={searchMeal} onChange={(e) => setSearchMeal(e.target.value)} />
        {meals && meals.map(meal => {
        return (
          <div key={meal.id} className="search_meal_list">
            { !display ?
              <div>
                <li className="search_meal" onClick={() => onClick(meal.title)}>{meal.title}</li>
              </div>
              : <div className="search_meal_box">
                  <h4><span>Meal Information</span></h4>
                  <h4 ><span>Meal Title:</span> {meal.title}</h4>
                  <h4><span>Location: </span> {meal.location}</h4>
                  <Link to={`meals/${meal.id}`}><button>More Details</button></Link>
                </div>
            }
          </div>
        )
        })}
      </div> 
    </div>
    </div>
  )
    
}
  
export default HomePage;