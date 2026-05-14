import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 페이지 경로가 바뀔 때마다 스크롤을 최상단(0, 0)으로 이동
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 화면에 아무것도 그리지는 않는 컴포넌트입니다.
};

export default ScrollToTop;