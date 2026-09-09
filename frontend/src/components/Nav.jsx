import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

function Nav() {
    const [navStatus, setNavStatus] = useState(false);
    const navRef = useRef(null);

    useEffect(()=>{
        const handleOutsideClick=(e)=>{
            //if sth is clicked, and the target is outside the nav, close the menu
            if (navRef.current && !navRef.current.contains(e.target)){
                setNavStatus(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);

        //cleanup
        return ()=>{
            document.removeEventListener(
                "mousedown", handleOutsideClick
            )
        }
    }, [])

    return (
        <nav className="nav" ref={navRef}>
            <button 
                className = "nav-icon"
                onClick={()=>{
                    setNavStatus(prev => !prev);
                }}
            >
                <i className="fa-solid fa-bars" id = "menu-icon"></i>
            </button>
            
            {navStatus && (
            <div className="nav-dropdown">
                <Link to="/">Home</Link>
                <Link to="/Note">Note</Link>
                <Link to="/Levels">Learn</Link>
            </div>
            )}
        </nav>
    )
}
export default Nav;