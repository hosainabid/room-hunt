import React from 'react';
import { useParams } from 'react-router';


const UpdateInfo = () => {
    // let history = useHistory();
    const { RoomID } = useParams();
    const handleUpdate = (e) => {
        const price = document.getElementById('price').value;
        const product = { RoomID, price };

        fetch(`https://dry-stream-50320.herokuapp.com/update/${RoomID}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    alert('Price Updated Successfully!')
                }
            })
        // history.replace('/');
        e.preventDefault();
    }
    return (
        <div className="container">
            <form className="d-flex" onSubmit={handleUpdate}>
                <input required
                    type="number"
                    name='price' id='price'
                    className="form-control"
                    placeholder="Enter updated price" />
                <input className="btn btn-info w-50" type="submit" value="Update Price" />
            </form>
        </div>

    );
};

export default UpdateInfo;