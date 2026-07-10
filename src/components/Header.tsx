import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isActive, setIsActive] = useState<boolean>(false);   // 모바일 메뉴 상태
    const [isActive2, setIsActive2] = useState<boolean>(false); // 스크롤 상태
    const [isWhite, setIsWhite] = useState<boolean>(false);     // 흰색 헤더 상태
    const location = useLocation();

    // 메뉴 토글 함수 (모바일 버튼 클릭 시 사용)
    const toggleMenu = () => {
        setIsActive(!isActive);
        document.body.classList.toggle('fixed');
    };

    // 메뉴 닫기 함수 (링크 클릭 시 사용 - 데스크톱에서 fixed 버그 방지)
    const closeMenu = () => {
        setIsActive(false);
        document.body.classList.remove('fixed');
    };

    // 스크롤 감지 함수
    useEffect(() => {
        const handleScroll = () => {
            setIsActive2(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 특정 요소(.expPage, .about)가 존재할 때만 헤더를 흰색으로 변경
    useEffect(() => {
        const timer = setTimeout(() => {
            const hasClass = document.querySelector('.expage') || document.querySelector('.about');
            setIsWhite(hasClass !== null);
        }, 0); 
        
        return () => clearTimeout(timer);
    }, [location]); // 페이지(URL)가 바뀔 때마다 다시 DOM을 검사합니다.

    return (
        <header className={`header ${isActive2 ? 'on' : ''} ${isWhite ? 'white' : ''}`}>
            <h1 className="header__home"><Link to="/" onClick={closeMenu}>YOON.</Link></h1>
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
                    <li><Link to="/About" onClick={closeMenu}>about</Link></li>
                    <li><Link to="/Experience" onClick={closeMenu}>experience</Link></li>
                    <li><Link to="/contact" onClick={closeMenu}>contact</Link></li>
                </ul>
            </nav>
        </header>   
    );
};

export default Header;