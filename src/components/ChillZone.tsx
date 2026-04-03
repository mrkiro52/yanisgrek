export default function ChillZone() {
  const images = {
    image1: '/images/chillzone/image1.webp',
    image2: '/images/chillzone/image2.webp',
    image3: '/images/chillzone/image3.webp',
    image4: '/images/chillzone/image4.webp'
  };

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
            <div className="left-side">
              <img src={images.image1} alt="Зона отдыха" loading="lazy" />
            </div>
          </div>
          <div className="gallery-right">
            <div className="gallery-top">
              <div className="image-wrapper">
                <img src={images.image2} alt="Зона отдыха" loading="lazy" />
              </div>
            </div>
            <div className="gallery-bottom">
              <div className="image-wrapper">
                <img src={images.image3} alt="Зона отдыха" loading="lazy" />
              </div>
              <div className="image-wrapper">
                <img src={images.image4} alt="Зона отдыха" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
