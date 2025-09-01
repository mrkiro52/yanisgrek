import './Chillzone.scss';

export default function Chillzone() {
    return (
        <div className="Chillzone">
            <div className="Chillzone__wrapper">
                <div className="Chillzone__left">
                    <h2 className="Chillzone__left_title">Зона отдыха</h2>
                    <p className="Chillzone__left_text">
                        Проведите время в ожидании своего автомобиля с комфортом. Для вас оборудована лаунж-зона с удобными диванами, кофе и развлекательным центром.
                    </p>
                    <div className="Chillzone__left_images">
                        <div className="Chillzone__image">
                            <img
                                src="/images/chillzone/image1.png"
                                alt="Relax zone"
                                className="Chillzone__image-content"
                            />
                        </div>
                        <div className="Chillzone__image">
                            <img
                                src="/images/chillzone/image2.png"
                                alt="Games"
                                className="Chillzone__image-content"
                            />
                        </div>
                        <div className="Chillzone__image Chillzone__image--full">
                            <img
                                src="/images/chillzone/image3.png"
                                alt="Community"
                                className="Chillzone__image-content"
                            />
                        </div>
                    </div>
                </div>
                <div className="Chillzone__right">
                    <div className="Chillzone__right_image">
                        <img
                            src="/images/chillzone/image4.png"
                            alt="Chill area"
                            className="Chillzone__image-content"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}