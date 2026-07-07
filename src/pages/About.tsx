import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // navigate 누락 방지
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {
    const navigate = useNavigate();
    const [isMobileView, setIsMobileView] = useState<boolean>(false);
    
    // 💡 수많은 Ref를 하나의 객체로 묶어 관리합니다.
    const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
    const elementsRef = useRef<{ [key: string]: HTMLElement | null }>({});

    const sectionTitle = "윤신애림.";
    const section4Title = ["PROVEN", "DELIVERY"];
    const section5Title = ["TECHNICAL", "PROFICIENCY"];
    const section6Title = 'Pixel Perfect';
    
    const targetNumbers = [4, 4]; 
    const digits = Array.from({ length: 10 }, (_, i) => i);

    const scrollToSection = () => {
        sectionsRef.current['section2']?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        // 미디어 쿼리 설정
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const updateView = () => setIsMobileView(mediaQuery.matches);
        updateView();
        mediaQuery.addEventListener?.('change', updateView);

        // --- GSAP 애니메이션 빌드 함수들 ---
        
        // Section 1: Intro
        const initSection1 = () => {
            const chars = sectionsRef.current['section1']?.querySelectorAll('.title-letter');
            if (chars?.length) {
                gsap.fromTo(chars, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.1 });
            }
        };

        // Section 2: Pin & Text Twist
        const initSection2 = () => {
            const sec = sectionsRef.current['section2'];
            if (!sec) return [];

            const pin = ScrollTrigger.create({ trigger: sec, start: 'top top', end: '+=200%', pin: true, pinSpacing: true });
            
            const kwLeft = gsap.to(elementsRef.current['keywordLeft'], { xPercent: -25, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom top', scrub: true } });
            const kwRight = gsap.to(elementsRef.current['keywordRight'], { xPercent: 25, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom top', scrub: true } });
            const circle = gsap.fromTo(elementsRef.current['circle'], { scale: 0 }, { scale: 35, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom top', scrub: true } });

            const txtTl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=2000', scrub: true } });
            ['txt1', 'txt2', 'txt3'].forEach(key => {
                txtTl.fromTo(elementsRef.current[key], { opacity: 0, y: 30 }, { opacity: 1, y: 0 }).to(elementsRef.current[key], { opacity: 0, y: -30 });
            });

            return [pin, kwLeft, kwRight, circle, txtTl];
        };

        // Section 3: Skills List
        const initSection3 = () => {
            const sec = sectionsRef.current['section3'];
            const skills = sec?.querySelectorAll('ol.skill > li');
            if (!sec || !skills?.length) return null;

            return gsap.fromTo(skills, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05, scrollTrigger: { trigger: sec, start: 'top 60%', toggleActions: 'play none none reverse' } });
        };

        // Section 4: Slot Machine Number Rolling
        const initSection4 = () => {
            const sec = sectionsRef.current['section4'];
            if (!sec) return null;

            const chars = sec.querySelectorAll('.title-letter');
            const box = elementsRef.current['section4box'];

            const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 60%', toggleActions: 'play none none reverse' } });
            tl.fromTo([chars, box], { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out', stagger: 0.05 });

            // 슬롯 머신 공통 함수
            const setupSlot = (idx: number, duration: number, repeat: number) => {
                const col = sec.querySelector(`.slot-column:nth-child(${idx + 1})`);
                if (!col) return;

                const shuffle = () => {
                    const spans = Array.from(col.children);
                    for (let i = spans.length - 1; i > 0; i--) {
                        col.appendChild(spans[Math.floor(Math.random() * (i + 1))]);
                    }
                };

                tl.fromTo(col, { y: "0rem" }, {
                    y: `-${9 * 10}rem`, duration, ease: "none", repeat,
                    onRepeat: shuffle,
                    onComplete: () => {
                        const spans = Array.from(col.children) as HTMLElement[];
                        spans.sort((a, b) => parseInt(a.textContent || '0') - parseInt(b.textContent || '0')).forEach(s => col.appendChild(s));
                        gsap.fromTo(col, { y: "0rem" }, { y: `-${targetNumbers[idx] * 10}rem`, duration: duration * 10, ease: "power4.out" });
                    }
                }, idx === 0 ? "-=0.3" : "<");
            };

            setupSlot(0, 0.12, 3);
            setupSlot(1, 0.15, 5);
            return tl;
        };

        // Section 5 & 6: Table & Footer
        const initGenericSection = (secKey: string, tableKey: string) => {
            const sec = sectionsRef.current[secKey];
            if (!sec) return null;
            return gsap.fromTo([sec.querySelectorAll('.title-letter'), elementsRef.current[tableKey]], 
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out', stagger: 0.05, scrollTrigger: { trigger: sec, start: secKey === 'section5' ? 'top 60%' : 'top 50%', toggleActions: 'play none none reverse' } }
            );
        };
        const initSection6 = () => {
            const sec = sectionsRef.current['section6'];
            if (!sec) return null;
            return gsap.fromTo([sec.querySelectorAll('.title-letter'), elementsRef.current['section6Text'], elementsRef.current['section6Btn']],
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out', stagger: 0.05, scrollTrigger: { trigger: sec, start: 'top 50%', toggleActions: 'play none none reverse' } }
            );
        };  

        // 실행 및 애니메이션 등록
        initSection1();
        const s2Tweens = initSection2();
        const s3Tween = initSection3();
        const s4Tween = initSection4();
        const s5Tween = initGenericSection('section5', 'section5table');
        const s6Tween = initSection6();

        // 💡 깔끔한 클린업 처리
        return () => {
            mediaQuery.removeEventListener?.('change', updateView);
            ScrollTrigger.getAll().forEach(t => t.kill());
            gsap.killTweensOf("*");
        };
    }, []);

    // 글자 분리 렌더러 함수화로 JSX 간소화
    const renderSplitText = (text: string) => text.split('').map((char, i) => (
        <span key={i} className="title-letter">{char === ' ' ? '\u00A0' : char}</span>
    ));

    return (
        <main className="about">
            <section className='about__section1' ref={el => { sectionsRef.current['section1'] = el }}>
                <div className="box">
                    <span className="box__tit1">about me</span>
                    <h2 className="box__tit2">{renderSplitText(sectionTitle)}</h2>
                    <button type="button" className="box__btn" onClick={scrollToSection}>VIEW MORE</button>
                </div>
            </section>

            <section className="about__section2" ref={el => { sectionsRef.current['section2'] = el }}>
                {['left', 'right'].map(dir => (
                    <ul key={dir} className={`lst_keyword ${dir}`} ref={el => { elementsRef.current[`keyword${dir === 'left' ? 'Left' : 'Right'}`] = el }}>
                        {Array(3).fill(['EXPERIENCED', 'ESSENTIAL', 'EVOLVING']).flat().map((txt, i) => <li key={i}>{txt}</li>)}
                    </ul>
                ))}
                <div className="circle" ref={el => { elementsRef.current['circle'] = el }}><div className="circle2"></div></div>
                <p className="txt1" ref={el => { elementsRef.current['txt1'] = el }}>유행은 변해도<br />본질은 변하지 않는,<br />7년의 단단한 중심</p>
                <p className="txt2" ref={el => { elementsRef.current['txt2'] = el }}>디자인의 의도를 이해하고,<br />견고한 코드로<br />그 가치를 증명합니다.</p>
                <p className="txt3" ref={el => { elementsRef.current['txt3'] = el }}>한 땀 한 땀<br />정교하게 다듬어온 감각으로,<br />변치 않는 사용자 경험을<br />빚어냅니다.</p>
            </section>

            <section className="about__section4" ref={el => { sectionsRef.current['section4'] = el }}>
                <h2 className="tit1">{section4Title.map((line, i) => <React.Fragment key={i}>{renderSplitText(line)}{i < section4Title.length - 1 && <br />}</React.Fragment>)}</h2>
                <div className="box" ref={el => { elementsRef.current['section4box'] = el }}>
                    <h4>Total<br />Contributions:</h4>
                    <p>7+ Years of Experience</p>
                    <div className="count">
                        {targetNumbers.map((_, index) => (
                            <div key={index} className="slot-column">
                                {digits.map(num => <span key={num} className="slot-number">{num}</span>)}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="about__section3" ref={el => { sectionsRef.current['section3'] = el }}>
                <ol className="skill">
                    {[
                        { title: "시멘틱 마크업 & 웹 표준", desc: "웹 표준을 준수하는 시멘틱 태그 활용으로 정보의 구조를 명확히 설계합니다. 이는 검색 엔진 최적화(SEO)를 극대화할 뿐만 아니라, 보조 공학 기기를 사용하는 사용자까지 고려한 웹 접근성 향상에 기여합니다." },
                        { title: "반응형 인터페이스 & 최적화", desc: "다양한 해상도와 디바이스 환경에 대응하는 유연한 레이아웃을 구현합니다. 미디어 쿼리와 최신 CSS 기법을 활용하여 시각적 일관성을 유지하며, 코드 효율화를 통해 로딩 속도를 개선하고 쾌적한 사용자 경험을 제공합니다." },
                        { title: "인터랙티브 모션 구현", desc: "복잡한 타임라인 기반의 애니메이션 라이브러리를 활용해 생동감 있는 사용자 인터페이스를 구축합니다. 브라우저 렌더링 원리를 이해하여 성능 저하 없는 부드러운 인터랙션을 구현하며, 서비스의 아이덴티티를 강화하는 시각적 요소를 더합니다." }
                    ].map((item, i) => (
                        <li key={i}><span>0{i+1}</span><h3>{item.title}</h3><p>{item.desc}</p></li>
                    ))}
                </ol>
            </section>

            <section className="about__section5" ref={el => { sectionsRef.current['section5'] = el }}>
                <h2 className="tit1">{section5Title.map((line, i) => <React.Fragment key={i}>{renderSplitText(line)}{i < section5Title.length - 1 && <br />}</React.Fragment>)}</h2>
                <div className="tbl" ref={el => { elementsRef.current['section5table'] = el }}>
                    {[
                        { dt: "Core", dd: "HTML5, CSS3, SCSS" }, { dt: "Script", dd: "JavaScript, jQuery" },
                        { dt: "Interactive", dd: "GSAP, ScrollTrigger" }, { dt: "Modern", dd: "React, TypeScript" },
                        { dt: "Tools", dd: "Photoshop, Figma, Git" }
                    ].map((row, i) => <dl className="tbl__tr" key={i}><dt>{row.dt}</dt><dd>{row.dd}</dd></dl>)}
                </div>
            </section>

            <section className="about__section6" ref={el => { sectionsRef.current['section6'] = el }}>
                <div className="bg">
                    <h2 className="tit">{renderSplitText(section6Title)}</h2>
                    <p className="txt" ref={el => { elementsRef.current['section6Text'] = el }}>디자인을 진심으로 이해하는 <span className="br"></span>퍼블리셔를 찾고 계신가요?</p>
                    <button type="button" className="btn" ref={el => { elementsRef.current['section6Btn'] = el }} onClick={() => navigate('/Contact')} >
                        <span className="visually-hidden">CONTACT 페이지로 이동</span>
                    </button>
                </div>
            </section>
        </main>
    )
};

export default About;