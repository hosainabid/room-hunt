import React, { useState } from 'react';
import Sidebar from './Sidebar';
const MakeAdmin = () => {
    const [adminEmail, setAdminEmail] = useState('')
    const handleInput = (e) => {
        setAdminEmail(e.target.value)
    }
    const handleSubmit = (e) => {
        const formData = new FormData()
        formData.append('email', adminEmail);
        fetch('https://still-waters-21873.herokuapp.com/makeAdmin', {
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
        e.preventDefault();
        alert('Admin added successfully!')

    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="container">
                        <form className="row" onSubmit={handleSubmit}>
                            <div className="col-md-8">
                                <input onChange={handleInput} type="text" className="form-control" placeholder="New Admin's Email Address" />
                            </div>
                            <div className="col-md-4">
                                <input className="btn btn-info w-50" type="submit" value="Make Admin" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;