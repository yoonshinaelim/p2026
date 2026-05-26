import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { experienceData, ExperienceItem } from '../data/experienceData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable'; // 💡 Draggable 임포트

const Main = () => {
    const navigate = useNavigate();
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const imageInnerRef = useRef<HTMLDivElement | null>(null);
    const section2Ref = useRef<HTMLElement | null>(null);    
    const txt1Ref = useRef<HTMLParagraphElement | null>(null);
    const txt2Ref = useRef<HTMLParagraphElement | null>(null);
    const txt3Ref = useRef<HTMLParagraphElement | null>(null);
    const circleRef = useRef<HTMLDivElement | null>(null);
    const keywordLeftRef = useRef<HTMLUListElement | null>(null);
    const keywordRightRef = useRef<HTMLUListElement | null>(null);
    const section3TitRef = useRef<HTMLHeadingElement | null>(null);
    const section3TextRef = useRef<HTMLElement | null>(null);
    const section3BtnRef = useRef<HTMLElement | null>(null);
    const section4TitRef = useRef<HTMLElement | null>(null);
    const section4Ref = useRef<HTMLElement | null>(null);
    const section1Title = 'webpublisher';
    const section3Title = 'Pixel Perfect';
    const section4Title = 'Projects';
    // 💡 HTMLUListElement 타입으로 정교하게 지정
    const lstProjectRef = useRef<HTMLUListElement | null>(null);

    const handleNavigate = (id: number) => {
      navigate(`/experience/${id}`);
    };
    const reversedData = [...experienceData].reverse();
    const recentProjects = reversedData.slice(0, 10);

    useEffect(() => {
      // 💡 두 플러그인 모두 등록
      gsap.registerPlugin(ScrollTrigger, Draggable);

      const chars = titleRef.current?.querySelectorAll<HTMLSpanElement>('.title-letter');
      const imageInner = imageInnerRef.current;
      const section2 = section2Ref.current;
      const keywordLeft = keywordLeftRef.current;
      const keywordRight = keywordRightRef.current;
      const txt1 = txt1Ref.current;
      const txt2 = txt2Ref.current;
      const txt3 = txt3Ref.current;
      const circle = circleRef.current;
      const section3Tit = section3TitRef.current;
      const section3Chars = section3Tit?.querySelectorAll<HTMLSpanElement>('.title-letter');
      const section3Text = section3TextRef.current;
      const section3Btn = section3BtnRef.current;
      const section4Tit = section4TitRef.current;
      const section4Chars = section4Tit?.querySelectorAll<HTMLSpanElement>('.title-letter');
      const section4 = section4Ref.current;
      const lstProject = lstProjectRef.current;
      
      if (!chars?.length || !imageInner || !section2 || !keywordLeft || !keywordRight || !txt1 || !txt2 || !txt3 || !circle || !section3Tit || !section3Chars?.length || !section3Text || !section3Btn || !section4Tit || !section4Chars?.length || !section4 || !lstProject) return;

      // --- Section 1 애니메이션 ---
      const tl = gsap.timeline();
      tl.set(chars, { opacity: 0, y: 50 });
      tl.set(imageInner, { opacity: 0, scale: 0 });
      tl.to(chars, {opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05});
      tl.to(imageInner, {opacity: 1, scale: 1, duration: 0.6,ease: 'power2.out'}, '>-0.2');

      // --- Section 2 애니메이션 (Pin & 가로 이동) ---
      const sectionPin = ScrollTrigger.create({
        trigger: section2,
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
      });

      const keywordLeftTween = gsap.to(keywordLeft, {
        xPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: section2,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      const keywordRightTween = gsap.to(keywordRight, {
        xPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: section2,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      const circleScaleTween = gsap.to(circle, {
        scale: 35,
        transformOrigin: 'center center',
        ease: 'none',
        scrollTrigger: {
          trigger: section2,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      const txtTween = gsap.timeline({
        scrollTrigger: {
          trigger: section2,
          start: 'top top',
          end: '+=2000',
          scrub: true,
        },
      });
      txtTween.fromTo(txt1, { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
        .to(txt1, { opacity: 0, y: -30 })
        .fromTo(txt2, { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
        .to(txt2, { opacity: 0, y: -30 })
        .fromTo(txt3, { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
        .to(txt3, { opacity: 0, y: -30 });

      // --- Section 3 애니메이션 ---
      const section3Tween = gsap.timeline({
        scrollTrigger: {
          trigger: section3Tit,
          start: 'top 90%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        },
      });
      section3Tween.fromTo(section3Chars, { opacity: 0, y: 50 },{ opacity: 1, y: 0, ease: 'power2.out', stagger: 0.05 })
      .fromTo(section3Text, { opacity: 0, y: 50 },{ opacity: 1, y: 0, ease: 'power2.out', stagger: 0.05 })
      .fromTo(section3Btn, { opacity: 0, y: 50 },{ opacity: 1, y: 0, ease: 'power2.out', stagger: 0.05 });

      // --- Section 4 애니메이션 (ScrollTrigger + Draggable 동기화) ---
      const section4Tween = gsap.timeline({
        scrollTrigger: {
          trigger: section4Tit,
          start: 'top 50%',
          end: 'bottom top',
          toggleActions: 'play none none none',
        },
      });
      section4Tween.fromTo(section4Chars, { opacity: 0, y: 50 },{ opacity: 1, y: 0, ease: 'power2.out', stagger: 0.05 });

      // 전체 스크롤 영역에서 리스트가 완전히 왼쪽 끝까지 도달하도록 계산
      const containerWidth = section4.offsetWidth;
      const totalWidth = lstProject.scrollWidth;
      const maxMove = -(totalWidth - containerWidth);

      // 1) 가로 움직임 ScrollTrigger 생성
      const lstProjectST = ScrollTrigger.create({
        trigger: section4,
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
        scrub: true,
        animation: gsap.fromTo(lstProject, { x: 0 }, { x: maxMove, ease: 'none' }),
        invalidateOnRefresh: true, // 브라우저 창 리사이즈 대응
      });

      // 2) Draggable 인스턴스 연동
      const dragProxy = document.createElement('div'); // 가상의 프록시 엘리먼트 활용
      const projectDrag = Draggable.create(dragProxy, {
        type: 'x',
        trigger: '#my-swiper', // 실제 드래그 이벤트를 감지할 영역
        bounds: { minX: maxMove, maxX: 0 },
        dragClickables: false, // 카드 클릭 이동 유지
        onPress: function() {
          // 드래그가 시작될 때 현재 스크롤 진행 상황을 프록시 위치에 초기화
          gsap.set(dragProxy, { x: lstProjectST.scrollAnimation?.vars.x * lstProjectST.progress });
        },
        onDrag: function() {
          // 드래그 양에 비례해서 실제 페이지 스크롤 위치를 동기화 이동
          const progress = this.x / maxMove;
          const scrollPos = lstProjectST.start + (lstProjectST.end - lstProjectST.start) * progress;
          window.scrollTo(0, scrollPos);
        }
      });

      return () => {
        sectionPin.kill();
        keywordLeftTween.scrollTrigger?.kill();
        keywordRightTween.scrollTrigger?.kill();
        circleScaleTween.scrollTrigger?.kill();
        txtTween.scrollTrigger?.kill();
        section3Tween.scrollTrigger?.kill();
        section4Tween.scrollTrigger?.kill();
        lstProjectST.kill(); // 수정된 가로스크롤 트리거 해제
        if (projectDrag[0]) projectDrag[0].kill(); // 드래그 해제
      };
    }, [recentProjects]); // 데이터 변화 대응

    return (
        <main className="main round">
            <section className="main__section1">
                <h2 className="title" ref={titleRef}>
                  {section1Title.split('').map((char, index) => (
                    <span key={index} className="title-letter">
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h2>
                <div className="img_bird">
                  <div className="img_bird_inner" ref={imageInnerRef}><span className="visually-hidden">Bird Image</span></div>
                </div>
                <div className="box">
                    <p className="box__txt"><span className="underline"><u>Minimalist Code,</u></span><br /><span className="underline"><u>Maximum Impact.</u></span></p>
                    <button type="button" className="box__btn" onClick={() => navigate('/Experience')}>view more</button>
                </div>
            </section>
            
            <section className="main__section2" ref={section2Ref}>
                <ul className="lst_keyword left" ref={keywordLeftRef}>
                    <li>EXPERIENCED</li><li>ESSENTIAL</li><li>EVOLVING</li>
                    <li>EXPERIENCED</li><li>ESSENTIAL</li><li>EVOLVING</li>
                    <li>EXPERIENCED</li><li>ESSENTIAL</li><li>EVOLVING</li>
                </ul>
                <ul className="lst_keyword right" ref={keywordRightRef}>
                    <li>EXPERIENCED</li><li>ESSENTIAL</li><li>EVOLVING</li>
                    <li>EXPERIENCED</li><li>ESSENTIAL</li><li>EVOLVING</li>
                    <li>EXPERIENCED</li><li>ESSENTIAL</li><li>EVOLVING</li>
                </ul>
                <div className="circle" ref={circleRef}>
                    <div className="circle2"></div>
                </div>
                <p className="txt1" ref={txt1Ref}>유행은 변해도<br />본질은 변하지 않는,<br />7년의 단단한 중심</p>
                <p className="txt2" ref={txt2Ref}>디자인의 의도를 이해하고,<br />견고한 코드로<br />그 가치를 증명합니다.</p>
                <p className="txt3" ref={txt3Ref}>한 땀 한 땀<br />정교하게 다듬어온 감각으로,<br />변치 않는 사용자 경험을<br />빚어냅니다.</p>
            </section>
            
            <section className="main__section3">
                <h2 className="tit" ref={section3TitRef}>
                  {section3Title.split('').map((char, index) => (
                    <span key={`l1-${index}`} className="title-letter">
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h2>
                <p className="txt" ref={section3TextRef}>디자인을 진심으로 이해하는 <span className="br"></span>퍼블리셔를 찾고 계신가요?</p>
                <button type="button" className="btn" onClick={() => navigate('/Contact')} ref={section3BtnRef}>
                    <span className="visually-hidden">CONTACT 페이지로 이동</span>
                </button>
            </section>
            
            <section className="main__section4" ref={section4Ref}>
                <h2 className="tit" ref={section4TitRef}>
                  {section4Title.split('').map((char, index) => (
                    <span key={index} className="title-letter">
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h2>
                {/* 💡 class -> className 수정 */}
                <div id="my-swiper" className="swiper-container">
                    <ul className="lst_project" ref={lstProjectRef}>
                      {recentProjects.map((item: ExperienceItem) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => handleNavigate(item.id)}
                            style={{
                              backgroundImage: `url(${new URL(`../assets/exp/list/bg${item.id}.jpg`, import.meta.url).href})`,
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
                        </li>
                      ))}
                    </ul>
                </div>
            </section>
        </main>
    )
  }
  export default Main;