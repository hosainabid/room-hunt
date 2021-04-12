import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Sidebar from './Sidebar';

const AddRent = () => {
    let history = useHistory();
    const [roomInfo, setRoomInfo] = useState({});
    const [file, setFile] = useState(null);

    const handleFile = (e) => {
        const newfile = e.target.files[0];
        setFile(newfile);
    }
    const handleBlur = (e) => {
        const newInfo = { ...roomInfo }
        newInfo[e.target.name] = e.target.value;
        setRoomInfo(newInfo);
    }

    const handleSubmit = (event) => {
        const formData = new FormData()
        formData.append('file', file);
        formData.append('name', roomInfo.name);
        formData.append('id', roomInfo.id);
        formData.append('address', roomInfo.address);
        formData.append('bed', roomInfo.bed);
        formData.append('bath', roomInfo.bath);
        formData.append('price', roomInfo.price);
        formData.append('flatSize', roomInfo.flatSize);
        formData.append('location', roomInfo.location);
        formData.append('RoomType', roomInfo.RoomType);
        formData.append('TV', roomInfo.TV);
        formData.append('Wifi', roomInfo.Wifi);
        formData.append('Breakfast', roomInfo.Breakfast);
        formData.append('SwimmingPool', roomInfo.SwimmingPool);
        formData.append('Parking', roomInfo.Parking);
        console.log(formData);
        fetch('https://dry-stream-50320.herokuapp.com/addRoom', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            })
        alert('Room added successfully!')
        history.replace('/');
        event.preventDefault();
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="container-fluid">
                        <form onSubmit={handleSubmit} className="row mb-5">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="id">Room Id (example) : {Date.now()}</label>
                                    <input onBlur={handleBlur} type="text" className="form-control" name="id" id="id" placeholder="Copy & paste the unique Id" required />
                                    <label htmlFor="name">Room title</label>
                                    <input onBlur={handleBlur} type="text" className="form-control" name="name" id="name" placeholder="Single standard/Family Delux/Double" required />
                                    <label htmlFor="address">Address</label>
                                    <input onBlur={handleBlur} type="text" className="form-control" name="address" id="address" placeholder="Mirpur 10 Dhaka" required />
                                    <label htmlFor="bed">Bed</label>
                                    <input onBlur={handleBlur} type="number" className="form-control" name="bed" id="bed" placeholder="number of bed" required />
                                    <label htmlFor="bath">Bath</label>
                                    <input onBlur={handleBlur} type="number" className="form-control" name="bath" id="bath" placeholder="bathroom" required />
                                    <label htmlFor="price">Price</label>
                                    <input onBlur={handleBlur} type="number" className="form-control" name="price" id="price" placeholder="Price" required />
                                    <label htmlFor="flatSize">Flat Size</label>
                                    <input onBlur={handleBlur} type="number" className="form-control" name="flatSize" id="flatSize" placeholder="Sq. ft" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="photo">Room Image</label>
                                    <input onChange={handleFile} type="file" className="form-control-file" id="photo" name="photo" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="htmlForm-group">
                                    <label htmlFor="location">Location</label>
                                    <input onBlur={handleBlur} className="form-control" id="location" name="location" placeholder="Dhaka/Sylhet/Chattagram" type="text" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="RoomType">Room Type</label>
                                    <input onBlur={handleBlur} className="form-control" id="RoomType" name="RoomType" placeholder="Single/Double/Family" type="text" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="TV">Television</label>
                                    <input onBlur={handleBlur} className="form-control" id="TV" name="TV" placeholder="Yes/No" type="text" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Wifi">Internet</label>
                                    <input onBlur={handleBlur} className="form-control" id="Wifi" name="Wifi" placeholder="Yes/No" type="text" required />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="Breakfast">Breakfast</label>
                                    <input onBlur={handleBlur} className="form-control" id="Breakfast" name="Breakfast" placeholder="Yes/No" type="text" required />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="SwimmingPool">SwimmingPool</label>
                                    <input onBlur={handleBlur} className="form-control" id="SwimmingPool" name="SwimmingPool" placeholder="Yes/No" type="text" required />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="Parking">Parking</label>
                                    <input onBlur={handleBlur} className="form-control" id="Parking" name="Parking" placeholder="Yes/No" type="text" required />

                                </div>
                            </div>
                            <input className="btn btn-info w-100" type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRent;