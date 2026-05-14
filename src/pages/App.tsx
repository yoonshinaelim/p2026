import { HashRouter, Routes, Route } from 'react-router-dom'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from './Main';
import About from './About';
import Experience from './Experience';
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
                        <Route path="/About" element={<About />} />
                        <Route path="/Experience" element={<Experience />} />
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