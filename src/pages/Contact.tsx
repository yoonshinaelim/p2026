import { useEffect, useRef } from 'react';
import { ContactForm } from "../components/ContactForm";
import gsap from 'gsap';

const Contact = () => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const contactTitleLine1 ="Let's";
    const contactTitleLine2 ="Connect";
    useEffect(() => {
        const contatctChars1 = titleRef.current?.querySelectorAll<HTMLSpanElement>('.title-letter');
        const contatctChars2 = titleRef.current?.querySelectorAll<HTMLSpanElement>('.title-letter');

        if (!contatctChars1?.length || !contatctChars2?.length) return;

        const tl = gsap.timeline();
        tl.set(contatctChars1, { opacity: 0, y: 50 });
        tl.set(contatctChars2, { opacity: 0, y: 50 });

         tl.to(contatctChars1, {opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05});
         tl.to(contatctChars2, {opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05});
    }),[];

    return (
        <main className="contact round">
            <div className="contact__title">
                <h2 className="tit" ref={titleRef}>
                    {contactTitleLine1.split('').map((char, index) => (
                    <span key={index} className="title-letter">
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                    ))}<br />
                    {contactTitleLine2.split('').map((char, index) => (
                        <span key={index} className="title-letter">
                        {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
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