import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react'

const SignIn = (props) => {
    const nevigate = useNavigate();

    const [user, setUser] = useState({
        emailid: "", password: ""
    });

    if (props.cookies.token) {
        window.alert(`You are already logged in`);
        // nevigate('/Home'); is not working here WHY??
        return <Navigate to='/Home' />
    }

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser((prevValue) => { return { ...prevValue, [name]: value } });

        // never do like this
        // setUser({ ...user, [name]: value });
    }

    const postData = async (e) => {
        e.preventDefault();
        const { emailid, password } = user;
        const res = await fetch("http://localhost:4002/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ emailid, password }),
        });
        const data = await res.json();
        if (data.error) {
            window.alert(`${data.error}`);
        } else {
            delete data.userDetails.password;

            const userDetails = data.userDetails;
            // reactLocalStorage.setObject('userDetails', { ...userDetails });
            props.setUserDetails({...userDetails});

            props.handleSetCookie(`token`, data.token);
            nevigate('/Home');
        }
    }
    return (
        <>
            <form method="POST">
                {/* Email input */}
                <div className="form-outline mb-4">
                    <input
                        type="email"
                        id="emailid"
                        name="emailid"
                        className="form-control"
                        autoComplete="off"
                        onChange={handleInputs}
                        value={user.emailid}
                    />
                    <label className="form-label" htmlFor="emailid">
                        Email address
                    </label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-4">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        autoComplete="off"
                        onChange={handleInputs}
                        value={user.password}
                    />
                    <label className="form-label" htmlFor="password">
                        Password
                    </label>
                </div>
                {/* 2 column grid layout for inline styling */}
                <div className="row mb-4">
                    <div className="col">
                        {/* Simple link */}
                        <Link to="#!">Forgot password?</Link>
                    </div>
                </div>
                {/* Submit button */}
                <input type="submit" id="signin" value="Submit" className="btn btn-primary btn-block mb-4" onClick={postData} />

                {/* Register buttons */}
                <div className="text-center">
                    <p>
                        Not a member? <Link to="/SignUp">Register</Link>
                    </p>
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f" />
                    </button>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google" />
                    </button>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter" />
                    </button>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github" />
                    </button>
                </div>
            </form>
        </>
    );
};

export default SignIn;