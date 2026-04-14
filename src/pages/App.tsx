
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from './Main';
import About from './About';
import Experience from './Experience';
import Contact from './Contact';

function App() {
    return (
        <BrowserRouter>
            <div id="app" className="App">
                <article id="wrap">
                <Header />
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/About" element={<About />} />
                        <Route path="/Experience" element={<Experience />} />
                        <Route path="/Contact" element={<Contact />} />
                        <Route path="*" element={<div>페이지를 찾을 수 없습니다!</div>} />
                    </Routes>
                <Footer />
                </article>
            </div> 
        </BrowserRouter>
    )
  }
  export default App
