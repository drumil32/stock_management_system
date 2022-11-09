import { Navigate } from 'react-router-dom';

const SignOut = (props) => {

    const a = async () => {
        if (props.cookies.token) {

            await fetch("http://localhost:4002/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(props.userDetails),
            });

            props.handleRemoveCookie(`token`);
            window.alert(`you are signout`);
            props.setUserDetails({});
        } else {
            window.alert(`yor are not logged in`);
        }
    }
    a();

    return <Navigate to='/Home' />
}

export default SignOut;