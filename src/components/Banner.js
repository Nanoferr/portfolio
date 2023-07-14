import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/foto-header2.png";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import verPdf from "../assets/pdf/cv.pdf";


export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const[isDeleting, setIsDeleting] = useState(false);
    const toRotate = [ "Desarrollador Front-End", "Gamer", "Autodidacta" ];
    const [text, setText] = useState('');
    const period = 1000;
    const [delta, setDelta] = useState(290 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
          } else {
            setIndex(prevIndex => prevIndex + 1);
          }
}

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <TrackVisibility>
                        {({isVisible}) => 
                            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                            <span className="tagline">Bienvenido a mi Portafolio</span>
                            <h1>{`Soy Fer! `}<span className="wrap">{text}</span></h1>
                            <p>Me recibí de Abogado en la Universidad de Buenos Aires, y luego de algunos años de ejercer el Derecho, decidí reinventarme y estudiar programación. Actualmente me encuentro profundizando en el desarrollo Front-End, pero estoy constantemente aprendiendo sobre nuevas tecnologías. </p>
                            <button><a href={verPdf} target="_blank" rel="noopener noreferrer" download="CV Fernando Maldonado">Mi Curriculum<ArrowRightCircle size={25}/></a></button>
                            </div>}
                        </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Headder Img" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}