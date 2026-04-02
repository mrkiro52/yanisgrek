import image1 from '../assets/images/chillzone/image1.webp';
import image2 from '../assets/images/chillzone/image2.webp';
import image3 from '../assets/images/chillzone/image3.webp';
import image4 from '../assets/images/chillzone/image4.webp';

export default function ChillZone() {
  return (
    <div className="ChillZone">
      <div className="chillzone-content">
        <div className="chillzone-text">
          <h2 className="chillzone-title">Зона отдыха</h2>
          <p className="chillzone-description">
            Проведите время в ожидании своего автомобиля с комфортом. Для вас оборудована лаунж-зона с удобными диванами, кофе и развлекательным центром.
          </p>
        </div>

        <div className="chillzone-gallery">
          <div className="gallery-left">
            <div className="image-wrapper">
              <img src={image1.src} alt="Зона отдыха" />
            </div>
          </div>
          <div className="gallery-right">
            <div className="gallery-top">
              <div className="image-wrapper">
                <img src={image2.src} alt="Зона отдыха" />
              </div>
            </div>
            <div className="gallery-bottom">
              <div className="image-wrapper">
                <img src={image3.src} alt="Зона отдыха" />
              </div>
              <div className="image-wrapper">
                <img src={image4.src} alt="Зона отдыха" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
