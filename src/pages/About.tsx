
import React, { useState, useRef, useEffect } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {

    
    
    const [hoveredYear, setHoveredYear] = useState<string | null>(null);
    const [isMobileView, setIsMobileView] = useState<boolean>(false);
    const section2Ref = useRef<HTMLElement>(null);
    const section4Ref = useRef<HTMLElement>(null);
    const section5Ref = useRef<HTMLElement>(null);
    const section6Ref = useRef<HTMLElement>(null);
    const section1titleRef = useRef<HTMLHeadingElement | null>(null);
    const section4titleRef = useRef<HTMLHeadingElement | null>(null);
    const section4title2Ref = useRef<HTMLHeadingElement | null>(null);
    const section4boxRef = useRef<HTMLHeadingElement | null>(null);
    const section5titleRef = useRef<HTMLHeadingElement | null>(null);
    const section5tableRef = useRef<HTMLHeadingElement | null>(null);
    const section6titleRef = useRef<HTMLHeadingElement | null>(null);
    const section6textRef = useRef<HTMLHeadingElement | null>(null);
    const sectionTitle = "윤신애림.";
    const section4Title = ["PROVEN", "DELIVERY"];
    const section5Title = ["TECHNICAL", "PROFICIENCY"];
    const section6Title = "READY FOR NEXT";
  
    // 최종 목표 숫자 (4, 5)
    const targetNumbers = [4, 5]; 
  
    // 애니메이션 시작 여부를 관리하는 상태
    const [isAnimate, setIsAnimate] = useState(false);

    // 0부터 9까지의 배열 생성
    const digits = Array.from({ length: 10 }, (_, i) => i);
    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);
      
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      const updateView = () => setIsMobileView(mediaQuery.matches);
      const section4 = section4titleRef.current;
      const sectiontitle2 = section4title2Ref.current;
      const section4box = section4boxRef.current;
      const section5 = section5titleRef.current;
      const section5table = section5tableRef.current;
      const section6 = section6titleRef.current;
      const section6text = section6textRef.current;
      const sectionTitleChar = section1titleRef.current?.querySelectorAll<HTMLSpanElement>('.title-letter');
      const sectionTitle4Char = section4titleRef.current?.querySelectorAll<HTMLSpanElement>('.title-letter');
      const sectionTitle5Char = section5titleRef.current?.querySelectorAll<HTMLSpanElement>('.title-letter');
      const sectionTitle6Char = section6titleRef.current?.querySelectorAll<HTMLSpanElement>('.title-letter');

      if(!sectionTitleChar?.length  || !sectionTitle4Char?.length || !sectionTitle5Char?.length || !sectionTitle6Char?.length ) return;

      const tl = gsap.timeline();
      tl.set(sectionTitleChar, {opacity:0, y : 50});
      tl.to(sectionTitleChar, {opacity:1, y:0, duration: 0.4, ease:'power2.out', stagger:0.05})

      const section4Tween = gsap.timeline({
            scrollTrigger: {
                trigger: section4,         // 트리거 대상을 박스로 변경!
                start: 'top 60%',             // 박스 상단이 뷰포트의 60% 높이에 오면 실행
                end: 'bottom top',
                toggleActions: 'play none none none',
            }
        });
      section4Tween.fromTo(sectionTitle4Char, { opacity: 0, y: 50 },{ opacity: 1, y: 0, ease: 'power2.out', stagger: 0.05 });
      section4Tween.fromTo(sectiontitle2, { opacity: 0, y: 50 },{ opacity: 1, y: 0, ease: 'power2.out', stagger: 0.05 });
      section4Tween.fromTo(section4box, { opacity: 0, y: 30 },{ opacity: 1, y: 0, ease: 'power2.out', stagger: 0.05 });
         // ★ [동시 실행 + 각각 다른 속도와 랜덤 롤링 효과]
        // 첫 번째 숫자 (4) 설정: 0.12초 속도로 3바퀴 돌고 안착
        const rollDuration1 = 0.12; 
        const repeatCount1 = 3;    

        // 두 번째 숫자 (5) 설정: 0.15초 속도로 5바퀴 돌고 안착 (더 오래 굴러감)
        const rollDuration2 = 0.15; 
        const repeatCount2 = 5;    

        // 루프가 돌 때마다 내부 숫자를 뒤섞는 공통 함수
        const shuffleColumn = (column: Element) => {
            const spans = Array.from(column.children);
            for (let i = spans.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                column.appendChild(spans[j]);
            }
        };

        // 정지하기 전 원래 순서(0~9)로 복구하는 공통 함수
        const resetColumnOrder = (column: Element) => {
            const spans = Array.from(column.children) as HTMLElement[];
            spans.sort((a, b) => parseInt(a.textContent || '0') - parseInt(b.textContent || '0'));
            spans.forEach(span => column.appendChild(span));
        };

        // 메인 타임라인에 첫 번째 열 애니메이션 추가
        section4Tween.add(
            gsap.fromTo(".slot-column:nth-child(1)", 
                { y: "0rem" },
                {
                    y: `-${9 * 10}rem`, 
                    duration: rollDuration1,
                    ease: "none",
                    repeat: repeatCount1,
                    onRepeat: function() { shuffleColumn(this.targets()[0]); },
                    onComplete: function() {
                        const col = this.targets()[0];
                        resetColumnOrder(col);
                        gsap.fromTo(col, { y: "0rem" }, {
                            y: `-${targetNumbers[0] * 10}rem`,
                            duration: 1.2,
                            ease: "power4.out"
                        });
                    }
                }
            ),
            "-=0.3" // 박스 등장 애니메이션 끝나기 전에 동시 출발
        );

        // 메인 타임라인에 두 번째 열 애니메이션 추가 (같은 타이밍에 출발 시킴)
        section4Tween.add(
            gsap.fromTo(".slot-column:nth-child(2)", 
                { y: "0rem" },
                {
                    y: `-${9 * 10}rem`, 
                    duration: rollDuration2,
                    ease: "none",
                    repeat: repeatCount2, // 5바퀴로 더 많이 돌게 함
                    onRepeat: function() { shuffleColumn(this.targets()[0]); },
                    onComplete: function() {
                        const col = this.targets()[0];
                        resetColumnOrder(col);
                        gsap.fromTo(col, { y: "0rem" }, {
                            y: `-${targetNumbers[1] * 10}rem`,
                            duration: 1.5, // 멈출 때도 조금 더 묵직하게 멈춤
                            ease: "power4.out"
                        });
                    }
                }
            ),
            "<" // 바로 앞선 트윈(첫 번째 열)과 "동시에 시작"하라는 뜻의 GSAP 타임라인 기호
        );
      const section5Tween = gsap.timeline({
        scrollTrigger: {
          trigger: section5,
          start: 'top 50%',
          end: 'bottom top',
          toggleActions: 'play none none none',
        },
      });
      section5Tween.fromTo(sectionTitle5Char, { opacity: 0, y: 50 },{ opacity: 1, y: 0, ease: 'power2.out', stagger: 0.05 });
      section5Tween.fromTo(section5table, { opacity: 0, y: 30 },{ opacity: 1, y: 0, ease: 'power2.out', stagger: 0.05 });

      const section6Tween = gsap.timeline({
        scrollTrigger: {
          trigger: section6,
          start: 'top 50%',
          end: 'bottom top',
          toggleActions: 'play none none none',
        },
      });
      section6Tween.fromTo(sectionTitle6Char, { opacity: 0, y: 50 },{ opacity: 1, y: 0, ease: 'power2.out', stagger: 0.05 });   
      section6Tween.fromTo(section6text, { opacity: 0, y: 30 },{ opacity: 1, y: 0, ease: 'power2.out', stagger: 0.05 });   

      // 컴포넌트가 로드되거나, 스크롤 이벤트를 통해 이 섹션이 보일 때 실행하도록 설정 가능
    // 여기서는 컴포넌트가 마운트되고 200ms 후에 자동으로 굴러가도록 했습니다.
   

      updateView();
      mediaQuery.addEventListener?.('change', updateView);
      mediaQuery.addListener?.(updateView);
      
      return () => {
        mediaQuery.removeEventListener?.('change', updateView);
        mediaQuery.removeListener?.(updateView);
        
        section4Tween.kill();
        section5Tween.kill();
        section6Tween.kill();
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
            <section className="about__section4" ref={section4Ref}>
                <h2 className="tit1" ref={section4titleRef}>
                    {section4Title.map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                            {line.split('').map((char, charIndex) => (
                                <span key={charIndex} className="title-letter">
                                    {char === ' ' ? '\u00A0' : char}
                                </span>
                            ))}
                            {lineIndex < section4Title.length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </h2>
                <h3 className="tit2" ref={section4title2Ref}>7+ Years of Experience</h3>
                <div className="box" ref={section4boxRef}>
                    <h4>Total<br />Contributions:</h4>
                    <div className="count">
                        {targetNumbers.map((target, index) => (
                            <div key={index} className="slot-column">
                                {digits.map((num) => (
                                    <span key={num} className="slot-number">{num}</span>
                                ))}
                            </div>
                        ))}
                    </div>
                    <p>Focusing more on future<br />achievements than past numbers.</p>
                </div>
            </section>
            <section className="about__section5" ref={section5Ref}>
                <h2 className="tit1" ref={section5titleRef}>
                    {section5Title.map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                            {line.split('').map((char, charIndex) => (
                                <span key={charIndex} className="title-letter">
                                    {char === ' ' ? '\u00A0' : char}
                                </span>
                            ))}
                            {lineIndex < section5Title.length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </h2>
                <div className="tbl" ref={section5tableRef}>
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
            <section className="about__section6" ref={section6Ref}>
                    <h2 className="tit" ref={section6titleRef}>
                        {section6Title.split('').map((char, index) => (
                            <span key={index} className="title-letter">
                                {char === ' ' ? '\u00A0' : char }
                            </span>

                        ))}
                    </h2>
                    <p className="txt" ref={section6textRef}>과거의 경험에 머무르지 않고, <br />React와 TypeScript를 기반으로 더 높은 기준의 웹을 구현합니다.</p>     
            </section>
        </main>
    )

};
export default About;