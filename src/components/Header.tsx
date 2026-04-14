import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const toggleMenu = () => {
        setIsActive(!isActive);
        document.body.classList.toggle('fixed');
      };
    return (
        <header className="header">
            <h1 className="header__home"><Link to="/">윤신애림.</Link></h1>
            <button type="button" id="btn-menu" className={`header__menu ${isActive ? 'on' : ''}`} onClick={toggleMenu} aria-label="메뉴 열기" aria-expanded={isActive}><span className="hidden">메뉴버튼</span></button>
            <nav id="nav-list" className={`nav ${isActive ? 'on' : ''}`}>
                <ul className="nav__list">
                    <li><Link to="/About" onClick={toggleMenu}>about</Link></li>
                    <li><Link to="/Experience" onClick={toggleMenu}>experience</Link></li>
                    <li><Link to="/contact" onClick={toggleMenu}>contact</Link></li>
                </ul>
            </nav>
        </header>   
) 
}

export default Header;