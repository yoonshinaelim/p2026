import { useParams, useNavigate } from 'react-router-dom';
import { experienceData } from '../data/experienceData';

const ExpPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const selectedItem = experienceData.find(item => item.id === Number(id));
    if (!selectedItem) {
        return (
            <div className='emptyPage'>
                <p>존재하지 않는 페이지입니다.</p>
                <button type="button" onClick={() => navigate('/Experience')}>목록으로 돌아가기</button>
            </div>
        );
    }
    const getImageUrl = (itemId: number) => {
        return new URL(`../assets/exp/page/bg${itemId}.jpg`, import.meta.url).href;
    };
    return (
        <main className="ExpPage">
            <h2 className="title1">{selectedItem.title1}</h2>
                   <h3 className="title2">{selectedItem.title2}</h3>
                   <ul className="info">
                       <li><strong>company</strong>{selectedItem.company}</li>
                       <li><strong>launch</strong>{selectedItem.period}</li>
                   </ul>
                   <p className="description">{selectedItem.description}</p>
                   <div className="img"><img src={getImageUrl(selectedItem.id)}  alt={selectedItem.title1} /></div>
                   
        </main>
    );
};

export default ExpPage;