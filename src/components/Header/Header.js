import React, { useContext } from 'react';
import './Header.css'
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    const history = useHistory()
    return (
        <div className="header">
            <div className="container">
            <div className="d-md-flex justify-content-between">
                <div className="logo d-md-block d-none">
                    <h2>BD Riders</h2>
                </div>
                <nav className="navLink">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/destination">Destination</Link></li>
                        <li><Link to="/">Blog</Link></li>
                        <li><Link to="/">Contact</Link></li>
                        
                        {
                            loggedInUser.email ?<li className="userName text-warning">{loggedInUser.displayName || loggedInUser.name}</li> : <button className="btn btn-success" onClick={() => history.push('/login')}>Login</button>
                        }
                    </ul>
                </nav>
            </div>
        </div>
        </div>
    );
};

export default Header;