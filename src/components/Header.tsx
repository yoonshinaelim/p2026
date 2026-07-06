import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isActive2, setIsActive2] = useState<boolean>(false);

    // 메뉴 토글 함수 (모바일 메뉴용)
    const toggleMenu = () => {
        setIsActive(!isActive);
        document.body.classList.toggle('fixed');
    };

    // 스크롤 감지 함수
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsActive2(true);
            } else {
                setIsActive2(false);
            }
        };

        // 컴포넌트가 마운트될 때 스크롤 이벤트 등록
        window.addEventListener('scroll', handleScroll);

        // 컴포넌트가 언마운트될 때 스크롤 이벤트 제거 (메모리 누수 방지)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`header ${isActive2 ? 'on' : ''}`}>
            <h1 className="header__home"><Link to="/">YOON.</Link></h1>
            <button 
                type="button" 
                id="btn-menu" 
                className={`header__menu ${isActive ? 'on' : ''}`} 
                onClick={toggleMenu} 
                aria-label="메뉴 열기" 
                aria-expanded={isActive}
            >
                <span className="visually-hidden">메뉴버튼</span>
            </button>
            <nav id="nav-list" className={`nav ${isActive ? 'on' : ''}`}>
                <ul className="nav__list">
                    <li><Link to="/About" onClick={toggleMenu}>about</Link></li>
                    <li><Link to="/Experience" onClick={toggleMenu}>experience</Link></li>
                    <li><Link to="/contact" onClick={toggleMenu}>contact</Link></li>
                </ul>
            </nav>
        </header>   
    );
};

export default Header;