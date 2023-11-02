import React from "react";
import './Header.css'
import SearchIcon from '@material-ui/icons/Search'
// import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider"
import { auth } from "./firebase";

function Header() {

    const [{basket, user} ] = useStateValue();
    const handleAuthentication = () => {
        if(user) {
            auth.signOut();
        }
    }

    return (
    <div className="header">
        <Link to='/'>
        <img className="header_logo" src="/logo.jpeg" alt="Logo"/>
        </Link>
        
        <div className="header_search">
            <input className="header_searchInput" type="text" />
            <SearchIcon className="header_searchIcon" />
        </div>
        <div className="header_nav">
        <Link to={!user && "/login"}>
            <div onClick={handleAuthentication} className="header_option">
                <span className='header_optionLineOne'>Hello {!user ? 'Guest' : user.email}</span>
                <span className='header_optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
            </div>
        </Link>
            <div className="header_option">
                <span className='header_optionLineOne'>Return</span>
                <span className='header_optionLineTwo'>Games</span>
            </div>
            <div className="header_option">
                <span className='header_optionLineOne'>Your</span>
                <span className='header_optionLineTwo'>Selection</span>
            </div>
            <Link to="/dashboard">
                <div className="header_optionBasket">
                    {/* <ShoppingBasket  /> */}
                    <AccountCircleIcon />
                    {/* <span className="header_optionLineTwo header_basketCount">{basket?.length}</span> */}
                </div>
            </Link>
            
        </div>
    </div>
    )}

export default Header;
