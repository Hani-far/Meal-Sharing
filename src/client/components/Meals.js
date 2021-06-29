import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MealsImages from "./MealsImages";

const FetchMeals =()=>{
    const [meals, setMeals] = useState([]);
    const [searchMeal, setSearchMeal] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
             
        if (searchMeal == "") {
            console.log("here");
            fetch("/api/meals")
                .then(response => response.json())
                .then(meals => {
                    console.log(meals);
                    setIsLoading(false)
                    setMeals(meals);
                })
        } else {
            fetch(`/api/meals?title=${searchMeal}`)
            .then(response => response.json())
                .then(mealData => {
                    console.log(searchMeal);
                    console.log(mealData);
                    setIsLoading(false)
                    setMeals(mealData)
                })
        }

    }, [searchMeal])

    return (
        <div className="meals-container ">
        {isLoading ? <div>LOADING....</div> :
            <>
                <div className="search_input_box">
                    <input className="search_input" type="text" placeholder="search meal" value={searchMeal} onChange={(e) => setSearchMeal(e.target.value)} />
                </div>
                
                <div className="display">
                    {meals.length > 0 ? meals.map((meal) => {
                        let imgSrc = "";
                        const imageForMeal = MealsImages.find(img => img.title == meal.title);
                            if (imageForMeal) {
                                imgSrc= imageForMeal.url;
                            }else{
                                imgSrc="https://i.pinimg.com/originals/e1/0a/20/e10a20f90ab20620e8b25ab616bcb22d.jpg";
                            }
                        if (searchMeal=="") {
                        return <div key={meal.id} className="meal_container">
                        <div className="meal_image">
                        <img src={imgSrc}></img>
                        </div>
                        <div className="meal_title">
                            <h4 >{meal.title}</h4>
                        </div>
                        <div className="description">
                            <h4> Price: {meal.price}DKK</h4>
                            <h4> Location: {meal.location}</h4>
                            <Link to={`meals/${meal.id}`}><button>Book reservation</button></Link>
                            <div>
                                <Link to={`meals/${meal.id}/addreview`}><button>Add Review</button></Link>
                            </div>
                        </div>
                    </div>
                        }else{
                            if (meal.title.toLowerCase().includes(searchMeal)) {
                                const imageForMeal = MealsImages.find(img => img.title == meal.title);
                                return <div key={meal.id} className="meal_container">
                                    <div className="meal_image">
                        <img src={imgSrc}></img>
                        </div>
                        <div className="meal_title">
                            <h4 >{meal.title}</h4>
                        </div>
                        <div className="description">
                            <h4> Price: {meal.price}DKK</h4>
                            <h4> Location: {meal.location}</h4>
                            <Link to={`meals/${meal.id}`}><button>Meal Details</button></Link>
                            <div>
                                <Link to={`meals/${meal.id}/addreview`}><button>Add Review</button></Link>
                            </div>
                        </div>
                    </div>
                            }
                        }
                        
                    })
                        : <h4>No Meals Found</h4>
                    }
                </div>
            </>
        }

    </div>
        
      );

}

export default FetchMeals;