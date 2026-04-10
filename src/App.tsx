

function App() {
    return (
        <div id="app" className="App">
            <article id="wrap">
                <header className="header">
                    <h1 className="header__home"><a href="./">윤신애림.</a></h1>
                    <button type="button" id="btn-menu" className="header__menu" aria-label="메뉴 열기" aria-expanded><span className="hidden">메뉴버튼</span></button>
                    <nav id="nav-list" className="nav">
                        <ul className="nav__list">
                            <li><a href="about.html">about</a></li>
                            <li><a href="work.html">experience</a></li>
                            <li><a href="contact.html">contact</a></li>
                        </ul>
                    </nav>
                </header>
                <main className="main">
                    <section className="main__section1">
                        <div className="box">
                            <h2 className="box__tit">webpublisher</h2>
                                <p className="box__txt"><span className="underline"><u>Minimalist Code,</u></span><span className="br underline"><u>Maximum Impact.</u></span></p>
                                <a href="#none" className="box__btn">view more</a>
                            </div>
                    </section>
                    <section className="main__section2">
                        <ul className="lst_keyword left">
                            <li>EXPERIENCED</li>
                            <li>ESSENTIAL</li>
                            <li>EVOLVING</li>
                            <li>EXPERIENCED</li>
                            <li>ESSENTIAL</li>
                            <li>EVOLVING</li>
                        </ul>
                        <ul className="lst_keyword right">
                            <li>EXPERIENCED</li>
                            <li>ESSENTIAL</li>
                            <li>EVOLVING</li>
                            <li>EXPERIENCED</li>
                            <li>ESSENTIAL</li>
                            <li>EVOLVING</li>
                        </ul>
                        <div className="circle">
                            <div className="circle2"></div>
                        </div>
                        <p className="txt1">유행은 변해도<br />본질은 변하지 않는,<br />7년의 단단한 중심</p>
                        <p className="txt2">디자인의 의도를 이해하고,<br />견고한 코드로<br />그 가치를 증명합니다.</p>
                        <p className="txt3">한 땀 한 땀<br />정교하게  다듬어온 감각으로,<br />변치 않는 사용자 경험을<br />빚어냅니다.</p>
                    </section>
                    <section className="main__section3">
                        <h2 className="tit">Good Code,<br />Better Connection</h2>
                        <p className="txt">디자인을 진심으로 이해하는 퍼블리셔를 찾고 계신가요?</p>
                        <a href="#none" className="btn"><span className="hidden">CONTACT 페이지로 이동</span></a>
                    </section>
                    <section className="main__section4">
                        <h2 className="tit">Project Archive</h2>
                        <ul className="lst_project">
                            <li><a href="#none"></a></li>
                            <li><a href="#none"></a></li>
                            <li><a href="#none"></a></li>
                            <li><a href="#none"></a></li>
                            <li><a href="#none"></a></li>
                            <li><a href="#none"></a></li>
                            <li><a href="#none"></a></li>
                            <li><a href="#none"></a></li>
                        </ul>
                    </section>
                </main>
                <footer className="footer">
                    <dl className="footer__info">
                        <dt>phone</dt>
                        <dd>010 7370 4505</dd>
                        <dt>email</dt>
                        <dd>ysal91@naver.com</dd>
                    </dl>
                    <p className="footer__copy">&copy;2026 윤신애림.</p>
                </footer>
            </article>
        </div> 
    )
  }
  export default App
