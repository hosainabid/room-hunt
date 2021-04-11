import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../App';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
import GoggleFbLogin from './GoggleFbLogin';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const Login = () => {
    const [loggedInUser, setloggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(res => {
                const newUserInfo = { ...loggedInUser }
                newUserInfo.email = res.user.email;
                newUserInfo.name = res.user.displayName;
                setloggedInUser(newUserInfo);
                sessionStorage.setItem('CurrentUser', data.email);
                history.replace(from);
                // console.log('alhamdulillah');
            })
            .catch(error => {
                const newUserInfo = { ...loggedInUser }
                newUserInfo.error = error.message;
                setloggedInUser(newUserInfo);
            });
    };
    

    return (
        <div className="d-flex justify-content-center">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
                <br /> <br />
                <h1 className="text-center">Sign In</h1> <br />

                <input className="form-control" name="email" type="email" {...register("email", { required: true })} placeholder="Email" />
                {errors.email && <small className="text-danger">This field is required</small>} <br />

                <input className="form-control" name="password" type="password" {...register("password", { required: true })} placeholder="Password" />
                {errors.password && <small className="text-danger">This field is required</small>} <br />

                <input className="btn btn-info w-100" type="submit" value="Sign In" />
                <Link to="/SignUp"><small>Don't have an account?</small></Link>
                <p className="text-danger">{loggedInUser.error}</p>
                <p id="or">Or</p>
                <GoggleFbLogin />
            </form>
        </div>
    )

};

export default Login;