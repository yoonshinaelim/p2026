import { useNavigate } from 'react-router-dom';
import { experienceData, ExperienceItem } from '../data/experienceData';

const Main = () => {
    const navigate = useNavigate();
    const handleNavigate = (id: number) => {
      navigate(`/experience/${id}`);
    };
    const reversedData = [...experienceData].reverse();
    const recentProjects = reversedData.slice(0, 10);

    return (
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
                <a href="#none" className="btn"><span className="visually-hidden">CONTACT 페이지로 이동</span></a>
            </section>
            <section className="main__section4">
                <h2 className="tit">Project Archive</h2>
                <ul className="lst_project">
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
            </section>
        </main>
    )
  }
  export default Main;
