import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // navigate 누락 방지
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MainNew = () => {
    const navigate = useNavigate();
    const [isMobileView, setIsMobileView] = useState<boolean>(false);
    
    // 💡 수많은 Ref를 하나의 객체로 묶어 관리합니다.
    const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
    const elementsRef = useRef<{ [key: string]: HTMLElement | null }>({});

    
    const targetNumbers = [4, 4]; 
    const digits = Array.from({ length: 10 }, (_, i) => i);

    useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateView = () => setIsMobileView(mediaQuery.matches);
    updateView();
    mediaQuery.addEventListener?.('change', updateView);

    // 💡 gsap.context를 사용해 컴포넌트 범위 내 GSAP 리소스 관리
    const ctx = gsap.context(() => {

        // Section 1: Intro
        
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
            
            // 💡 end 지점을 'bottom top' 대신 '+=400%'로 변경!
            gsap.to(elementsRef.current['keywordLeft'], { 
                xPercent: -25, 
                ease: 'none', // scrub에는 ease보다 'none'을 써야 스크롤에 맞춰 일정하게 움직여
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
                { 
                    opacity: 0, 
                    y: 30 
                }, 
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
            gsap.fromTo(btns, {opacity: 0, y: 30}, {opacity: 1, y: 0, ease: 'power2.out', stagger: 0.1, scrollTrigger: {trigger: sec6, start : 'top 40%', toggleActions: 'play none none reverse'} });
        }
    }); // 💡 context 끝

    // 💡 클린업 함수
    return () => {
        mediaQuery.removeEventListener?.('change', updateView);
        ctx.revert(); // GSAP 관련 모든 애니메이션, ScrollTrigger 완벽 원복 & 메모리 해제!
    };
}, []);

    return (
        <main className="mainNew">
            <section className='mainNew__section1' ref={el => { sectionsRef.current['section1'] = el }}>
                <div className="box">
                    <h2 className="title">웹퍼블리셔 윤신애림</h2>
                    <p className="text">함께 일할 사람을 찾고 계신가요?<br/>준비된 감각과 실력으로 팀의 기대를 확신으로 바꿔드릴게요.</p>
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
                <h2 className="title1">다채로운 사이트 제작으로 다져진<br />유연함과 트렌디한 구현력</h2>
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
                    <h2 className="title1">탄탄한 기본기의 UI·UX 퍼블리셔</h2>
                    <div className="btnBox">
                        <button type="button" className="btn" ref={el => { elementsRef.current['btnWorks'] = el }} onClick={() => navigate('/Experience')} >WORKS</button>
                        <button type="button" className="btn" ref={el => { elementsRef.current['btnContact'] = el }} onClick={() => navigate('/Contact')} >CONTACT</button>
                    </div>
                </div>
            </section>
        </main>
    )
};

export default MainNew;