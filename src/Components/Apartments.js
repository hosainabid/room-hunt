import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBath, faBed, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import { UserContext } from '../App';

const Apartments = ({ apartment, handleDelete }) => {
    // const [loggedInUser, setloggedInUser] = useContext(UserContext);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const url = 'https://dry-stream-50320.herokuapp.com/isAdmin'
        fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: sessionStorage.getItem('CurrentUser') })
        }).then(res => res.json()).then(data => setAdmin(data))
    }, []);

    return (
        <div className="col-md-4 p-3 ">
            <img style={{ height: '210px' }} className="w-100" src={`data:image/png;base64,${apartment.image.img}`} alt="" />
            <div className="bg-white p-3">
                <h5 className="theme-text">{apartment.name}</h5>
                <small><FontAwesomeIcon icon={faMapMarkerAlt} /> {apartment.location}</small>
                <div className="d-flex justify-content-between">
                    <small><FontAwesomeIcon icon={faBed} /> {apartment.bed} bed</small>
                    <small><FontAwesomeIcon icon={faBath} /> {apartment.bath} bathroom</small>
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <span className="price">BDT {apartment.price}/-</span>
                    <Link to={`/Apartment/${apartment.id}`}>
                        <Button className="btn" variant="info">Book Now</Button>
                    </Link>
                </div>
            </div>
            {admin &&
                <Link to={`/updateInfo/${apartment.id}`}>
                    <button className="btn-Warning" >Update Price</button>
                </Link>}
            {admin &&
                <button className="btn-Danger float-right"
                    onClick={(e) => handleDelete(e, apartment.id)}>  Delete
                    </button>}
        </div>
    );
};

export default Apartments;