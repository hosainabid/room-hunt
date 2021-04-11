import React, { useEffect, useState } from 'react';
import Apartments from './Apartments';
import service1 from '../images/icons/apartment 1.png';
import service2 from '../images/icons/affordable 1.png';
import service3 from '../images/icons/lessee 1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagramSquare, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import loader from '../images/icons/loader.gif';
import MailchimpSubscribe from './MailchimpSubscribe';

const Home = () => {
    const [Hotel, setHotel] = useState([])
    useEffect(() => {
        const url = 'https://still-waters-21873.herokuapp.com/HotelData'
        fetch(url).then(res => res.json()).then(data => { setFilteredData(data); setHotel(data) })
    }, []);
    const [filteredData, setFilteredData] = useState([]);
    const handleArea = (e) => {
        // console.log(e.target.value);
        const tempData = [...Hotel]
        const newTempData = tempData.filter(x => x.location === e.target.value);
        if (e.target.value === 'All') {
            const hotels = [...Hotel]
            setFilteredData(hotels);
        } else {
            setFilteredData(newTempData);
        }
    }
    const handleRoomType = (e) => {
        // console.log(e.target.value);
        const tempData = [...Hotel]
        const newTempData = tempData.filter(x => x.RoomType === e.target.value);
        if (e.target.value === 'All') {
            const hotels = [...Hotel]
            setFilteredData(hotels);
        } else {
            setFilteredData(newTempData);
        }
    }
    const handlePrice = (e) => {
        if (e.target.value === 'L2H') {
            const list = [...Hotel];
            list.sort((a, b) => (a.price > b.price) ? 1 : -1)
            setFilteredData(list)
        }
        if (e.target.value === 'H2L') {
            const list = [...Hotel];
            list.sort((a, b) => (a.price < b.price) ? 1 : -1)
            setFilteredData(list);
        }
    }
    const handleDelete = (event, id) => {
        fetch(`https://still-waters-21873.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    event.target.parentNode.style.display = 'none';
                }
            })
    }
    return (
        <>
            <section className="banner">
                <div className="layer">
                    <h1>FIND YOUR HOTEL ROOM</h1>
                    <br />
                    <div >
                        <a className="btn btn-lg btn-info" href="#room">Find Now</a>
                    </div>
                </div>
            </section>
            {/* apartments */}
            <section id="room">
                <div className="text-center mt-3 theme-text">
                    <span>Hotel Room Rent</span>
                    <h2>Discover The Latest Rent <br /> Available Today</h2>
                </div>
                <div className="container d-flex justify-content-around my-5">
                    <div ><span>Area</span> :
                    <select onChange={handleArea} className="form-control" >
                            <option value="All">All</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Sylhet">Sylhet</option>
                            <option value="Chattagram">Chattagram</option>
                        </select>
                    </div>
                    <div><span>Room type</span> :
                    <select onChange={handleRoomType} className="form-control" >
                            <option value="All">All</option>
                            <option value="Single">Single</option>
                            <option value="Double">Double</option>
                            <option value="Family">Family</option>
                        </select>
                    </div>
                    <div><span>Price</span> :
                    <select onChange={handlePrice} className="form-control" >
                            <option value="L2H">Low to High</option>
                            <option value="H2L">High to Low</option>
                        </select>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {
                            filteredData.map(apartment => <Apartments key={apartment.id} apartment={apartment} handleDelete={handleDelete}></Apartments>)
                        }
                    </div>
                </div>
                {!Hotel.length &&
                    <img style={{ margin: 'auto' }} src={loader} alt="" />
                }
                {Hotel.length && !filteredData.length &&
                    <h2>Nothing found</h2>
                }
            </section>
            {/* service */}
            <section className="my-5">
                <div className="text-center mb-3 theme-text">
                    <h2>Your Satisfaction <br /> Is Our First & Foremost Priority</h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 p-3 text-center">
                            <img className="w-25" src={service1} alt="" />  <br /> <br />
                            <b>Wide Range of properties</b>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet elit. Est, enim.Rerum, optio!</p>
                        </div>
                        <div className="col-md-4 p-3 text-center">
                            <img className="w-25" src={service2} alt="" /> <br /> <br />
                            <b>Financing Made Easy</b>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet elit. Est, enim. Rerum, optio!</p>
                        </div>
                        <div className="col-md-4 p-3 text-center">
                            <img className="w-25" src={service3} alt="" /> <br /> <br />
                            <b>Trusted By Thousand</b>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet elit. Est, enim. Rerum, optio!</p>
                        </div>
                    </div>
                </div>
            </section>
            <footer id="contact">
                <div className="container pt-5 pb-3">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>Contact</h5>
                            <span><FontAwesomeIcon icon={faMapMarker} /> House-no 115/c ( 4th floor ) , Road-no #2 <br /> Mohakhali , Dhaka 1000.</span> <br />
                            <span><FontAwesomeIcon icon={faPhone} /> +880-1712-112255 </span> <br />
                            <span><FontAwesomeIcon icon={faEnvelope} /> Apartment.hunt@gmail.com </span> <br />
                            <div style={{ fontSize: "30px" }} className="d-flex justify-content-between mt-2">
                                <FontAwesomeIcon icon={faFacebookSquare} />
                                <FontAwesomeIcon icon={faInstagramSquare} />
                                <FontAwesomeIcon icon={faLinkedin} />
                                <FontAwesomeIcon icon={faYoutube} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <h5>Company</h5>
                            <ul>
                                <li>About</li>
                                <li>Site map</li>
                                <li>Terms </li>
                                <li>conditions</li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <h5>Quick Links</h5>
                            <ul>
                                <li>FAQ</li>
                                <li>Help</li>
                                <li>Refund policy</li>
                                <li>Support</li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Subscribe To Our Newsletter </h5>
                            {/* <form action="http://localhost:5000/Subscribe" method="POST">
                                <div class="form-group">
                                    <input type="text" name="firstName" id="first-name" class="form-control" placeholder="First Name" required />
                                </div>
                                <div class="form-group">
                                    <input type="text" name="lastName" id="last-name" class="form-control" placeholder="Last Name" required />
                                </div>
                                <div class="form-group">
                                    <input type="email" name="email" id="email" class="form-control" placeholder="Email" required />
                                </div>
                                <button type="submit" >Subscribe Now</button>
                            </form> */}
                            <MailchimpSubscribe/>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
};

export default Home;