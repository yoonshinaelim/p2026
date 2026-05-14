import { useNavigate } from 'react-router-dom';
import { experienceData, ExperienceItem } from '../data/experienceData';

const Experience: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (id: number) => {
      navigate(`/experience/${id}`);
  };
  const reversedData = [...experienceData].reverse();
    return (
      <main className="experience">
        <h2 className="title">EXPERIENCE</h2>
        <ul className="list">
          {reversedData.map((item: ExperienceItem) => (
            <li key={item.id}>
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
            </li>
          ))}
        </ul>
      </main>
    );
  };
export default Experience;