import { HashRouter, Routes, Route } from 'react-router-dom'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from './Main';
import MainNew from './MainNew';
import About from './About';
import Experience from './Experience';
import Experience2 from './Experience2';
import Contact from './Contact';
import ExpPage from './ExpPage';
import ScrollToTop from '../components/ScrollToTop';

function App() {
    return (
        <HashRouter>
            <ScrollToTop />
            <div id="app" className="App">
                <article id="wrap">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/MainNew" element={<MainNew />} />
                        <Route path="/About" element={<About />} />
                        <Route path="/Experience" element={<Experience />} />
                        <Route path="/Experience2" element={<Experience2 />} />
                        <Route path="/Experience/:id" element={<ExpPage />} />
                        <Route path="/Contact" element={<Contact />} />
                    </Routes>
                    <Footer />
                </article>
            </div> 
        </HashRouter>
    )
}
export default App;