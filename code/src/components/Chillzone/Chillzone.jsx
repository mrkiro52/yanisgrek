'use client';

import { useState } from "react";
import "./Chillzone.scss";

export default function Chillzone() {
    const [fullscreenImage, setFullscreenImage] = useState(null);

    const handleImageClick = (src) => {
        setFullscreenImage(src);
    };

    const closeFullscreen = () => {
        setFullscreenImage(null);
    };

    return (
        <div className="Chillzone">
            <div className="Chillzone__wrapper">
                <div className="Chillzone__header">
                    <h2 className="Chillzone__title">Зона отдыха</h2>
                    <p className="Chillzone__text">
                        Проведите время в ожидании своего автомобиля с комфортом. Для вас оборудована лаунж-зона с удобными диванами, кофе и развлекательным центром.
                    </p>
                </div>
                <div className="Chillzone__gallery">
                    {["image1.png", "image2.png", "image3.png", "image4.png"].map((img, i) => (
                        <div
                            key={i}
                            className="Chillzone__image-card"
                            onClick={() => handleImageClick(`/images/chillzone/${img}`)}
                        >
                            <img
                                src={`/images/chillzone/${img}`}
                                alt={`Chill zone ${i + 1}`}
                                className="Chillzone__image-content"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
            {fullscreenImage && (
                <div className="Fullscreen" onClick={closeFullscreen}>
                    <img src={fullscreenImage} alt="Fullscreen" className="Fullscreen__image" loading="lazy"/>
                </div>
            )}
        </div>
    );
}
