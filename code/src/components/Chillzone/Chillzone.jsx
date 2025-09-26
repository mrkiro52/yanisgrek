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
                <div className="Chillzone__left">
                    <h2 className="Chillzone__left_title">Зона отдыха</h2>
                    <p className="Chillzone__left_text">
                        Проведите время в ожидании своего автомобиля с комфортом. Для вас оборудована лаунж-зона с удобными диванами, кофе и развлекательным центром.
                    </p>
                    <div className="Chillzone__left_images">
                        {["image1.png", "image2.png", "image3.png"].map((img, i) => (
                            <div
                                key={i}
                                className={`Chillzone__image ${i === 2 ? "Chillzone__image--full" : ""}`}
                                onClick={() => handleImageClick(`/images/chillzone/${img}`)}
                            >
                                <img
                                    src={`/images/chillzone/${img}`}
                                    alt={`Chill ${i}`}
                                    className="Chillzone__image-content"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="Chillzone__right">
                    <div
                        className="Chillzone__right_image"
                        onClick={() => handleImageClick("/images/chillzone/image4.png")}
                    >
                        <img
                            src="/images/chillzone/image4.png"
                            alt="Chill area"
                            className="Chillzone__image-content"
                        />
                    </div>
                </div>
            </div>

            {fullscreenImage && (
                <div className="Fullscreen" onClick={closeFullscreen}>
                    <img src={fullscreenImage} alt="Fullscreen" className="Fullscreen__image" />
                </div>
            )}
        </div>
    );
}
