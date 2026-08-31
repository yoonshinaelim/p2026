import { useNavigate } from 'react-router-dom';
import { experienceData, ExperienceItem } from '../data/experienceData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const listRef = useRef<HTMLUListElement | null>(null);

  const reversedData = [...experienceData].reverse();

  const handleNavigate = (id: number) => {
    navigate(`/experience/${id}`);
  };

  // 이미지 프리로딩 처리
  useEffect(() => {
    let isMounted = true;

    const loadImage = (id: number) => {
      return new Promise((resolve) => {
        const img = new Image();
        const src = new URL(`../assets/exp/list/bg${id}.jpg`, import.meta.url).href;
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => resolve(null); // 에러 발생 시에도 계속 진행
      });
    };

    Promise.all(reversedData.map((item) => loadImage(item.id))).then(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // GSAP ScrollTrigger 애니메이션 (로딩 완료 후 실행)
  useEffect(() => {
    if (isLoading || !listRef.current) return;

    // GSAP Context 사용 (React 리렌더링 시 세이프가드)
    const ctx = gsap.context(() => {
      const listItems = listRef.current?.querySelectorAll('li');

      if (listItems && listItems.length > 0) {
        listItems.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }

      // DOM 배치 완료 후 ScrollTrigger 위치 다시 재계산
      ScrollTrigger.refresh();
    }, listRef);

    return () => ctx.revert(); // 컴포넌트 언마운트 시 모든 GSAP 애니메이션 cleanup
  }, [isLoading]);

  return (
    <main className="experience">
      {/* 로딩 표시기 */}
      {isLoading ? (
        <div className="loading_box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="listWrap">
          <ul className="list" ref={listRef}>
            {reversedData.map((item: ExperienceItem) => {
              const isTargetId = [7, 11, 23].includes(item.id);
              
              let imgSrc = '';
              try {
                imgSrc = new URL(`../assets/exp/list/bg${item.id}.jpg`, import.meta.url).href;
              } catch (e) {
                console.error("Image load error for id:", item.id);
              }

              return (
                <li key={item.id} style={{ opacity: 0 }}>
                  <div className="button_box">
                    <button type="button" onClick={() => handleNavigate(item.id)}>
                      {imgSrc && (
                        <img
                          src={imgSrc}
                          alt={item.title1}
                        />
                      )}
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
      )}
    </main>
  );
};

export default Experience;