import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isActive, setIsActive] = useState<boolean>(false);     // 모바일 메뉴 상태
    const [isHide, setIsHide] = useState<boolean>(false);         // 💡 스크롤 다운 시 헤더 숨김 상태
    const [isWhite, setIsWhite] = useState<boolean>(false);       // 흰색 헤더 상태
    const location = useLocation();

    // 메뉴 토글 함수
    const toggleMenu = () => {
        setIsActive(!isActive);
        document.body.classList.toggle('fixed');
    };

    // 메뉴 닫기 함수
    const closeMenu = () => {
        setIsActive(false);
        document.body.classList.remove('fixed');
    };

    // 💡 스크롤 방향 감지 로직
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // 모바일 메뉴가 열려있을 때는 헤더가 숨겨지지 않도록 예외 처리
            if (isActive) return;

            // 맨 위로 올라왔을 때는 헤더를 무조건 보여줌
            if (currentScrollY <= 0) {
                setIsHide(false);
                lastScrollY = currentScrollY;
                return;
            }

            // 스크롤 내릴 때 -> hide 클래스 추가 (숨김)
            // 스크롤 올릴 때 -> hide 클래스 제거 (보임)
            if (currentScrollY > lastScrollY) {
                setIsHide(true);
            } else {
                setIsHide(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isActive]);

    // 특정 페이지 검사
    useEffect(() => {
        const timer = setTimeout(() => {
            const hasClass = document.querySelector('.expage') || document.querySelector('.about');
            setIsWhite(hasClass !== null);
        }, 0); 
        
        return () => clearTimeout(timer);
    }, [location]);

    return (
        // 💡 isHide 상태에 따라 'hide' 클래스 추가
        <header className={`header ${isHide ? 'hide' : ''} ${isWhite ? 'white' : ''}`}>
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
                    <li><Link to="/Experience" onClick={closeMenu}>WORKS</Link></li>
                    <li><Link to="/contact" onClick={closeMenu}>CONTACT</Link></li>
                </ul>
            </nav>
        </header>   
    );
};

export default Header;