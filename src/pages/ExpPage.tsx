
import { experienceData, ExperienceItem } from '../data/experienceData';

const ExpPage: React.FC = () => {
    return (
        <main className="ExpPage">
            {experienceData.map((item: ExperienceItem) => (
                <React.Fragment key={item.id}>
                    <h2 className="title">{item.title1}</h2>
                    <h3 className="title2">{item.title2}</h3>
                    <ul className="info">
                        <li><strong>company</strong>{item.company}</li>
                        <li><strong>launch</strong>{item.period}</li>
                    </ul>
                    <div className="img"></div>
                    <p className="description">{item.description}</p>
                </React.Fragment>
            ))}
        </main>
    )

};
export default ExpPage;