import { useNavigate } from 'react-router-dom';
import { experienceData, ExperienceItem } from '../data/experienceData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

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

    const context = gsap.context(() => {
      const listItems = listRef.current?.querySelectorAll('li');
      if (!listItems?.length) return;

      gsap.fromTo(listItems,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'power2.out'
        }
      );
    }, listRef);

    return () => context.revert();
  }, []);

  return (
    <main className="experience">
      <div className="title_box">
          <h2 className="title">WORKS</h2>
          <p className="text">감각적인 디테일과 완성도를 경험해 보세요.</p>
      </div>
      <div className="listWrap">
        <ul className="list" ref={listRef}>
          {visibleData.map((item: ExperienceItem) => {
            let imgSrc = '';
            try {
              imgSrc = new URL(`../assets/exp/list/bg${item.id}.jpg`, import.meta.url).href;
            } catch (e) {
              console.error("Image load error for id:", item.id);
            }

            return (
              <li key={item.id}>
                <div className="button_box">
                  <button type="button" onClick={() => handleNavigate(item.id)}>
                      <span className="box">
                        <span className="img" style={{ backgroundImage: `url(${imgSrc})` }}><span className="visually-hidden">{item.title2}</span></span>
                        <strong className="title1">{item.title1}</strong>
                        <span className="title2">{item.title2}</span>
                      </span>
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
