import React, {  useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const MyRent = () => {
    // const [loggedInUser, setloggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const url = 'https://still-waters-21873.herokuapp.com/myBookings?email=' + sessionStorage.getItem('CurrentUser');
        fetch(url).then(res => res.json()).then(data => setBookings(data))
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Room</th>
                                <th scope="col">Check In</th>
                                <th scope="col">Check Out</th>
                            </tr>
                        </thead>
                        {
                            bookings.map((x, y) =>
                                <tbody key={y}>
                                    <tr>
                                        <td>{x.userName}</td>
                                        <td>{x.email}</td>
                                        <td>{x.mobile}</td>
                                        <td>{x.name}</td>
                                        <td>{x.CheckIN}</td>
                                        <td>{x.CheckOUT}</td>
                                    </tr>
                                </tbody>)
                        }

                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyRent;