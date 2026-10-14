import { useEffect, useRef } from 'react';
import { ContactForm } from "../components/ContactForm";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Contact = () => {
    const contactInfoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
            const contactInfo = contactInfoRef.current;
            if (!contactInfo) return;

            const icon = contactInfo.querySelector<HTMLElement>('.icon');
            const paragraphs = contactInfo.querySelectorAll<HTMLElement>('p');

            gsap.timeline({
                scrollTrigger: {
                    trigger: contactInfo,
                    start: 'top 75%',
                    once: true,
                },
            })
                .fromTo(icon,
                    { scale: 0.5, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' }
                )
                .fromTo(paragraphs,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: 'power2.out' },
                    '-=0.2'
                );
        }, contactInfoRef);

        return () => context.revert();
    }, []);

    return (
        <main className="contact">
            <div className="title_box">
                <h2 className="title">CONTACT</h2>
                <p className="text">프로젝트에 대한 간단한 설명을 입력해 주세요.</p>
            </div>
            <div className="form_box">
                <ContactForm />
            </div>
            <div className="contact_info" ref={contactInfoRef}>
                <div className="icon"><span className="visually-hidden">윙크 아이콘</span></div>
                <p><a href="mailto:ysal77@naver.com">ysal77@naver.com</a></p>
                <p><a href="tel:010-7370-4505">010.7370.4505</a></p>
            </div>
        </main>
    )

};
export default Contact;
