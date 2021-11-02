import AddReservation from "./AddReservation";
import React, { useState, useEffect } from "react";
import { useParams} from 'react-router-dom';
import MealsImages from "./MealsImages";

const GetMeal = ()=>{
    const [meal, setMeal] = useState({});
    const [reservation, setReservation] = useState(false);
    const [availableReservations, setAvailableReservations] = useState(null)
    const [totalGuests, setTotalGuests] = useState(null)
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const params = useParams();
    useEffect(() =>{
        const fetchingMealsApi = async() => {
            const API_URL = `/api/meals/${params.id}`;
            
            try{
                setLoading(true);
                setError(null);

                const response = await fetch(API_URL);
                if(response.ok){
                    const mealInfo = await response.json();
                    setMeal(mealInfo[0])
                } else {
                    const errorResult = await response.json();
                    console.log('Error in fetching meal info: ', errorResult.message);
                    setError(errorResult);
                }
                setLoading(false);
            } catch(error){
                console.log('Error in fetching meal info: ', error.message);
                setError(error);
            }
        }
        fetchingMealsApi();
    }, []);

    useEffect(() => {
        
        fetch(`api/reservations?availableReservations=true`)
            .then(response => response.json())
            .then(reservations => {
const filteredReservation = reservations.filter((reservation)=>reservation.meal_id == params.id);
let totalGuests = 0;
if (filteredReservation.length >0) {
    filteredReservation.forEach(reservation => {
        totalGuests += reservation.number_of_guests;
    });
}

setTotalGuests(totalGuests);
                setAvailableReservations(`${meal.max_reservations}-${totalGuests}`)
            })
    }, [])
    let leftReservations = meal.max_reservations - totalGuests;
    
    function onClick() {
        if (leftReservations>0) {
            setReservation(true)
        } else {
            setMessage("No Reservations Available")
        }
    }

    
    const FormattingDate = (date) => {
        return new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        })
    }

    const imageForMeal = MealsImages.find(img => img.title == meal.title);
    let imgSrc = "";
        if (imageForMeal) {
            imgSrc= imageForMeal.url;
        }else{
            imgSrc="https://i.pinimg.com/originals/e1/0a/20/e10a20f90ab20620e8b25ab616bcb22d.jpg";
        }
    return (
        <div className="meal-info-page">
            
            {error !== null &&
                <div> There was an error </div>
            }
            {error === null && loading &&
                <div> Loading...</div>
            }
            {error === null && !loading && meal !== null &&
            <div className="meal_reservation">
                <div className="meal_info">
                     <img src={imgSrc} width="200px"></img>
                     <h3 >Meal : {meal.title}</h3>
                     <h4>Description: {meal.description}</h4>
                     <h4>Place: {meal.location}</h4>
                     <h4>Date & Time : {FormattingDate(meal.when)}</h4>
                     <h4>Price : {meal.price}DKK</h4>
                     <h4>Maximum Reservations: {meal.max_reservations}</h4>
                     <h4>Available Reservations: {`${meal.max_reservations - totalGuests}`}</h4>
                     <div>
                         <button
                            onClick={onClick} className={!reservation ? "reservation_submit_btn" : "no_button"}>
                            Book Reservation
                        </button>
                    </div>
    
                    <div>
                        {reservation &&
                            <AddReservation id={params.id} setForm={setReservation} availableReservations={availableReservations} setAvailableReservations={setAvailableReservations}/>}
                    </div>
                    <br />
                    {message && <h2>{message}</h2>}
                </div>
            </div >
        
            }
        </div>
        
    )
}

export default GetMeal;