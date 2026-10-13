import React, { useState, useEffect } from 'react';

const Footer = () => {    
  const [isActive, setIsActive] = useState<boolean>(false);

  // 상단으로 부드럽게 이동하는 함수
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }; 

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
        
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="footer">
      <button 
        className={`btn_top ${isActive ? 'on' : ''}`} 
        onClick={scrollTop} 
        type="button"
      >
        <span className="visually-hidden">위로 올라가기</span>
      </button>
      <p className="footer__copy">&copy;2026 YOON ALL RIGHTS RESERVED.</p>
    </footer>
  );
};

export default Footer;