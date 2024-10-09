import { NavLink } from "react-router-dom";
import { NavbarHook } from "../../../hook/Navbar/Navbar";
import MenuIcon from '../../../assets/MenuIcon.png';
import './navbar.css';

const Navbar = () => {
    const { 
        sticky, 
        menuIcon, 
        HandleIcon 
    } = NavbarHook();

    return (
        <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
        <h1>CEI INVENTORY</h1>
            <ul className={menuIcon ? "" : "hide-mobile-menu"}>
                <li><NavLink to="/" activeClaactiveClassName="active">Home</NavLink></li>
                <li><NavLink to="/Master-data" activeClaactiveClassName="active">Master Data</NavLink></li>
                <li><NavLink to="/Division-data" activeClaactiveClassName="active">Division Data</NavLink></li>
                <li><NavLink to="/Incoming" activeClassName="active">Incoming</NavLink></li>
                <li><NavLink to="/Outcoming" activeClassName="active">Outcoming</NavLink></li>
                <li><NavLink to="/Remaining-stock" activeClassName="active">remaining stock</NavLink></li>
                <li><NavLink to="/Logout" activeClassName="active">Logout</NavLink></li> 
            </ul>
            <img src={MenuIcon} alt="menu-icon" className="menu-icon" onClick={HandleIcon}/>
        </nav>
    );
}

export default Navbar;