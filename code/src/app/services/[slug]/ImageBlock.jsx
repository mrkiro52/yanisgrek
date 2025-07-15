"use client";
import React, { useState, useEffect } from "react";
import "./ImageBlock.scss";

const carImages = [
  "/images/carsbg/bmw-1.jpg",
  "/images/carsbg/bmw-2.jpg",
  "/images/carsbg/bmw-3.jpg",
  "/images/carsbg/bmw-4.jpg",
  "/images/carsbg/bmw-5.jpg",
  "/images/carsbg/bmw-6.jpg",
  "/images/carsbg/bmw-7.jpg",
  "/images/carsbg/bmw-i3.jpg",
  "/images/carsbg/bmw-i3L.jpg",
  "/images/carsbg/bmw-i4.jpg",
  "/images/carsbg/bmw-i8.jpg",
  "/images/carsbg/bmw-ix.jpg",
  "/images/carsbg/bmw-ix3.jpg",
  "/images/carsbg/bmw-m2.jpg",
  "/images/carsbg/bmw-m3.jpg",
  "/images/carsbg/bmw-m4.jpg",
  "/images/carsbg/bmw-m5.jpg",
  "/images/carsbg/bmw-m6.jpg",
  "/images/carsbg/bmw-x1.jpg",
  "/images/carsbg/bmw-x2.jpg",
  "/images/carsbg/bmw-x3.jpg",
  "/images/carsbg/bmw-x4.jpg",
  "/images/carsbg/bmw-x5.jpg",
  "/images/carsbg/bmw-x6.jpg",
  "/images/carsbg/bmw-z4.jpg",
];

const serviceImages = [
    "/images/servicesImages/antibakterialnaya-obrabotka-konditsionera.jpg",
    "/images/servicesImages/chip-tyuning-stage-1-stage-2.jpg",
    "/images/servicesImages/chistka-klapanov.jpg",
    "/images/servicesImages/chistka-klapanov.jpg",
    "/images/servicesImages/chistka-vpusknogo-kollektora-kanalov.jpg",
    "/images/servicesImages/diagnostika-akpp.jpg",
    "/images/servicesImages/diagnostika-dvs.jpg",
    "/images/servicesImages/kalibrovka-pnevmopodveski.jpg",
    "/images/servicesImages/kompyuternaya-diagnostika.jpg",
    "/images/servicesImages/moyka-radiatorov.jpg",
    "/images/servicesImages/obnovlenie-programmnogo-obespecheniya.jpg",
    "/images/servicesImages/otklyuchenie-i-udalenie-egr-dpf-adblue.jpg",
    "/images/servicesImages/pritirka-klapanov.jpg",
    "/images/servicesImages/profilaktika-drenazhey-podkapotnogo-prostranstva.jpg",
    "/images/servicesImages/prokachka-toplivnoy-sistemy.jpg",
    "/images/servicesImages/remont-rulevoy-reyki.jpg",
    "/images/servicesImages/sbros-adaptaciy-akpp.jpg",
    "/images/servicesImages/snyatie-ustanovka-akpp.jpg",
    "/images/servicesImages/snyatie-ustanovka-dvs.jpg",
    "/images/servicesImages/snyatie-ustanovka-razdatochnoy-korobki.jpg",
    "/images/servicesImages/snyatie-ustanovka-rulevoy-reyki.jpg",
    "/images/servicesImages/udalenie-vpuska-vpusknoy-sistemy.jpg",
    "/images/servicesImages/vakuumirovanie-i-zapravka-konditsionera.jpg",
    "/images/servicesImages/zamena-akb-s-registraciey.jpg",
    "/images/servicesImages/zamena-cepi-grm.jpg",
    "/images/servicesImages/zamena-filtra-kartera-akpp.jpg",
    "/images/servicesImages/zamena-masla-dvs.jpg",
    "/images/servicesImages/zamena-masla-v-akpp.jpg",
    "/images/servicesImages/zamena-masla-v-razdatochnoy-korobke.jpg",
    "/images/servicesImages/zamena-masla-v-reduktore-pered-zad.jpg"
  ];
   

export default function ImageBlock(props) {
  const [bg, setBg] = useState(null);
  const [overlay, setOverlay] = useState(null);

  // выбираем фон
  useEffect(() => {
    const idx = Math.floor(Math.random() * carImages.length);
    setBg(carImages[idx]);
  }, []);

  // выбираем маленькую фотку из массива
  useEffect(() => {
    const idx = Math.floor(Math.random() * serviceImages.length);
    setOverlay(serviceImages[idx]);
  }, []);

  if (!bg) {
    return <div className="ImageBlock placeholder" />;
  }

  return (
    <div
      className="ImageBlock"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

    <img src={`/images/servicesImages/${props.image}.jpg`} alt="car" className="ImageBlock__overlay" />
      
    </div>
  );
}
