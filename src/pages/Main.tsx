import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData, ExperienceItem } from '../data/experienceData';

const MainNew = () => {
    const navigate = useNavigate();
    const [isMobileView, setIsMobileView] = useState<boolean>(false);
    
    // 수많은 Ref를 하나의 객체로 묶어 관리
    const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
    const elementsRef = useRef<{ [key: string]: any }>({});

    const targetNumbers = [4, 4]; 
    const digits = Array.from({ length: 10 }, (_, i) => i);

    // Section 4-2용 최근 10개 데이터 추출
    const visibleWorksData = [...experienceData].reverse().slice(0, 10);

    // 마우스 호버 일시정지 / 재생 핸들러
    const handleMouseEnter = () => {
        elementsRef.current['tickerTween']?.pause();
    };

    const handleMouseLeave = () => {
        elementsRef.current['tickerTween']?.play();
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // gsap.context 및 gsap.matchMedia를 사용해 반응형 및 리소스 관리
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // 반응형 미디어쿼리별 애니메이션 정의 (1024px 기준)
            mm.add({
                isMobile: "(max-width: 1024px)",
                isDesktop: "(min-width: 1025px)"
            }, (context) => {
                const { isMobile } = context.conditions as { isMobile: boolean };
                
                // Section 1: Intro
                const sec1 = sectionsRef.current['section1'];
                if (sec1) {
                    const icons = Array.from(sec1.querySelectorAll('.icon'));
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: sec1,
                            start: 'top top',
                            end: '+=200%',
                            pin: true,
                            pinSpacing: true,
                            invalidateOnRefresh: true,
                            scrub: 1
                        }
                    });

                    // 모바일(1024이하)은 상하(y), 데스크톱은 좌우(xPercent) 이동
                    if (isMobile) {
                        tl.to(elementsRef.current['left'], { y: -50, ease: 'none', duration: 0.2 }, 0)
                          .to(elementsRef.current['right'], { y: 50, ease: 'none', duration: 0.2 }, 0);
                    } else {
                        tl.to(elementsRef.current['left'], { xPercent: -20, ease: 'none', duration: 0.2 }, 0)
                          .to(elementsRef.current['right'], { xPercent: 20, ease: 'none', duration: 0.2 }, 0);
                    }

                    let currentTime = 0.2; 
                    icons.forEach((icon, index) => {
                        tl.fromTo(icon,
                            { scale: 0, opacity: 0 },
                            { scale: 1, opacity: 1, ease: 'back.out(1.7)', duration: 0.3 },
                            currentTime
                        );

                        if (index < icons.length - 1) {
                            tl.to(icon,
                                { scale: 0, opacity: 0, ease: 'power1.in', duration: 0.2 },
                                currentTime + 0.4 
                            );
                        }
                        currentTime += 0.5; 
                    });
                }
            });

            // Section 2: Pin & Text Twist
            const sec2 = sectionsRef.current['section2'];
            if (sec2) {
                ScrollTrigger.create({ 
                    trigger: sec2, 
                    start: 'top top', 
                    end: '+=400%', 
                    pin: true, 
                    pinSpacing: true 
                });
                
                gsap.to(elementsRef.current['keywordLeft'], { 
                    xPercent: -25, 
                    ease: 'none', 
                    scrollTrigger: { 
                        trigger: sec2, 
                        start: 'top top', 
                        end: '+=400%', 
                        scrub: 1 
                    } 
                });

                gsap.to(elementsRef.current['keywordRight'], { 
                    xPercent: 25, 
                    ease: 'none', 
                    scrollTrigger: { 
                        trigger: sec2, 
                        start: 'top top', 
                        end: '+=400%', 
                        scrub: 1 
                    } 
                });

                const txtTl = gsap.timeline({ 
                    scrollTrigger: { 
                        trigger: sec2, 
                        start: 'top top', 
                        end: '+=400%', 
                        scrub: 1
                    } 
                });

                ['txt1', 'txt2', 'txt3'].forEach(key => {
                    if (elementsRef.current[key]) {
                        txtTl.fromTo(elementsRef.current[key], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
                            .to(elementsRef.current[key], { opacity: 1, y: 0, duration: 1.5 })
                            .to(elementsRef.current[key], { opacity: 0, y: -30, duration: 1 });
                    }
                });
            }

            // Section 3: List Scroll Fade-In
            const sec3 = sectionsRef.current['section3'];
            const listItems = sec3?.querySelectorAll('.list > li');

            if (sec3 && listItems?.length) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sec3,
                        start: 'top 50%',  
                        end: 'bottom 40%', 
                        scrub: 1         
                    }
                });
                tl.fromTo(listItems, 
                    { opacity: 0, y: 100 }, 
                    { 
                        opacity: 1, 
                        y: 0, 
                        stagger: 0.25, 
                        ease: 'power1.out',
                        scrub: 1
                    }
                );
            }

            // Section 4: Slot Machine
            const sec4 = sectionsRef.current['section4'];
            if (sec4) {
                const sec4Chars = sec4.querySelectorAll('.title-letter');
                const box = elementsRef.current['section4box'];

                const tl = gsap.timeline({ scrollTrigger: { trigger: sec4, start: 'top 60%', toggleActions: 'play none none reverse' } });
                tl.fromTo([sec4Chars, box], { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out', stagger: 0.05 });

                const setupSlot = (idx: number, duration: number, repeat: number) => {
                    const col = sec4.querySelector(`.slot-column:nth-child(${idx + 1})`);
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
            }

            // Section 4-2: Works Ticker Infinite Scroll
            const tickerTrack = elementsRef.current['tickerTrack'];
            if (tickerTrack) {
                elementsRef.current['tickerTween'] = gsap.to(tickerTrack, {
                    xPercent: -50,
                    repeat: -1,
                    duration: 40, 
                    ease: 'none'
                });
            }

            // Section 5: Skills List
            const sec5 = sectionsRef.current['section5'];
            const skills = sec5?.querySelectorAll('.skill > li');
            if (sec5 && skills?.length) {
               const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sec5,
                    start: 'top 30%',
                    end: 'bottom 80%',
                    scrub: 1
                } 
               });

                tl.fromTo(skills, 
                    { opacity: 0, y: 30 }, 
                    { 
                        opacity: 1, 
                        y: 0, 
                        stagger: 0.25, 
                        ease: 'power1.out',
                        scrub: 1
                    }
                );
            }

            // Section 6: Btn Slide-Up
            const sec6 = sectionsRef.current['section6'];
            const btns = sec6?.querySelectorAll('.btn');
            if(sec6 && btns?.length){
                gsap.fromTo(btns, {opacity: 0, y: 30}, {opacity: 1, y: 0, ease: 'power2.out', scrollTrigger: {trigger: sec6, start : 'top 30%', toggleActions: 'play none none reverse'} });
            }
        });

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <main className="mainNew">
            <section className='mainNew__section1' ref={el => { sectionsRef.current['section1'] = el }}>
                <div className="box">
                    <h2 className="title"><span ref={el => { elementsRef.current['left'] = el }}>웹퍼블리셔</span> <span ref={el => { elementsRef.current['right'] = el }}>윤신애림</span>
                        <span className="icon type1"><span className="visually-hidden">안녕하세요</span></span>
                        <span className="icon type2"><span className="visually-hidden">코딩하는 여자</span></span>
                        <span className="icon type4"><span className="visually-hidden">윤신애림입니다</span></span>
                    </h2>
                    <p className="text">함께 일할 사람을 찾고 계신가요?<br/>준비된 감각과 실력으로 <span className="br"></span>팀의 기대를 확신으로 바꿔드릴게요.</p>
                </div>
            </section>
            <section className="mainNew__section2" ref={el => { sectionsRef.current['section2'] = el }}>
                {['left', 'right'].map(dir => (
                    <ul key={dir} className={`lst_keyword ${dir}`} ref={el => { elementsRef.current[`keyword${dir === 'left' ? 'Left' : 'Right'}`] = el }}>
                        {Array(5).fill(['EXPERIENCED', 'ESSENTIAL', 'EVOLVING']).flat().map((txt, i) => <li key={i}>{txt}</li>)}
                    </ul>
                ))}
                <div className="circle" ref={el => { elementsRef.current['circle'] = el }}><div className="circle2"></div></div>
                <p className="txt1" ref={el => { elementsRef.current['txt1'] = el }}>디자인의 의도를<br />자연스럽게 녹여내는 퍼블리싱</p>
                <p className="txt2" ref={el => { elementsRef.current['txt2'] = el }}>최신 스택을 활용한<br />완성도 높은 웹 환경 구축</p>
                <p className="txt3" ref={el => { elementsRef.current['txt3'] = el }}>사용자 경험을 완성하는<br />집요한 디테일</p>
            </section>

            <section className="mainNew__section3" ref={el => { sectionsRef.current['section3'] = el }}>
                <span className="en_title">Why Me</span>
                <h2 className="title1">대체될 수 없는<br />한 끗 차이의 깊이</h2>
                <ul className="list">
                    <li><span className="visually-hidden">kb국민은행</span></li>
                    <li><span className="visually-hidden">현대카드</span></li>
                    <li><span className="visually-hidden">SC제일은행</span></li>
                    <li><span className="visually-hidden">신한카드</span></li>
                    <li><span className="visually-hidden">롯데카드</span></li>
                </ul>
            </section>

            <section className="mainNew__section4" ref={el => { sectionsRef.current['section4'] = el }}>
                <span className="en_title">The Reason</span>
                <h2 className="title1">다채로운 제작 경험,<br />유연하고 감각적인 구현</h2>
                <div className="box" ref={el => { elementsRef.current['section4box'] = el }}>
                    <span className="slot_title">누적 프로젝트 : </span>
                    <div className="count_box">
                        <div className="count">
                            {targetNumbers.map((_, index) => (
                                <div key={index} className="slot-column">
                                    {digits.map(num => <span key={num} className="slot-number">{num}</span>)}
                                </div>
                            ))}
                        </div>
                        <span className="plus">+</span>
                    </div>
                </div>
            </section>

            {/* Section 4-2: WORKS Infinite Ticker */}
            <section className="mainNew__section4-2" ref={el => { sectionsRef.current['section4-2'] = el }}>
                <div 
                    className="ticker_wrap"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <ul className="ticker_track" ref={el => { elementsRef.current['tickerTrack'] = el }}>
                        {[...visibleWorksData, ...visibleWorksData].map((item: ExperienceItem, index: number) => {
                            const isTargetId = [7, 11, 23].includes(item.id);
                            
                            let imgSrc = '';
                            try {
                                imgSrc = new URL(`../assets/exp/list/bg${item.id}.jpg`, import.meta.url).href;
                            } catch (e) {
                                console.error("Image load error for id:", item.id);
                            }

                            return (
                                <li key={`${item.id}-${index}`} className="ticker_item">
                                    <div className="button_box">
                                        <button type="button" onClick={() => navigate(`/experience/${item.id}`)}>
                                            {imgSrc && (
                                                <img
                                                    src={imgSrc}
                                                    alt={item.title1}
                                                />
                                            )}
                                            {!isTargetId && (
                                                <span className="info_box">
                                                    <strong className="tit1">{item.title1}</strong>
                                                    <span className="tit2">{item.title2}</span>
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            <section className="mainNew__section5" ref={el => { sectionsRef.current['section5'] = el }}>
                <span className="en_title">The Skill</span>
                <h3 className="title1">이런 업무 가능해요!</h3>
                <ol className="skill">
                    {[
                        { title: "React · TypeScript 기반 UI 퍼블리싱", desc: "React와 TypeScript 환경에서 재사용 가능한 UI 컴포넌트를 작성하고, 반응형 인터랙티브 화면을 구현합니다." },
                        { title: "UI 구현 및 웹 퍼블리싱", desc: "Figma를 활용해 디자인 요소를 정확히 분석하고, 웹 표준과 접근성을 준수한 인터랙티브 화면을 구현합니다." },
                        { title: "협업 및 버전 관리", desc: "Git/GitHub으로 코드를 체계적으로 관리하며, Jira를 활용해 일정을 관리하고 원활하게 소통합니다." }
                    ].map((item, i) => (
                        <li key={i}><span>0{i+1}</span><h3>{item.title}</h3><p>{item.desc}</p></li>
                    ))}
                </ol>
            </section>

            <section className="mainNew__section6" ref={el => { sectionsRef.current['section6'] = el }}>
                <div className="bg">
                    <p className="txt" ref={el => { elementsRef.current['section6Text'] = el }}>아이디어를 현실로 만드는 인터랙션</p>
                    <h2 className="title1">탄탄한 기본기의<span className="br"></span> UI·UX 퍼블리셔</h2>
                    <div className="btnBox">
                        <button type="button" className="btn" ref={el => { elementsRef.current['btnWorks'] = el }} onClick={() => navigate('/Experience')} >WORKS</button>
                        <button type="button" className="btn" ref={el => { elementsRef.current['btnContact'] = el }} onClick={() => navigate('/Contact')} >CONTACT</button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default MainNew;