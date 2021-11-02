import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import postData from "./postData";

const AddReview = () => {
    const [meal, setMeal] = useState([])
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [stars, setStars] = useState("");

    const params = useParams();


    useEffect(() => {
        
        fetch(`/api/meals/${params.id}`)
            .then(res => res.json())
            .then(meal => {
                setMeal(meal[0])
            })
    }, [])

    const setStatesEmpty = () => {
        setTitle("")
        setDescription("")
        setStars("")
    }

    function onSubmit(e) {
        e.preventDefault();
        const newReview = {
            meal_id: params.id,
            title,
            description,
            stars,
        }
        
        const response = postData('/api/reviews', newReview)

        if (response) {
            alert("Thank You For Your Review")
        }
        else {
            throw new Error(response.status)
        }
        setStatesEmpty();
    }
    
    return (

        <div className="meal-review-page">
            <div className="review_info">
                <img src="https://pbs.twimg.com/media/D5kiYe5WwAA01QZ.jpg" width="200px"></img>
                <h3 >Meal : {meal.title}</h3>
                <h4>Description: {meal.description}</h4>
                <h4>Price : {meal.price}DKK</h4>
                <h3>Add review</h3>
                <form onSubmit={onSubmit} className="add_review_form">
                    <div>
                        <label htmlFor="title">Review Title* : </label>
                        <input type="text" id="title" value={title} required name="title" onChange={(e) => setTitle(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="description" className="meal_description">Description : </label>
                        <textarea id="description" name="description" value={description} rows="5" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label htmlFor="rating" >Rating* : </label>
                        <select id="Rating" name="stars" value={stars} required onChange={(e) => setStars(e.target.value)}>
                            <option></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <button type="submit" className="review_submit_btn"> Submit</button>
                </form>
            </div>
        </div>
    )

}
export default AddReview;