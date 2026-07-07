import { useNavigate } from 'react-router-dom';
import { experienceData, ExperienceItem } from '../data/experienceData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (id: number) => {
    navigate(`/experience/${id}`);
  };

  const reversedData = [...experienceData].reverse();
  
  // 만약 나중에 더보기(Load More) 기능 등을 염두에 두신 게 아니라면 
  // 바로 reversedData를 사용하셔도 좋지만, 유지하신다면 visibleCount를 의존성에 넣는 것이 안전합니다.
  const [visibleCount] = useState(reversedData.length);
  const visibleData = reversedData.slice(0, visibleCount);
  
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    // 요소가 없거나 아이템이 없으면 실행하지 않음
    if (!listRef.current) return;

    // GSAP Context를 생성하여 이 컴포넌트 내부의 애니메이션만 안전하게 관리
    const ctx = gsap.context(() => {
      const listItems = listRef.current?.querySelectorAll('li');
      
      if (listItems && listItems.length > 0) {
        listItems.forEach((item) => {
          gsap.fromTo(item, 
            { 
              opacity: 0, 
              y: 60 
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            }
          );
        });

        // 💡 핵심: DOM 요소들의 위치 계산을 강제로 새로고침하여 타이밍 오류 해결
        ScrollTrigger.refresh();
      }
    }, listRef); // 스코프를 listRef로 제한

    ScrollTrigger.refresh();
    // 컴포넌트 언마운트 시 해당 컨텍스트 내의 모든 트리거만 깔끔하게 제거
    return () => ctx.revert();
  }, [visibleCount]); // 배열이나 객체 대신 숫자를 감시하여 무한 루프 예방

  return (
    <main className="experience">
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