import { useEffect, useRef } from 'react';
import { ContactForm } from "../components/ContactForm";
import gsap from 'gsap';

const Contact = () => {
    return (
        <main className="contact round">
            <div className="contact__title">
                <h2 className="tit">
                    Let's<br />connect
                  </h2>
                <p className="txt">Open for new opportunities<br /> and meaningful collaborations.</p>
            </div>
            <div className="contact__form">
                 <ContactForm />
            </div>
        </main>
    )

};
export default Contact;