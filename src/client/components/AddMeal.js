import React, { useState } from "react";
import postData from "./postData";

const minDate = () => {
    const day = new Date();
    let dd = day.getDate();
    let mm = day.getMonth() + 1;
    let hh = day.getHours()
    let minutes = day.getMinutes()

    const yyyy = day.getFullYear();
    dd = dd < 10 ? '0' + dd : dd;
    mm = mm < 10 ? '0' + mm : mm;
    hh = hh < 10 ? '0' + hh : hh;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const today = yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + minutes
    return today;
}

const AddMeal = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [max_reservations, setMaxReservations] = useState("");
    const [when, setWhen] = useState("");
    const [price, setPrice] = useState("");



    const setStatesEmpty = () => {
        setTitle("")
        setDescription("")
        setLocation("")
        setMaxReservations("")
        setWhen("")
        setPrice("")
    }

    function onSubmit(e) {
        e.preventDefault();
        const newMeal = {
            title,
            location,
            description,
            max_reservations,
            when,
            price
        };

        const response = postData('/api/meals', newMeal)
        console.log(response);

        if (response) {
            alert(`Thank You, Your Meal : ${newMeal.title} Added`)
        }
        else {
            throw new Error(response.status)
        }
        setStatesEmpty();
    }
    return (

        <div className="add_meal_page">
            <div className="add_meal_info">
                <h3>Would you like to become a Host ?</h3>
                <p>Then please Enter your meal details below</p>
            </div>
            <div className="add-meal">
                <img src="https://th.bing.com/th/id/R936cb174311908fbdae6b283de29a867?rik=yHOz8SMyZC%2fZ1A&riu=http%3a%2f%2fwww.arionrestaurant.com%2fwp-content%2fuploads%2f2015%2f03%2freservation_background.jpg&ehk=OOwCLGOYf817zbAa0%2b8jZuSzhcQ%2b4D2AeM9o0P1RcRM%3d&risl=&pid=ImgRaw"></img>
            </div>
            <form onSubmit={onSubmit} className="add_meal_form">
                <div>
                    <label htmlFor="title">Meal Title* : </label>
                    <input type="text" id="title" name="title" value={title} required onChange={(e) => setTitle(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor="location">Location* : </label>
                    <input type="text" id="location" name="location" required value={location} onChange={(e) => setLocation(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor="when">Date & Time* : </label>
                    <input type="datetime-local" id="when" name="when" required min={minDate()} value={when} onChange={(e) => setWhen(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor="max_reservations">Max Reservations* : </label>
                    <input type="number" id="max_reservations" name="maxReservations" required value={max_reservations} onChange={(e) => setMaxReservations(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor="price">Price* : </label>
                    <input type="number" id="price" name="price" value={price} required onChange={(e) => setPrice(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor="description" className="meal_description">Description* : </label>
                    <textarea id="description" name="description" value={description} required onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <button type="submit" className="meal_submit_btn"> Submit</button>
            </form>

        </div>
    )

}
export default AddMeal;