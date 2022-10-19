import "./index.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from '../../context';
import axios from 'axios'
const NavBar = () => {
    let { state,dispatch } = useContext(GlobalContext);

    const logoutHandler = async () => {
        let baseUrl = "http://localhost:5001";
        try {
            let response = await axios.post(`${baseUrl}/logout`, {},
                {
                    withCredentials: true
                })
            console.log("response: ", response.data);

            dispatch({ type: "USER_LOGOUT" })

        } catch (e) {
            console.log("Error in api call: ", e);
        }
    }

    return (

        <div className="nav">
            <div className="user">{state?.user?.firstName} {state?.user?.lastName}</div>

            <nav className="navbar-component">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">profile</Link>
                    </li>
                    <li>
                        <Link to="/gallery">Gallery</Link>``
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login" onClick={logoutHandler}>Loqout</Link>
                    </li>
                </ul>
            </nav>

        </div>

    )
}
export default NavBar;