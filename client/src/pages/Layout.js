import { Outlet, Link } from "react-router-dom";
const Layout = (props) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">
                        {props.cookies.token === undefined && "Navbar"}
                        {props.cookies.token && `${props.userDetails.firstname} ${props.userDetails.lastname}`}
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/Home">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/About">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/Contact">
                                    Contact
                                </Link>
                            </li>
                            {
                                props.cookies.token === undefined &&
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/SignUp">
                                        SignUp
                                    </Link>
                                </li>
                            }{props.cookies.token === undefined &&
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/SignIn">
                                        SignIn
                                    </Link>
                                </li>
                            }
                            {props.cookies.token &&
                                <li className="nav-item" >
                                    <Link className="nav-link active" aria-current="page" to="/SignOut">
                                        signOut
                                    </Link>
                                </li>
                            }
                            {
                                props.cookies.token &&
                                <li className="nav-item" >
                                    <Link className="nav-link active" aria-current="page" to="/Profile">
                                        Profile
                                    </Link>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
};

export default Layout;