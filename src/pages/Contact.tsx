import { ContactForm } from "../components/ContactForm";
const Contact = () => {
    return (
        <main className="contact">
            <div className="contact__title">
                <h2 className="tit">Let’s<br />Connect</h2>
                <p className="txt">Open for new opportunities<br /> and meaningful collaborations.</p>
            </div>
            <div className="contact__form">
                 <ContactForm />
            </div>
        </main>
    )

};
export default Contact;