import React,{ useState,Component  } from 'react';
import {Route, useNavigate} from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    
    const [user, setUser] = useState({
        firstName: "", lastName: "", emailid: "", password: "", confirmPassword: ""
    });

    const handleInputs = (e) => {
        
        const {name,value} = e.target;
        
        setUser((prevValue)=>{return {...prevValue,[name]:value}});

        // never do like this
        // setUser({ ...user, [name]: value });
    }
    const postData = async (e) => {
        e.preventDefault();
        
        
        const { firstName, lastName, emailid, password, confirmPassword } = user;
        const res = await fetch("http://localhost:4002/register", {
            method : "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstName,lastName,emailid,password,confirmPassword}),
        });
        const data = await res.json();
        if( data.error ){
            window.alert(`invalid`);
        }else{
            navigate('/Home');
        }
    }
    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: 25 }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                                Sign up
                                            </p>
                                            <form className="mx-1 mx-md-4" method="POST">
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="firstName"
                                                            className="form-control"
                                                            name="firstName" autoComplete="off" value={user.firstName} onChange={handleInputs}
                                                        />
                                                        <label className="form-label" htmlFor="firstName">
                                                            First Name
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="lastName"
                                                            className="form-control"
                                                            name="lastName"
                                                            autoComplete="off" value={user.lastName} onChange={handleInputs}
                                                        />
                                                        <label className="form-label" htmlFor="lastName">
                                                            Last Name
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="email"
                                                            id="emailId"
                                                            className="form-control"
                                                            name="emailid" autoComplete="off" value={user.emailid} onChange={handleInputs}
                                                        />
                                                        <label className="form-label" htmlFor="emailid">
                                                            Your Email
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            className="form-control"
                                                            name="password" autoComplete="off" value={user.password} onChange={handleInputs}
                                                        />
                                                        <label className="form-label" htmlFor="password">
                                                            Password
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            id="confirmPassword"
                                                            className="form-control"
                                                            name="confirmPassword" autoComplete="off" value={user.confirmPassword} onChange={handleInputs}
                                                        />
                                                        <label className="form-label" htmlFor="confirmPassword">
                                                            Repeat your password
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input
                                                        className="form-check-input me-2"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="form2Example3c"
                                                    />
                                                    <label className="form-check-label" htmlFor="form2Example3">
                                                        I agree all statements in{" "}
                                                        <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <input type="submit" className="btn btn-primary btn-lg" id="signUp" value="signUp" onClick={postData} />
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
};

export default SignUp;