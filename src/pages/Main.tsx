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
  const visibleData = reversedData;
  
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!listRef.current) return;

    const listItems = listRef.current.querySelectorAll('li');
    
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
    }

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="experience">
      <div className="listWrap">
        <ul className="list" ref={listRef}>
          {visibleData.map((item: ExperienceItem) => {
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
    </main>
  );
};

export default Experience;