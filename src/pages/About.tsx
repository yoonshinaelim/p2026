
import React, { useState, useRef, useEffect } from "react";
import gsap from 'gsap';
const historyData = [
  { year: '1991', title: 'BIRTH', desc: '1991년 12월 5일 경기도 출생' },
  { year: '2010', title: 'EDUCATION', desc: '디자인 전공 학사 학위 취득 및 산업디자인 학과 졸업' },
  { year: '2014', title: 'CAREER', desc: '7년 차 웹 퍼블리셔로서의 실무 경력 구축' },
  { year: '2021', title: 'LIFE EVENT', desc: '두 아이의 출산과 육아를 통해 얻은 삶의 균형과 새로운 동력' },
];
const About = () => {
    const [hoveredYear, setHoveredYear] = useState<string | null>(null);
    const [isMobileView, setIsMobileView] = useState<boolean>(false);
    const section2Ref = useRef<HTMLElement>(null);
    const section1titleRef = useRef<HTMLHeadingElement | null>(null);
    const sectionTitle = "윤신애림.";

    useEffect(() => {
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      const updateView = () => setIsMobileView(mediaQuery.matches);
      const sectionTitleChar = section1titleRef.current?.querySelectorAll<HTMLSpanElement>('.title-letter');
      if(!sectionTitleChar?.length) return;

      const tl = gsap.timeline();
      tl.set(sectionTitleChar, {opacity:0, y : 50});
      tl.to(sectionTitleChar, {opacity:1, y:0, duration: 0.4, ease:'power2.out', stagger:0.05})

      updateView();
      mediaQuery.addEventListener?.('change', updateView);
      mediaQuery.addListener?.(updateView);
      return () => {
        mediaQuery.removeEventListener?.('change', updateView);
        mediaQuery.removeListener?.(updateView);
      };
    }, []);

    const scrollToSection = () => {
        section2Ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <main className="about round">
            <section className="about__section1">
                <div className="box">
                    <span className="box__tit1">about me</span>
                    <h2 className="box__tit2" ref={section1titleRef}>
                        {sectionTitle.split('').map((char, index) => (
                            <span key={index} className="title-letter">
                                {char === ' ' ? '\u00A0' : char }
                            </span>

                        ))}
                    </h2>
                    <button type="button" className="box__btn" onClick={scrollToSection} aria-label="아래로 내려가기"><span className="visually-hidden">아래로 내려가기 버튼</span></button>
                </div>
            </section>
            <section className="about__section2" ref={section2Ref}>
            <div className="history">
                {historyData.map((item) => (
                    <dl 
                    key={item.year}
                    onMouseEnter={() => setHoveredYear(item.year)}
                    onMouseLeave={() => setHoveredYear(null)}
                    >
                        <dt>{item.year}</dt>
                        <dd className={isMobileView || hoveredYear === item.year ? 'on' : '' }>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </dd>
                    </dl>
                ))}
                </div>
            </section>
            <section className="about__section3">
                <ol className="skill">
                    <li>
                        <span>01</span>
                        <h3>시멘틱 마크업 &amp; 웹 표준</h3>
                        <p>웹 표준을 준수하는 시멘틱 태그 활용으로 정보의 구조를 명확히 설계합니다. 이는 검색 엔진 최적화(SEO)를 극대화할 뿐만 아니라, 보조 공학 기기를 사용하는 사용자까지 고려한 웹 접근성(A11y) 향상에 기여합니다.</p>
                    </li>
                    <li>
                        <span>02</span>
                        <h3>반응형 인터페이스 &amp; 최적화</h3>
                        <p>다양한 해상도와 디바이스 환경에 대응하는 유연한 레이아웃을 구현합니다. 미디어 쿼리와 최신 CSS 기법을 활용하여 시각적 일관성을 유지하며, 코드 효율화를 통해 로딩 속도를 개선하고 쾌적한 사용자 경험을 제공합니다.</p>
                    </li>
                    <li>
                        <span>03</span>
                        <h3>인터랙티브 모션 구현</h3>
                        <p>복잡한 타임라인 기반의 애니메이션 라이브러리를 활용해 생동감 있는 사용자 인터페이스를 구축합니다. 브라우저 렌더링 원리를 이해하여 성능 저하 없는 부드러운 인터랙션을 구현하며, 서비스의 아이덴티티를 강화하는 시각적 요소를 더합니다.</p>
                    </li>
                </ol>
            </section>
            <section className="about__section4">
                <h2 className="tit1">PROVEN<br />PROJECT DELIVERY</h2>
                <h3 className="tit2">7+ Years of Experience</h3>
                <div className="box">
                    <h4>Total<br />Contributions:</h4>
                    <div className="count"><span>4</span><span>5</span></div>
                    <p>Focusing more on future<br />achievements than past numbers.</p>
                </div>
            </section>
            <section className="about__section5">
                <h2 className="tit1">TECHNICAL<br />PROFICIENCY</h2>
                <div className="tbl">
                    <dl className="tbl__tr">
                        <dt>Core</dt>
                        <dd>HTML5, CSS3, SCSS</dd>
                    </dl>
                    <dl className="tbl__tr">
                        <dt>Script</dt>
                        <dd>JavaScript, jQuery</dd>
                    </dl>
                    <dl className="tbl__tr">
                        <dt>Interactive</dt>
                        <dd>GSAP, ScrollTrigger</dd>
                    </dl>
                    <dl className="tbl__tr">
                        <dt>Modern</dt>
                        <dd>React, TypeScript</dd>
                    </dl>
                    <dl className="tbl__tr">
                        <dt>Tools</dt>
                        <dd>Photoshop, Figma, Git</dd>
                    </dl>
                </div>
            </section>
            <section className="about__section6">
                    <h2 className="tit">Evolving Excellence: <br />Ready for the Next Chapter</h2>
                    <p className="txt">과거의 성과에 안주하지 않고 React와 TypeScript로 무장하여 더 높은 기준을 향해 나아갑니다. </p>     
            </section>
        </main>
    )

};
export default About;