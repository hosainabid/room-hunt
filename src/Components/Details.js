import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { apartmentData } from '../fakeData';
import { useForm } from "react-hook-form";
import StripeCheckout from 'react-stripe-checkout';
import loader from '../images/icons/loader.gif';


const Details = () => {
    const [dayCount, setDayCount] = useState(1);
    const [stripeBtn, setstripeBtn] = useState(false);

    const [hotelData, setHotelData] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const url = 'https://dry-stream-50320.herokuapp.com/HotelData'
        fetch(url).then(res => res.json()).then(data => setHotelData(data))
    }, []);
    const CurrentApartment = hotelData.find(x => x.id === id);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // const today = new Date().toISOString().slice(0, 10)
        // const date11 = '2021-04-03' ;
        // const date22 = '2021-04-10' ; 
        // const diffTimee = Math.abs(date22 - date11);
        // const diffDayss = Math.ceil(diffTimee / (1000 * 60 * 60 * 24));
        // console.log(today <= date11, date11 <= date22 ,diffDayss + 1);
        const today = new Date().toISOString().slice(0, 10);
        const date1 = new Date(data.CheckIN).toISOString().slice(0, 10);
        const date2 = new Date(data.CheckOUT).toISOString().slice(0, 10);
        const date11 = new Date(data.CheckIN);
        const date22 = new Date(data.CheckOUT);

        setstripeBtn(true);

        const formData = new FormData()
        formData.append('name', CurrentApartment.name);
        formData.append('userName', data.userName);
        formData.append('email', data.email);
        formData.append('mobile', data.mobile);
        formData.append('CheckIN', data.CheckIN);
        formData.append('CheckOUT', data.CheckOUT);
        console.log(today, date1, today <= date1, date1 <= date2);
        if (today <= date1 && date1 <= date2) {
            const diffTime = Math.abs(date22 - date11);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDayCount(diffDays + 1);

            fetch('https://dry-stream-50320.herokuapp.com/newBooking', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);

                })
                .catch(error => {
                    // console.error(error)
                })
            alert(`Congratulation! You booked ${CurrentApartment.name} `);
        } else {
            alert('Invalid date input, enter a valid date range & request booking again.');
        }


        // data.preventDefault();


    }

    // const onClosed = () => {       document.getElementById('submitBtn').disabled = true   }
    // const onOpened = () => {        document.getElementById('submitBtn').disabled = false    }
    return (
        <>
            {hotelData.length && <section className="banner">
                <div className="layer">
                    <h1>{CurrentApartment.name}</h1>
                </div>
            </section>}
            {hotelData.length && <div className="container ">
                <div className="row">
                    <div className="col-md-7">
                        <img src={`data:image/png;base64,${CurrentApartment.image.img}`} className="w-100 m-2" alt="" />
                    </div>
                    <div className="col-md-5 ">

                        <form className="bg-light p-3" onSubmit={handleSubmit(onSubmit)}>
                            <br />
                            <input type="text" className="form-control" name="userName" placeholder="Your name" {...register("userName", { required: true })} />
                            {errors.userName && <small className="text-danger">This field is required</small>} <br />

                            <input type="text" className="form-control" name="email" placeholder="Email address" {...register("email", { required: true })} />
                            {errors.email && <small className="text-danger">This field is required</small>} <br />

                            <input type="text" className="form-control" name="mobile" placeholder="Phone number" {...register("mobile", { required: true })} />
                            {errors.mobile && <small className="text-danger">This field is required<br /></small>}
                            <small>Check In:</small>
                            <input type="date" className="form-control" name="CheckIN" {...register("CheckIN", { required: true })} />
                            {errors.CheckIN && <small className="text-danger">This field is required<br /></small>}
                            <small>Check Out:</small>

                            <input type="date" className="form-control" name="CheckOUT" {...register("CheckOUT", { required: true })} />
                            {errors.CheckOUT && <small className="text-danger">This field is required</small>}  <br />

                            <textarea className="form-control" rows="4" name="instruction" placeholder="Message..." {...register("instruction", { required: true })}></textarea>
                            {errors.instruction && <small className="text-danger">This field is required</small>}<br />

                            <input className="btn btn-info w-100" type="submit" value="Request booking" id='submitBtn' />
                        </form>
                        <div className="d-flex justify-content-between">
                            {/* <span>Pay first to confirm : </span> */}
                            {stripeBtn && <StripeCheckout
                                amount={CurrentApartment.price * 100 * dayCount}
                                currency="BDT"
                                stripeKey="pk_test_51IZRWSKMRot2hgd9XemY5rgpL0HFUWREI1HvRZIcUdH1a6m5xbaT8EPLuPe5iKPqNXAqrIw8bfJjwC8rbbq4Sy4400hZjx6lwV"
                            />}
                        </div>
                    </div>
                </div>
            </div>}

            {hotelData.length && <div className="container my-5">
                <h2>{CurrentApartment.name}</h2>
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="price">BDT {CurrentApartment.price}/- per day</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus laudantium praesentium id minus dolorem atque tenetur quasi provident sed sequi deleniti qui, culpa vero dolores cumque facilis? Ut, dolores nostrum. Lorem ipsum dolor sit  minima illum quam natus perferendis distinctio explicabo vel est omnis nostrum excepturi aliquam laborum porro aliquid tempora odit assumenda aspernatur impedit dignissimos rem. Possimus a excepturi quaerat?</p>

                    </div>
                    <div className="col-md-3">
                        <h3 className="theme-text">Deatils</h3>
                        <span>Room-Type : {CurrentApartment.RoomType}</span> <br />
                        <span>Bed :  {CurrentApartment.bed}</span> <br />
                        <span>Bathroom :  {CurrentApartment.bath}</span> <br />
                        <span>Flat Size :  {CurrentApartment.flatSize} Sq-ft.</span> <br />
                        <span> Address : {CurrentApartment.address}
                        </span>
                    </div>
                    <div className="col-md-3">
                        <h3 className="theme-text">Facilities :</h3>
                        <p>
                            TV : {CurrentApartment.TV} <br />
                            Wifi : {CurrentApartment.Wifi} <br />
                            Breakfast : {CurrentApartment.Breakfast} <br />
                            Swimming-Pool : {CurrentApartment.SwimmingPool} <br />
                            Car-Parking : {CurrentApartment.Parking}
                        </p>
                    </div>
                </div>
            </div>}
            {!hotelData.length &&
                <img style={{ margin: 'auto' }} src={loader} alt="" />
            }
        </>
    );
};

export default Details;