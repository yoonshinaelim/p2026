import { experienceData, ExperienceItem } from '../data/experienceData';

const Experience: React.FC = () => {
    return (
      <main className="experience">
        <h2 className="title">EXPERIENCE</h2>
        <ul className="list">
          {experienceData.map((item: ExperienceItem) => (
            <li key={item.id}>
              <button type="button" 
                style={{
                    backgroundImage: `url(../assets/exp/list${item.id}.jpg)`,
                    // backgroundRepeat: 'no-repeat',
                    // backgroundPosition: 'center',
                    // backgroundSize: 'cover'
                }}
              >
                <span className="title">{item.title1}</span>
              </button>
            </li>
          ))}
        </ul>
      </main>
    );
  };
export default Experience;