import { useNavigate } from 'react-router-dom';
import { experienceData, ExperienceItem } from '../data/experienceData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // ScrollTrigger 임포트
import { useEffect, useRef, useState } from 'react';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (id: number) => {
    navigate(`/experience/${id}`);
  };

  const reversedData = [...experienceData].reverse();
  
  // 상태 초기값 설정 (우선 전체 데이터를 다 보여주도록 설정)
  const [visibleCount, setVisibleCount] = useState(reversedData.length);
  const visibleData = reversedData.slice(0, visibleCount);
  
  const listRef = useRef<HTMLUListElement | null>(null); // 리스트 애니메이션을 위한 ref 추가


  useEffect(() => {

    // 1. 스크롤 시 리스트 아이템이 자연스럽게 나오는 애니메이션 (ScrollTrigger)
    const listItems = listRef.current?.querySelectorAll('li');
    if (listItems?.length) {
      listItems.forEach((item) => {
        gsap.fromTo(item, 
          { 
            opacity: 0, 
            y: 60 // 아래에서 시작
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,       // 애니메이션 시작 기준이 되는 요소
              start: 'top 85%',    // 요소의 탑이 화면의 85% 지점에 도달했을 때 시작
              toggleActions: 'play none none none', // 스크롤 내릴 때 한 번만 재생
            }
          }
        );
      });
    }

    // 컴포넌트 언마운트 시 ScrollTrigger 인스턴스 정리
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [visibleData]); // visibleData가 변경되어 리스트가 다시 그려질 때 애니메이션 재설정
  return (
    <main className="experience round">
      <div className="listWrap">
        <ul className="list" ref={listRef}>
          {visibleData.map((item: ExperienceItem) => {
            const isTargetId = [7, 11, 23, 24].includes(item.id);
            return (
              <li key={item.id}>
                <div className="button_box">
                  <button type="button" onClick={() => handleNavigate(item.id)}>
                    <img
                      src={new URL(`../assets/exp/list/bg${item.id}.jpg`, import.meta.url).href}
                      alt={item.title1}
                    />
                    {!isTargetId && (
                      <span className="box">
                        <strong className="title1">{item.title1}</strong>
                        <span className="title2">{item.title2}</span>
                      </span>
                    )}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Experience;