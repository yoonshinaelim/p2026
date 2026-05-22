import { useNavigate } from 'react-router-dom';
import { experienceData, ExperienceItem } from '../data/experienceData';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const Experience: React.FC = () => {
const navigate = useNavigate();
const handleNavigate = (id: number) => {
    navigate(`/experience/${id}`);
};
const reversedData = [...experienceData].reverse();

const titleRef=useRef<HTMLHeadElement | null>(null);
const expTitle = "EXPERIENCE";
useEffect(() =>{
  const expTitleChar = titleRef.current?.querySelectorAll<HTMLSpanElement>('.title-letter');

  if(!expTitleChar?.length ) return;

  const tl = gsap.timeline();
  tl.set(expTitleChar, {opacity:0 , y: 50});
  tl.to(expTitleChar, {opacity:1, y : 0, duration: 0.4, ease: 'power2.out', stagger: 0.05});
},[]);


    return (
      <main className="experience">
        <h2 className="title" ref={titleRef}>
          {expTitle.split('').map((char, index) => (
            <span key={index} className="title-letter">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>
        <ul className="list">
          {reversedData.map((item: ExperienceItem) => (
            <li key={item.id}>
              <div className="button_box">
                <button type="button"
                  onClick={() => handleNavigate(item.id)}
                  style={{
                    backgroundImage: `url(${
                      new URL(`../assets/exp/list/bg${item.id}.jpg`, import.meta.url).href
                    })`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'cover'
                  }}
                >
                  <span className="box">
                    <strong className="title1">{item.title1}</strong>
                    <span className="title2">{item.title2}</span>
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    );
  };
export default Experience;