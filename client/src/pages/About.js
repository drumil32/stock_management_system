import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';
const cookies = new Cookies();

const About =  () => {
    const temp =  cookies.get(`token`);
    if( !temp ){
        window.alert(`please login first`);
        return <Navigate to='/SignIn' />
    }else{
        return (
            <>
                <h1>hello</h1>
            </>
        );
    }
};

export default About;